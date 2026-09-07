import React from 'react';
import { MacroTargets, DayDietPlan, UserProfile } from '../types/diet';
import { calculateDayTotals } from '../utils/planGenerator';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { Flame, Dumbbell, Wheat, Droplet, Sparkles, HeartPulse } from 'lucide-react';

interface MacroOverviewProps {
  targets: MacroTargets;
  currentDay: DayDietPlan;
  profile: UserProfile;
  onOpenPathologyModal?: () => void;
}

export const MacroOverview: React.FC<MacroOverviewProps> = ({
  targets,
  currentDay,
  profile,
  onOpenPathologyModal
}) => {
  const currentTotals = calculateDayTotals(currentDay);

  const calPercent = Math.min(100, Math.round((currentTotals.calories / targets.targetCalories) * 100));
  const protPercent = Math.min(100, Math.round((currentTotals.protein / targets.proteinGrams) * 100));
  const carbsPercent = Math.min(100, Math.round((currentTotals.carbs / targets.carbsGrams) * 100));
  const fatsPercent = Math.min(100, Math.round((currentTotals.fats / targets.fatsGrams) * 100));
  const fiberPercent = Math.min(100, Math.round((currentTotals.fiber / targets.fiberGramsMin) * 100));

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-6">
      
      {/* Intestazione con info giorno e badge patologie */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">
              {currentDay.dayName}
            </h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
              Obiettivo: {profile.goal.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            BMR: <span className="font-semibold">{targets.bmr} kcal</span> | TDEE: <span className="font-semibold">{targets.tdee} kcal</span> | Acqua: <span className="font-semibold text-sky-600">{targets.waterLiters} L/die</span>
          </p>
        </div>

        {/* Patologie attive */}
        {profile.pathologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 cursor-pointer" onClick={onOpenPathologyModal}>
            <span className="text-xs text-slate-500 mr-1 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              Focus Clinici:
            </span>
            {profile.pathologies.map(pid => {
              const p = PATHOLOGIES_DATA[pid];
              return (
                <span
                  key={pid}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 hover:bg-rose-100 transition-colors"
                >
                  {p ? p.name.split('/')[0].trim() : pid}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Griglia Calorie & Macronutrienti */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Calorie Totali */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl p-3.5 border border-emerald-100">
          <div className="flex items-center justify-between text-emerald-800 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-4 h-4 text-emerald-600" />
              Calorie
            </span>
            <span className="text-xs font-bold bg-white text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
              {calPercent}%
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{currentTotals.calories}</span>
            <span className="text-xs text-slate-500">/ {targets.targetCalories} kcal</span>
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-2 mt-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                calPercent > 105 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(calPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Proteine */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between text-blue-700 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5" />
              Proteine
            </span>
            <span className="text-[11px] font-semibold text-slate-500">{protPercent}%</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-slate-900">{currentTotals.protein}g</span>
            <span className="text-xs text-slate-500">/ {targets.proteinGrams}g</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(protPercent, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {profile.pathologies.includes('mild_renal') ? 'Protette (0.75g/kg)' : `${((currentTotals.protein * 4 / (currentTotals.calories || 1)) * 100).toFixed(0)}% delle calorie`}
          </span>
        </div>

        {/* Carboidrati */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between text-amber-700 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Wheat className="w-3.5 h-3.5" />
              Carboidrati
            </span>
            <span className="text-[11px] font-semibold text-slate-500">{carbsPercent}%</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-slate-900">{currentTotals.carbs}g</span>
            <span className="text-xs text-slate-500">/ {targets.carbsGrams}g</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(carbsPercent, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {profile.pathologies.includes('diabetes') ? 'A basso indice glicemico' : 'Complessi & Cereali'}
          </span>
        </div>

        {/* Grassi */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between text-rose-700 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5" />
              Grassi
            </span>
            <span className="text-[11px] font-semibold text-slate-500">{fatsPercent}%</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-slate-900">{currentTotals.fats}g</span>
            <span className="text-xs text-slate-500">/ {targets.fatsGrams}g</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(fatsPercent, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {profile.pathologies.includes('cholesterol') ? 'Olio EVO & Omega-3' : 'Sani mono e polinsaturi'}
          </span>
        </div>

        {/* Fibre & Micronutrienti */}
        <div className="col-span-2 lg:col-span-1 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between text-teal-700 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Fibre & Sodio
            </span>
            <span className="text-[11px] font-semibold text-slate-500">{fiberPercent}%</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-slate-900">{currentTotals.fiber}g</span>
            <span className="text-xs text-slate-500">/ min {targets.fiberGramsMin}g</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(fiberPercent, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Sodio stimato: <span className="font-semibold">{currentTotals.sodiumMg} mg</span>
            {profile.pathologies.includes('hypertension') && currentTotals.sodiumMg < 1500 ? ' (Ottimo DASH)' : ''}
          </span>
        </div>

      </div>

    </div>
  );
};
