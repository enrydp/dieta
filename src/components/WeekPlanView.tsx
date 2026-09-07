import React from 'react';
import { DayDietPlan, UserProfile, MacroTargets } from '../types/diet';
import { calculateDayTotals } from '../utils/planGenerator';
import { Calendar, ArrowRight, RefreshCw, Flame, Dumbbell, Sparkles, FileDown } from 'lucide-react';

interface WeekPlanViewProps {
  weekPlan: DayDietPlan[];
  profile: UserProfile;
  targets: MacroTargets;
  onSelectDayIndex: (index: number) => void;
  onRegenerateAll: () => void;
  onOpenPrintModal: () => void;
}

export const WeekPlanView: React.FC<WeekPlanViewProps> = ({
  weekPlan,
  profile,
  targets,
  onSelectDayIndex,
  onRegenerateAll,
  onOpenPrintModal
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Settimana */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Piano Alimentare Settimanale Completo (7 Giorni)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualizza la rotazione completa dei pasti. Clicca su un giorno per modificare grammature o cambiare alimenti.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            title="Genera PDF della settimana"
          >
            <FileDown className="w-4 h-4" />
            <span>Scarica PDF (7 gg)</span>
          </button>

          <button
            onClick={onRegenerateAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold rounded-xl border border-emerald-200 transition-colors shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Rigenera Intera Settimana</span>
          </button>
        </div>
      </div>

      {/* Griglia dei 7 Giorni */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weekPlan.map(day => {
          const totals = calculateDayTotals(day);
          const lunch = day.meals.find(m => m.category === 'lunch');
          const dinner = day.meals.find(m => m.category === 'dinner');
          const breakfast = day.meals.find(m => m.category === 'breakfast');

          return (
            <div
              key={day.dayIndex}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Giorno */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className="font-bold text-base text-slate-900">{day.dayName}</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{totals.calories} kcal</span>
                  </div>
                </div>

                {/* Macro pillole */}
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-3">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-semibold">
                    P: {totals.protein}g
                  </span>
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-semibold">
                    C: {totals.carbs}g
                  </span>
                  <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-semibold">
                    G: {totals.fats}g
                  </span>
                  <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md font-semibold">
                    F: {totals.fiber}g
                  </span>
                </div>

                {/* Piatti chiave */}
                <div className="space-y-2 text-xs text-slate-600">
                  {breakfast && (
                    <div className="line-clamp-1">
                      <span className="font-bold text-slate-700">Colazione: </span>
                      {breakfast.foods.map(f => f.food.name).join(', ')}
                    </div>
                  )}
                  {lunch && (
                    <div className="line-clamp-1">
                      <span className="font-bold text-slate-700">Pranzo: </span>
                      {lunch.foods.map(f => f.food.name).join(', ')}
                    </div>
                  )}
                  {dinner && (
                    <div className="line-clamp-1">
                      <span className="font-bold text-slate-700">Cena: </span>
                      {dinner.foods.map(f => f.food.name).join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Azione Apri Giorno */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onSelectDayIndex(day.dayIndex)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Dettaglio & Modifica</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pulsante Grande a Fine Pagina: Rigenera Intera Settimana */}
      <div className="pt-6 pb-10 flex justify-center">
        <button
          onClick={onRegenerateAll}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white font-black text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          title="Rigenera tutti i 7 giorni della settimana con nuove combinazioni alimentari"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Rigenera Intera Settimana con Nuovi Alimenti</span>
        </button>
      </div>

    </div>
  );
};
