import React, { useState } from 'react';
import { FoodItem, MealFoodItem, UserProfile } from '../types/diet';
import { FOODS_DATABASE } from '../data/foods';
import { isFoodAllowed, calculateEquivalentGrams } from '../utils/planGenerator';
import { X, ArrowRightLeft, Check, Sparkles, AlertCircle } from 'lucide-react';

interface FoodSwapModalProps {
  currentMealItem: MealFoodItem;
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSwap: (newFood: FoodItem, newGrams: number) => void;
}

export const FoodSwapModal: React.FC<FoodSwapModalProps> = ({
  currentMealItem,
  profile,
  isOpen,
  onClose,
  onConfirmSwap
}) => {
  if (!isOpen) return null;

  const { food: currentFood, grams: currentGrams } = currentMealItem;

  // Cerca alimenti compatibili nella stessa categoria o categorie affini
  const candidateFoods = FOODS_DATABASE.filter(f => {
    if (f.id === currentFood.id) return false;
    if (!isFoodAllowed(f, profile)) return false;

    // Macro-raggruppamenti per equivalenza logica
    const isGrain = ['cereals_grains'].includes(currentFood.category);
    const isProtein = ['proteins_meat', 'proteins_fish', 'eggs', 'proteins_plant', 'proteins_dairy'].includes(currentFood.category);
    const isVeg = ['vegetables'].includes(currentFood.category);
    const isFruit = ['fruits'].includes(currentFood.category);
    const isFat = ['oils_fats', 'nuts_seeds'].includes(currentFood.category);

    if (isGrain) return f.category === 'cereals_grains';
    if (isProtein) return ['proteins_meat', 'proteins_fish', 'eggs', 'proteins_plant', 'proteins_dairy'].includes(f.category);
    if (isVeg) return f.category === 'vegetables';
    if (isFruit) return f.category === 'fruits';
    if (isFat) return ['oils_fats', 'nuts_seeds'].includes(f.category);

    return f.category === currentFood.category;
  });

  const [selectedFoodId, setSelectedFoodId] = useState<string>(candidateFoods[0]?.id || '');
  const selectedFood = candidateFoods.find(f => f.id === selectedFoodId) || candidateFoods[0];

  const equivalentGrams = selectedFood
    ? calculateEquivalentGrams(currentFood, currentGrams, selectedFood)
    : 0;

  // Calcolo nutrizionale a confronto
  const oldRatio = currentGrams / 100;
  const newRatio = equivalentGrams / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Sostituzione Equivalente</h3>
              <p className="text-xs text-slate-500">Mantieni i macronutrienti variando l'alimento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Box alimento attuale */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Alimento Attuale nel Piano:
            </div>
            <div className="flex justify-between items-center font-bold text-slate-900">
              <span>{currentFood.name}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {currentGrams}g
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex gap-3">
              <span>{Math.round(currentFood.calories * oldRatio)} kcal</span>
              <span>P: {(currentFood.protein * oldRatio).toFixed(1)}g</span>
              <span>C: {(currentFood.carbs * oldRatio).toFixed(1)}g</span>
              <span>G: {(currentFood.fats * oldRatio).toFixed(1)}g</span>
            </div>
          </div>

          {/* Selezione nuovo alimento */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Scegli una valida alternativa (conforme al tuo profilo):
            </label>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {candidateFoods.map(cand => {
                const isSelected = cand.id === selectedFoodId;
                const eqG = calculateEquivalentGrams(currentFood, currentGrams, cand);

                return (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedFoodId(cand.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-sm ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{cand.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Porzione equivalente calcolata: <span className="font-bold text-emerald-800">{eqG}g</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Riepilogo confronto nutrizionale */}
          {selectedFood && (
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Risultato con la Sostituzione:
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <div className="text-slate-500 text-[10px] uppercase">Calorie</div>
                  <div className="font-bold text-slate-900">{Math.round(selectedFood.calories * newRatio)}</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <div className="text-slate-500 text-[10px] uppercase">Proteine</div>
                  <div className="font-bold text-blue-700">{(selectedFood.protein * newRatio).toFixed(1)}g</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <div className="text-slate-500 text-[10px] uppercase">Carboidrati</div>
                  <div className="font-bold text-amber-700">{(selectedFood.carbs * newRatio).toFixed(1)}g</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <div className="text-slate-500 text-[10px] uppercase">Grassi</div>
                  <div className="font-bold text-rose-700">{(selectedFood.fats * newRatio).toFixed(1)}g</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors"
          >
            Annulla
          </button>
          <button
            disabled={!selectedFood}
            onClick={() => {
              if (selectedFood) {
                onConfirmSwap(selectedFood, equivalentGrams);
                onClose();
              }
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Applica Sostituzione</span>
          </button>
        </div>

      </div>
    </div>
  );
};
