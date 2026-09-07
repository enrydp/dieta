import React, { useState } from 'react';
import { DayDietPlan, UserProfile, MacroTargets } from '../types/diet';
import { calculateMealTotals, calculateDayTotals } from '../utils/planGenerator';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { X, Printer, Check, FileText } from 'lucide-react';

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

  const daysToPrint = mode === 'current' ? [currentDay] : weekPlan;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Controls Bar (Hidden when printing) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Stampa / Esporta Piano Alimentare in PDF</h3>
              <p className="text-xs text-slate-500">Formattato su misura per foglio A4 o salvataggio PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-200/80 p-1 rounded-xl flex text-xs">
              <button
                onClick={() => setMode('current')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  mode === 'current' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Giorno Singolo ({currentDay.dayName})
              </button>
              <button
                onClick={() => setMode('week')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  mode === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Settimana Completa (7 gg)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Stampa / Salva PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet View */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-900 print:p-0">
          
          {/* Header Documento */}
          <div className="border-b-2 border-emerald-600 pb-4 mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">PIANO ALIMENTARE PERSONALIZZATO</h1>
              <div className="text-xs text-slate-500 mt-1">Elaborato con NutriPlan Pro • Metodo Scientifico & Clinico</div>
            </div>
            <div className="text-right text-xs text-slate-600">
              <div className="font-bold text-slate-900 text-sm">{profile.name}</div>
              <div>{profile.age} anni • {profile.gender === 'male' ? 'Uomo' : 'Donna'} • {profile.heightCm} cm • {profile.weightKg} kg</div>
              <div className="font-semibold text-emerald-700">BMI: {targets.bmi} ({targets.bmiCategory})</div>
            </div>
          </div>

          {/* Obiettivo e Target Macro */}
          <div className="grid grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-6 text-center text-xs">
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Target Calorico</span>
              <span className="text-base font-extrabold text-slate-900">{targets.targetCalories} kcal</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Proteine</span>
              <span className="text-base font-bold text-blue-700">{targets.proteinGrams}g</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Carboidrati</span>
              <span className="text-base font-bold text-amber-700">{targets.carbsGrams}g</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Grassi</span>
              <span className="text-base font-bold text-rose-700">{targets.fatsGrams}g</span>
            </div>
          </div>

          {/* Focus Patologie se presenti */}
          {profile.pathologies.length > 0 && (
            <div className="mb-6 p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-950">
              <span className="font-bold block mb-1">Prescrizioni e Condizioni Cliniche Rilevate:</span>
              <div className="flex flex-wrap gap-2">
                {profile.pathologies.map(pid => {
                  const p = PATHOLOGIES_DATA[pid];
                  return (
                    <span key={pid} className="font-semibold bg-white border border-rose-200 px-2 py-0.5 rounded-md">
                      • {p ? p.name : pid}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pasti dei giorni selezionati */}
          <div className="space-y-6">
            {daysToPrint.map(day => {
              const dayTotals = calculateDayTotals(day);

              return (
                <div key={day.dayIndex} className="page-break border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3">
                    <h2 className="text-lg font-bold text-slate-900">{day.dayName}</h2>
                    <span className="text-xs font-semibold text-slate-600">
                      Totale: {dayTotals.calories} kcal (P: {dayTotals.protein}g | C: {dayTotals.carbs}g | G: {dayTotals.fats}g)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.meals.map(meal => {
                      const mealTot = calculateMealTotals(meal.foods);

                      return (
                        <div key={meal.id} className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 text-xs">
                          <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                            <span>{meal.name} ({meal.timeSlot})</span>
                            <span>{mealTot.calories} kcal</span>
                          </div>

                          <table className="w-full text-left">
                            <tbody>
                              {meal.foods.map((f, i) => (
                                <tr key={i} className="border-b border-slate-100 last:border-0">
                                  <td className="py-1 font-medium text-slate-800">{f.food.name}</td>
                                  <td className="py-1 font-bold text-right text-emerald-800">{f.grams}g</td>
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

          {/* Disclaimer Finale a fondo pagina */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 text-center">
            NutriPlan Pro • Documento informativo ad uso personale. Bere almeno {targets.waterLiters} litri di acqua al giorno. Per patologie cliniche croniche fare sempre riferimento al proprio medico curante o nutrizionista abilitato.
          </div>

        </div>

      </div>
    </div>
  );
};
