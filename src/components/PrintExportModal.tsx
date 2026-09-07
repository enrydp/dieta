import React, { useState } from 'react';
import { DayDietPlan, UserProfile, MacroTargets } from '../types/diet';
import { calculateMealTotals, calculateDayTotals } from '../utils/planGenerator';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { ALLERGIES_DATA } from '../data/allergies';
import { X, Printer, Download, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  targets: MacroTargets;
  currentDay: DayDietPlan;
  weekPlan: DayDietPlan[];
}

// ── Costanti layout A4 ────────────────────────────────────────────────
const PAGE_W = 210;    // mm larghezza A4
const PAGE_H = 297;    // mm altezza A4
const MARGIN = 14;     // mm margine laterale
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = PAGE_H - 16; // zona piede pagina

// ── Helper: testo a capo automatico entro maxWidth ─────────────────────
function splitText(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth);
}

// ── Helper: aggiunge una nuova pagina con header compatto ─────────────
function addPage(doc: jsPDF, pageNum: { v: number }, profile?: UserProfile, headerTitle?: string): number {
  doc.addPage();
  pageNum.v += 1;

  // Barra superiore verde compatta per pagine successive
  doc.setFillColor(5, 150, 105);
  doc.rect(0, 0, PAGE_W, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('NUTRIPLAN', MARGIN, 6.2);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('By Barone soft', MARGIN + 22, 6.2);

  const userName = profile?.name && profile.name.trim() ? profile.name.trim() : 'Piano Nutrizionale';
  const rightTitle = headerTitle ? `${headerTitle} • ${userName}` : userName;
  doc.text(rightTitle, PAGE_W - MARGIN, 6.2, { align: 'right' });

  return 15;
}

// ── Helper: assicura che ci sia spazio sufficiente ─────────────────────
function ensureSpace(
  doc: jsPDF,
  y: number,
  neededMm: number,
  pageNum: { v: number },
  profile?: UserProfile,
  headerTitle?: string
): number {
  if (y + neededMm > BOTTOM_LIMIT) {
    return addPage(doc, pageNum, profile, headerTitle);
  }
  return y;
}

// ─────────────────────────────────────────────────────────────────────
// Generazione PDF puramente via API jsPDF (senza html2canvas)
// ─────────────────────────────────────────────────────────────────────
function generatePDF(
  profile: UserProfile,
  targets: MacroTargets,
  daysToPrint: DayDietPlan[],
  mode: 'current' | 'week'
): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageNum = { v: 1 };

  let y = MARGIN;

  // ── INTESTAZIONE ────────────────────────────────────────────────────
  // Barra verde in cima alla prima pagina
  doc.setFillColor(5, 150, 105);  // emerald-600
  doc.rect(0, 0, PAGE_W, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('NUTRIPLAN', MARGIN, 8);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('By Barone soft', MARGIN + 31, 8);

  const modeLabel = mode === 'current'
    ? `Giornata: ${daysToPrint[0]?.dayName || 'Oggi'}`
    : 'Settimana Completa (7 Giorni)';
  doc.text(`Piano Alimentare Personalizzato • ${modeLabel}`, PAGE_W - MARGIN, 8, { align: 'right' });

  y = 18;

  // ── DATI UTENTE ──────────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(profile.name && profile.name.trim() ? profile.name.trim() : 'Paziente / Utente', MARGIN, y);

  const infoRight: string[] = [];
  if (profile.age > 0) infoRight.push(`${profile.age} anni`);
  infoRight.push(profile.gender === 'male' ? 'Uomo' : 'Donna');
  if (profile.heightCm > 0) infoRight.push(`${profile.heightCm} cm`);
  if (profile.weightKg > 0) infoRight.push(`${profile.weightKg} kg`);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(infoRight.join(' • '), PAGE_W - MARGIN, y, { align: 'right' });

  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);
  doc.text(`BMI: ${targets.bmi > 0 ? targets.bmi : '--'} (${targets.bmiCategory})`, PAGE_W - MARGIN, y, { align: 'right' });

  // Linea separatrice
  y += 3;
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 5;

  // ── TARGET MACRO ────────────────────────────────────────────────────
  const boxW = CONTENT_W / 4 - 2;
  const macros = [
    { label: 'Calorie', value: `${targets.targetCalories} kcal`, color: [15, 23, 42] as [number, number, number] },
    { label: 'Proteine', value: `${targets.proteinGrams} g`, color: [29, 78, 216] as [number, number, number] },
    { label: 'Carboidrati', value: `${targets.carbsGrams} g`, color: [180, 83, 9] as [number, number, number] },
    { label: 'Grassi', value: `${targets.fatsGrams} g`, color: [190, 18, 60] as [number, number, number] },
  ];

  macros.forEach((m, i) => {
    const bx = MARGIN + i * (boxW + 2.7);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, y, boxW, 13, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label.toUpperCase(), bx + boxW / 2, y + 4, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...m.color);
    doc.text(m.value, bx + boxW / 2, y + 10, { align: 'center' });
  });

  y += 18;

  // ── QUADRO CLINICO & ALLERGIE ────────────────────────────────────────
  const hasPathologies = profile.pathologies && profile.pathologies.length > 0;
  const hasAllergies = (profile.allergies && profile.allergies.length > 0) ||
    (profile.customExcludedFoods && profile.customExcludedFoods.length > 0);

  if (hasPathologies || hasAllergies) {
    // 1. Pre-calcolo dell'altezza necessaria per il box
    let contentHeight = 4;
    let pathLines: string[] = [];
    let allergyLines: string[] = [];

    if (hasPathologies) {
      contentHeight += 4;
      const pathNames = (profile.pathologies || []).map(pid => {
        const p = PATHOLOGIES_DATA[pid];
        return p ? p.name : pid;
      }).join(' • ');
      pathLines = splitText(doc, pathNames, CONTENT_W - 6);
      contentHeight += pathLines.length * 3.5 + 2;
    }

    if (hasAllergies) {
      contentHeight += 4;
      const allergyNames = [
        ...(profile.allergies || []).map(aid => {
          const a = ALLERGIES_DATA.find(item => item.id === aid);
          return a ? a.name : aid;
        }),
        ...(profile.customExcludedFoods || [])
      ].join(' • ');
      allergyLines = splitText(doc, allergyNames, CONTENT_W - 6);
      contentHeight += allergyLines.length * 3.5 + 1;
    }

    // 2. Disegna il box PRIMA del testo (per evitare che il fill lo copra)
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(252, 211, 77);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT_W, contentHeight, 2, 2, 'FD');

    // 3. Stampa il testo sopra il box
    let textY = y + 4;
    if (hasPathologies) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Patologie & Condizioni Cliniche Rispettate:', MARGIN + 3, textY);
      textY += 3.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      pathLines.forEach(line => {
        doc.text(line, MARGIN + 3, textY);
        textY += 3.5;
      });
      textY += 2;
    }

    if (hasAllergies) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Allergie & Alimenti Esclusi:', MARGIN + 3, textY);
      textY += 3.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(153, 27, 27);
      allergyLines.forEach(line => {
        doc.text(line, MARGIN + 3, textY);
        textY += 3.5;
      });
    }

    y += contentHeight + 4;
  }

  // ── GIORNI / PASTI ────────────────────────────────────────────────────
  daysToPrint.forEach((day, dayIndex) => {
    const dayTotals = calculateDayTotals(day);

    if (mode === 'week' && dayIndex > 0) {
      // In modalità settimana ogni giorno inizia su una pagina dedicata pulita
      y = addPage(doc, pageNum, profile, `Piano Settimanale • ${day.dayName}`);
    } else {
      y = ensureSpace(doc, y, 14, pageNum, profile, day.dayName);
    }

    // Header giorno
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(167, 243, 208); // emerald-200
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT_W, 9.5, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(5, 150, 105);
    doc.text(day.dayName, MARGIN + 4, y + 6.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const totLabel = `Totale: ${dayTotals.calories} kcal  |  P: ${dayTotals.protein}g • C: ${dayTotals.carbs}g • G: ${dayTotals.fats}g`;
    doc.text(totLabel, PAGE_W - MARGIN - 3, y + 6.2, { align: 'right' });

    y += 12;

    // Pasti
    day.meals.forEach(meal => {
      const mealTot = calculateMealTotals(meal.foods);

      // Altezza stimata del blocco pasto (header + righe alimenti)
      const estimatedHeight = 8 + meal.foods.length * 5 + 3;
      y = ensureSpace(doc, y, estimatedHeight, pageNum, profile, day.dayName);

      // Header pasto
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(MARGIN, y, CONTENT_W, 7, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(meal.name, MARGIN + 3, y + 4.8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`(${meal.timeSlot})`, MARGIN + 4 + doc.getTextWidth(meal.name), y + 4.8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(5, 150, 105);
      const mealInfoText = `${mealTot.calories} kcal (P: ${mealTot.protein}g • C: ${mealTot.carbs}g • G: ${mealTot.fats}g)`;
      doc.text(mealInfoText, PAGE_W - MARGIN - 3, y + 4.8, { align: 'right' });

      y += 8.5;

      // Righe alimenti
      meal.foods.forEach((f, fi) => {
        y = ensureSpace(doc, y, 5.2, pageNum, profile, day.dayName);

        if (fi % 2 === 0) {
          doc.setFillColor(250, 251, 252);
          doc.rect(MARGIN, y - 0.5, CONTENT_W, 5, 'F');
        }

        // Calcolo kcal dell'alimento
        const itemKcal = Math.round((f.food.calories * f.grams) / 100);

        // Troncamento nome alimento se troppo lungo per evitare sovrapposizioni
        let foodName = f.food.name;
        const maxTextW = CONTENT_W - 42;
        if (doc.getTextWidth(foodName) > maxTextW) {
          while (doc.getTextWidth(foodName + '...') > maxTextW && foodName.length > 0) {
            foodName = foodName.slice(0, -1);
          }
          foodName += '...';
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(30, 41, 59);
        doc.text(foodName, MARGIN + 4, y + 3.3);

        // Grammi alimento
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(5, 150, 105);
        doc.text(`${f.grams} g`, PAGE_W - MARGIN - 23, y + 3.3, { align: 'right' });

        // Calorie alimento
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`${itemKcal} kcal`, PAGE_W - MARGIN - 3, y + 3.3, { align: 'right' });

        y += 4.8;
      });

      y += 3; // spazio tra pasti
    });

    if (mode === 'current' && dayIndex < daysToPrint.length - 1) {
      y += 3;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.line(MARGIN + 10, y, PAGE_W - MARGIN - 10, y);
      y += 5;
    }
  });

  // ── PIÈ DI PAGINA DEL DOCUMENTO ──────────────────────────────────────
  y = ensureSpace(doc, y, 12, pageNum, profile);
  y += 3;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const footer = `Bere almeno ${targets.waterLiters} litri d'acqua al giorno. Per patologie cliniche consultare sempre il proprio medico o nutrizionista abilitato.`;
  const footerLines = splitText(doc, footer, CONTENT_W);
  footerLines.forEach(line => {
    doc.text(line, PAGE_W / 2, y, { align: 'center' });
    y += 3.5;
  });

  // ── NUMERAZIONE PAGINE COMPLETA (Pag. X di Y) ────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('NutriPlan • By Barone soft — documento informativo ad uso personale', MARGIN, PAGE_H - 6);
    doc.text(`Pag. ${i} di ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 6, { align: 'right' });
  }

  return doc;
}

// ─────────────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────────────
export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  targets,
  currentDay,
  weekPlan
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'current' | 'week'>('current');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const daysToPrint = mode === 'current'
    ? (currentDay ? [currentDay] : (weekPlan && weekPlan[0] ? [weekPlan[0]] : []))
    : (weekPlan || []);

  // ── Download PDF diretto ────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    try {
      const doc = generatePDF(profile, targets, daysToPrint, mode);

      const safeName = profile.name && profile.name.trim()
        ? profile.name.trim().replace(/[^a-zA-Z0-9]/g, '_')
        : 'Utente';
      const daySuffix = mode === 'current'
        ? (currentDay?.dayName || 'Giorno')
        : 'Settimana_7gg';
      const fileName = `NutriPlan_${safeName}_${daySuffix}.pdf`;

      doc.save(fileName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Errore generazione PDF:', err);
      alert('Si è verificato un errore durante la generazione del PDF. Riprova.');
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Stampa browser ──────────────────────────────────────────────────
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-200 max-h-[92vh] overflow-y-auto">

        {/* Barra Comandi */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/90 flex flex-col gap-4">

          {/* Riga titolo + chiudi */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">Esporta Piano in PDF</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Il file viene scaricato direttamente sul dispositivo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shrink-0 cursor-pointer"
              title="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selettore Giorno / Settimana */}
          <div className="bg-slate-200/80 p-1 rounded-2xl flex text-sm font-bold">
            <button
              type="button"
              onClick={() => setMode('current')}
              className={`flex-1 px-4 py-2.5 rounded-xl transition-all text-center cursor-pointer ${
                mode === 'current'
                  ? 'bg-white text-emerald-950 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📅 Giorno ({currentDay?.dayName || 'Oggi'})
            </button>
            <button
              type="button"
              onClick={() => setMode('week')}
              className={`flex-1 px-4 py-2.5 rounded-xl transition-all text-center cursor-pointer ${
                mode === 'week'
                  ? 'bg-white text-emerald-950 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📆 Settimana (7 gg)
            </button>
          </div>

          {/* Pulsanti azione */}
          <div className="flex gap-2.5">
            {/* Download PDF — pulsante principale grande */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex-1 py-4 sm:py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-base sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creazione PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span>PDF Scaricato! ✓</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Scarica PDF</span>
                </>
              )}
            </button>

            {/* Stampa — secondario */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-4 sm:py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              title="Invia alla stampante"
            >
              <Printer className="w-5 h-5 text-slate-600" />
              <span className="hidden sm:inline text-sm">Stampa</span>
            </button>
          </div>

        </div>

        {/* Anteprima contenuto */}
        <div className="p-4 sm:p-6 bg-slate-50 text-slate-600 text-sm">
          <div className="font-semibold text-slate-800 mb-1.5">
            Il PDF conterrà:
          </div>
          <ul className="space-y-1 text-xs text-slate-500">
            <li>✅ Dati personali e target macro (calorie, proteine, carboidrati, grassi)</li>
            {((profile.pathologies && profile.pathologies.length > 0) ||
              (profile.allergies && profile.allergies.length > 0) ||
              (profile.customExcludedFoods && profile.customExcludedFoods.length > 0)) && (
              <li>✅ Patologie e allergie rispettate nell'elaborazione</li>
            )}
            <li>✅ {mode === 'current' ? `Pasti del giorno (${currentDay?.dayName || 'oggi'})` : 'Pasti di tutti i 7 giorni della settimana'} con grammi per ogni alimento</li>
            <li>✅ Totali nutrizionali per ogni pasto e per ogni giornata</li>
            <li>✅ Nota sull'idratazione ({targets.waterLiters} L/giorno)</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
