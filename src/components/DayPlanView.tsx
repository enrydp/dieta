import React from 'react';
import { DayDietPlan, MealPlan, UserProfile, MacroTargets } from '../types/diet';
import { MacroOverview } from './MacroOverview';
import { MealCard } from './MealCard';
import { RefreshCw, Calendar, Sparkles } from 'lucide-react';

interface DayPlanViewProps {
  dayPlan: DayDietPlan;
  activeDayIndex: number;
  onSelectDayIndex: (index: number) => void;
  profile: UserProfile;
  targets: MacroTargets;
  onUpdateMeal: (meal: MealPlan) => void;
  onRegenerateDay: () => void;
  onOpenPathologyModal: () => void;
}

export const DayPlanView: React.FC<DayPlanViewProps> = ({
  dayPlan,
  activeDayIndex,
  onSelectDayIndex,
  profile,
  targets,
  onUpdateMeal,
  onRegenerateDay,
  onOpenPathologyModal
}) => {
  const dayLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
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
          className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0"
          title="Rigenera solo questo giorno"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Varia Giorno</span>
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

    </div>
  );
};
