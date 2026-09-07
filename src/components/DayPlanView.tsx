import React from 'react';
import { DayDietPlan, MealPlan, UserProfile, MacroTargets } from '../types/diet';
import { MacroOverview } from './MacroOverview';
import { MealCard } from './MealCard';
import { RefreshCw, Calendar, Sparkles, FileDown, Download } from 'lucide-react';

interface DayPlanViewProps {
  dayPlan: DayDietPlan;
  activeDayIndex: number;
  onSelectDayIndex: (index: number) => void;
  profile: UserProfile;
  targets: MacroTargets;
  onUpdateMeal: (meal: MealPlan) => void;
  onRegenerateDay: () => void;
  onRegenerateAll?: () => void;
  onOpenPathologyModal: () => void;
  onOpenPrintModal: () => void;
}

export const DayPlanView: React.FC<DayPlanViewProps> = ({
  dayPlan,
  activeDayIndex,
  onSelectDayIndex,
  profile,
  targets,
  onUpdateMeal,
  onRegenerateDay,
  onRegenerateAll,
  onOpenPathologyModal,
  onOpenPrintModal
}) => {
  const dayLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
      
      {/* Banner Rapido Genera PDF (Ad altissima visibilità su Cellulari) */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-2xl p-3.5 sm:p-4 text-white shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-sm sm:text-base leading-tight">
              Genera PDF del Piano
            </div>
            <div className="text-[11px] text-emerald-100 mt-0.5 leading-snug">
              Scarica {dayPlan.dayName} o l'intera settimana (7 giorni)
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPrintModal}
          className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white text-emerald-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>SCARICA PDF</span>
        </button>
      </div>

      {/* Day Selector Pills */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar no-print">
        <div className="flex items-center gap-1 sm:gap-2 flex-1">
          {dayLabels.map((label, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={label}
                onClick={() => onSelectDayIndex(idx)}
                className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs scale-102'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={onRegenerateDay}
          className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          title="Rigenera solo questo giorno"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="text-[11px] sm:text-xs font-bold">Varia Giorno</span>
        </button>

        <button
          onClick={onOpenPrintModal}
          className="p-2 sm:px-3 sm:py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          title="Genera PDF del piano alimentare"
        >
          <FileDown className="w-3.5 h-3.5 text-white" />
          <span className="font-extrabold text-xs">PDF</span>
        </button>
      </div>

      {/* Cruscotto Calorie & Macro Raggiunti vs Target */}
      <MacroOverview
        targets={targets}
        currentDay={dayPlan}
        profile={profile}
        onOpenPathologyModal={onOpenPathologyModal}
      />

      {/* Elenco Pasti del Giorno */}
      <div className="space-y-4">
        {dayPlan.meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            profile={profile}
            onUpdateMeal={onUpdateMeal}
          />
        ))}
      </div>

      {/* Pulsanti Grandi a Fine Pagina: Rigenera Pasti o Intero Piano */}
      <div className="pt-6 pb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
        <button
          onClick={onRegenerateDay}
          className="flex-1 sm:flex-initial px-6 py-4 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-extrabold text-sm sm:text-base rounded-2xl border-2 border-slate-200 shadow-sm hover:border-slate-300 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          title="Varia e rigenera i pasti di questa specifica giornata"
        >
          <RefreshCw className="w-5 h-5 text-emerald-600" />
          <span>Varia Pasti di {dayPlan.dayName}</span>
        </button>

        {onRegenerateAll && (
          <button
            onClick={onRegenerateAll}
            className="flex-1 sm:flex-initial px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white font-black text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            title="Rigenera con nuovi alimenti tutti i 7 giorni della settimana"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>Rigenera Intero Piano Alimentare</span>
          </button>
        )}
      </div>

    </div>
  );
};
