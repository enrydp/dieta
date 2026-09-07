import React, { useState } from 'react';
import { MealPlan, FoodItem, MealFoodItem, UserProfile } from '../types/diet';
import { calculateMealTotals } from '../utils/planGenerator';
import { FoodSwapModal } from './FoodSwapModal';
import { FoodDatabaseModal } from './FoodDatabaseModal';
import { Clock, Plus, ArrowRightLeft, Trash2, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface MealCardProps {
  meal: MealPlan;
  profile: UserProfile;
  onUpdateMeal: (updatedMeal: MealPlan) => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  profile,
  onUpdateMeal
}) => {
  const [swapItemIndex, setSwapItemIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totals = calculateMealTotals(meal.foods);

  const handleGramsChange = (index: number, newGrams: number) => {
    const updatedFoods = [...meal.foods];
    updatedFoods[index] = {
      ...updatedFoods[index],
      grams: Math.max(1, newGrams)
    };
    onUpdateMeal({ ...meal, foods: updatedFoods });
  };

  const handleRemoveFood = (index: number) => {
    const updatedFoods = meal.foods.filter((_, i) => i !== index);
    onUpdateMeal({ ...meal, foods: updatedFoods });
  };

  const handleSwapConfirm = (newFood: FoodItem, newGrams: number) => {
    if (swapItemIndex === null) return;
    const updatedFoods = [...meal.foods];
    updatedFoods[swapItemIndex] = {
      food: newFood,
      grams: newGrams
    };
    onUpdateMeal({ ...meal, foods: updatedFoods });
    setSwapItemIndex(null);
  };

  const handleAddFoodConfirm = (food: FoodItem, grams: number) => {
    const updatedFoods = [...meal.foods, { food, grams }];
    onUpdateMeal({ ...meal, foods: updatedFoods });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden">
      
      {/* Header pasto */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-slate-50/90 to-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            {meal.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">{meal.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{meal.timeSlot}</span>
            </div>
          </div>
        </div>

        {/* Totali pasto */}
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Calorie</span>
            <span className="font-bold text-slate-900">{totals.calories} kcal</span>
          </div>
          <div className="w-px h-5 bg-slate-300" />
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Macro</span>
            <span className="font-semibold text-slate-700">
              P:<span className="text-blue-600 font-bold">{totals.protein}g</span> | 
              C:<span className="text-amber-600 font-bold">{totals.carbs}g</span> | 
              G:<span className="text-rose-600 font-bold">{totals.fats}g</span>
            </span>
          </div>
        </div>
      </div>

      {/* Lista alimenti */}
      <div className="divide-y divide-slate-100">
        {meal.foods.map((item, idx) => {
          const ratio = item.grams / 100;
          const cal = Math.round(item.food.calories * ratio);
          const prot = (item.food.protein * ratio).toFixed(1);
          const carbs = (item.food.carbs * ratio).toFixed(1);
          const fats = (item.food.fats * ratio).toFixed(1);

          // Verifica se è consigliato per patologie attive
          const isRecommended = profile.pathologies.some(
            p => item.food.pathologySuitability && item.food.pathologySuitability[p] === 'recommended'
          );

          return (
            <div key={`${item.food.id}-${idx}`} className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Info alimento */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 text-sm">{item.food.name}</span>
                  {isRecommended && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Ideale
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-2.5">
                  <span className="font-medium text-slate-700">{cal} kcal</span>
                  <span>Proteine: {prot}g</span>
                  <span>Carboidrati: {carbs}g</span>
                  <span>Grassi: {fats}g</span>
                  {item.food.fiber > 0 && <span>Fibra: {(item.food.fiber * ratio).toFixed(1)}g</span>}
                </div>
              </div>

              {/* Controlli grammatura e azioni */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                
                {/* Stepper Grammi */}
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    onClick={() => handleGramsChange(idx, item.grams - 10)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white rounded-md transition-all"
                    title="Diminuisci 10g"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min={5}
                    max={1000}
                    step={5}
                    value={item.grams}
                    onChange={(e) => handleGramsChange(idx, Number(e.target.value))}
                    className="w-14 text-center text-xs font-bold bg-transparent text-slate-800 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 pr-1">g</span>
                  <button
                    onClick={() => handleGramsChange(idx, item.grams + 10)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white rounded-md transition-all"
                    title="Aumenta 10g"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sostituisci alimento */}
                <button
                  onClick={() => setSwapItemIndex(idx)}
                  className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  title="Sostituisci con alimento equivalente"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Scambia</span>
                </button>

                {/* Rimuovi alimento */}
                <button
                  onClick={() => handleRemoveFood(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Rimuovi alimento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>

            </div>
          );
        })}

        {meal.foods.length === 0 && (
          <div className="p-6 text-center text-slate-400 text-sm">
            Nessun alimento presente in questo pasto.
          </div>
        )}
      </div>

      {/* Footer con pulsante aggiunta alimento */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex justify-center">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-1.5 rounded-xl border border-emerald-200/80 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Aggiungi Alimento</span>
        </button>
      </div>

      {/* Modale Sostituzione Equivalente */}
      {swapItemIndex !== null && meal.foods[swapItemIndex] && (
        <FoodSwapModal
          isOpen={true}
          currentMealItem={meal.foods[swapItemIndex]}
          profile={profile}
          onClose={() => setSwapItemIndex(null)}
          onConfirmSwap={handleSwapConfirm}
        />
      )}

      {/* Modale Aggiunta Alimento */}
      <FoodDatabaseModal
        isOpen={isAddModalOpen}
        profile={profile}
        mealName={meal.name}
        onClose={() => setIsAddModalOpen(false)}
        onAddFood={handleAddFoodConfirm}
      />

    </div>
  );
};
