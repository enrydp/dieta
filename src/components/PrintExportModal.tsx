import React, { useState, useRef } from 'react';
import { DayDietPlan, UserProfile, MacroTargets } from '../types/diet';
import { calculateMealTotals, calculateDayTotals } from '../utils/planGenerator';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { ALLERGIES_DATA } from '../data/allergies';
import { X, Printer, Download, FileText, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  targets: MacroTargets;
  currentDay: DayDietPlan;
  weekPlan: DayDietPlan[];
}

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
  const printSheetRef = useRef<HTMLDivElement>(null);

  const daysToPrint = mode === 'current' 
    ? (currentDay ? [currentDay] : (weekPlan && weekPlan[0] ? [weekPlan[0]] : []))
    : (weekPlan || []);

  // Generazione e download diretto del file PDF
  const handleDownloadPDF = async () => {
    if (!printSheetRef.current) return;
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const element = printSheetRef.current;

      // Cattura rendering ad alta risoluzione del foglio A4
      const canvas = await html2canvas(element, {
        scale: 2, // Nitidezza elevata per i testi
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Formato standard A4: 210mm x 297mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Prima pagina
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Pagine successive se il documento è multipagina (es. settimana completa)
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const safeName = profile.name && profile.name.trim() 
        ? profile.name.trim().replace(/[^a-zA-Z0-9]/g, '_') 
        : 'Utente';
      const daySuffix = mode === 'current' 
        ? (currentDay?.dayName || 'Giorno') 
        : 'Settimana_7gg';
      const fileName = `NutriPlan_${safeName}_${daySuffix}.pdf`;

      // Download diretto immediato
      pdf.save(fileName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (error) {
      console.error('Errore durante la generazione diretta del PDF:', error);
      // Fallback trasparente sulla stampa browser
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // Stampa classica su stampante
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[96vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Barra Comandi Ottimizzata per Mobile & Desktop (Nascosta durante la stampa fisica) */}
        <div className="p-3 sm:p-5 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md flex flex-col gap-3 shrink-0 no-print">
          
          {/* Riga 1: Titolo e Pulsante Chiudi ben accessibile */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                  Esporta o Scarica Piano in PDF
                </h3>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Scarica direttamente il file PDF sul tuo telefono o computer
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shrink-0 shadow-2xs cursor-pointer"
              title="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Riga 2: Switch Giorno/Settimana & Pulsanti Azione Grandi e Chiusi su Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            
            {/* Selettore Giorno Singolo / Settimana Completa */}
            <div className="bg-slate-200/80 p-1 rounded-2xl flex text-xs font-bold w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setMode('current')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl transition-all text-center cursor-pointer ${
                  mode === 'current' 
                    ? 'bg-white text-emerald-950 shadow-xs font-black' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Giorno ({currentDay?.dayName || 'Oggi'})
              </button>
              <button
                type="button"
                onClick={() => setMode('week')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl transition-all text-center cursor-pointer ${
                  mode === 'week' 
                    ? 'bg-white text-emerald-950 shadow-xs font-black' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Settimana Completa (7 gg)
              </button>
            </div>

            {/* Pulsanti di Azione: Download PDF Diretto & Stampa */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Tasto principale: Download PDF diretto */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="flex-1 sm:flex-initial px-5 py-3 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generazione PDF in corso...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>PDF Scaricato!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Scarica File PDF</span>
                  </>
                )}
              </button>

              {/* Tasto secondario: Invia a stampante fisica */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-3 sm:py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
                title="Invia direttamente alla stampante"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Stampa</span>
              </button>
            </div>

          </div>

        </div>

        {/* Foglio Stampabile / Cattura PDF (scrollabile a schermo) */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-900 print:p-0">
          
          <div ref={printSheetRef} className="max-w-3xl mx-auto bg-white p-2 sm:p-4">
            
            {/* Header Documento */}
            <div className="border-b-2 border-emerald-600 pb-4 mb-5 flex flex-col sm:flex-row justify-between items-start gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">NUTRIPLAN</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    : By Barone soft
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-slate-700 mt-1">
                  Piano Alimentare Personalizzato • {mode === 'current' ? `Giornata di ${currentDay?.dayName || 'Oggi'}` : 'Settimana Completa (7 Giorni)'}
                </h1>
                <div className="text-[11px] text-slate-500 mt-0.5">Elaborato su evidenze scientifiche e bilanciamento dei macronutrienti</div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 sm:border-0 sm:bg-transparent sm:p-0">
                <div className="font-black text-slate-900 text-sm">{profile.name && profile.name.trim() ? profile.name : 'Paziente / Utente'}</div>
                <div>{profile.age > 0 ? `${profile.age} anni • ` : ''}{profile.gender === 'male' ? 'Uomo' : 'Donna'} • {profile.heightCm > 0 ? `${profile.heightCm} cm • ` : ''}{profile.weightKg > 0 ? `${profile.weightKg} kg` : ''}</div>
                <div className="font-bold text-emerald-700">BMI: {targets.bmi > 0 ? targets.bmi : '--'} ({targets.bmiCategory})</div>
              </div>
            </div>

            {/* Obiettivo e Target Macro */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 mb-5 text-center text-xs">
              <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-slate-500 block uppercase text-[10px] font-semibold">Target Calorico</span>
                <span className="text-base font-black text-slate-900">{targets.targetCalories} kcal</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-slate-500 block uppercase text-[10px] font-semibold">Proteine</span>
                <span className="text-base font-black text-blue-700">{targets.proteinGrams}g</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-slate-500 block uppercase text-[10px] font-semibold">Carboidrati</span>
                <span className="text-base font-black text-amber-700">{targets.carbsGrams}g</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-slate-500 block uppercase text-[10px] font-semibold">Grassi</span>
                <span className="text-base font-black text-rose-700">{targets.fatsGrams}g</span>
              </div>
            </div>

            {/* Quadro Clinico & Allergie Rilevate nel Documento */}
            {((profile.pathologies && profile.pathologies.length > 0) || 
              (profile.allergies && profile.allergies.length > 0) || 
              (profile.customExcludedFoods && profile.customExcludedFoods.length > 0)) && (
              <div className="mb-5 p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-2">
                {profile.pathologies && profile.pathologies.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Patologie & Condizioni Cliniche Rispettate:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.pathologies.map(pid => {
                        const p = PATHOLOGIES_DATA[pid];
                        return (
                          <span key={pid} className="font-semibold bg-white border border-amber-200 px-2 py-0.5 rounded-lg text-[11px]">
                            • {p ? p.name : pid}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {((profile.allergies && profile.allergies.length > 0) || (profile.customExcludedFoods && profile.customExcludedFoods.length > 0)) && (
                  <div className="pt-1 border-t border-amber-200/60">
                    <span className="font-bold text-slate-900 block mb-1">Allergie & Alimenti Esclusi dall'Elaborazione:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.allergies?.map(aid => {
                        const a = ALLERGIES_DATA.find(item => item.id === aid);
                        return (
                          <span key={aid} className="font-bold text-rose-800 bg-white border border-rose-200 px-2 py-0.5 rounded-lg text-[11px]">
                            🚫 {a ? a.name : aid}
                          </span>
                        );
                      })}
                      {profile.customExcludedFoods?.map(custom => (
                        <span key={custom} className="font-bold text-rose-800 bg-white border border-rose-200 px-2 py-0.5 rounded-lg text-[11px]">
                          🚫 {custom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pasti dei giorni selezionati */}
            <div className="space-y-5">
              {daysToPrint.map(day => {
                const dayTotals = calculateDayTotals(day);

                return (
                  <div key={day.dayIndex} className="page-break border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-2.5 mb-3.5 gap-1">
                      <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>{day.dayName}</span>
                      </h2>
                      <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                        Totale giorno: {dayTotals.calories} kcal • P: {dayTotals.protein}g | C: {dayTotals.carbs}g | G: {dayTotals.fats}g
                      </span>
                    </div>

                    <div className="space-y-3">
                      {day.meals.map(meal => {
                        const mealTot = calculateMealTotals(meal.foods);

                        return (
                          <div key={meal.id} className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-xs">
                            <div className="flex justify-between font-extrabold text-slate-900 mb-1.5 border-b border-slate-200/60 pb-1">
                              <span>{meal.name} <span className="text-slate-500 font-normal text-[11px]">({meal.timeSlot})</span></span>
                              <span className="text-emerald-700 font-black">{mealTot.calories} kcal</span>
                            </div>

                            <table className="w-full text-left">
                              <tbody>
                                {meal.foods.map((f, i) => (
                                  <tr key={i} className="border-b border-slate-100 last:border-0">
                                    <td className="py-1 text-slate-800 font-medium">{f.food.name}</td>
                                    <td className="py-1 font-black text-right text-emerald-800">{f.grams}g</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer e Note a Piè di Pagina */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 text-center leading-relaxed">
              NutriPlan Pro • Documento informativo ad uso personale. Bere almeno {targets.waterLiters} litri di acqua al giorno. Per patologie cliniche croniche fare sempre riferimento al proprio medico curante o nutrizionista abilitato.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
