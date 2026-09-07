import React, { useState } from 'react';
import { FoodItem, UserProfile } from '../types/diet';
import { FOODS_DATABASE } from '../data/foods';
import { isFoodAllowed } from '../utils/planGenerator';
import { X, Search, Plus, Check } from 'lucide-react';

interface FoodDatabaseModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem, grams: number) => void;
  mealName: string;
}

export const FoodDatabaseModal: React.FC<FoodDatabaseModalProps> = ({
  profile,
  isOpen,
  onClose,
  onAddFood,
  mealName
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState<number>(100);

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'cereals_grains', label: 'Cereali & Tuberi' },
    { id: 'proteins_meat', label: 'Carni' },
    { id: 'proteins_fish', label: 'Pesce' },
    { id: 'eggs', label: 'Uova' },
    { id: 'proteins_dairy', label: 'Latticini' },
    { id: 'proteins_plant', label: 'Legumi & Vegetali' },
    { id: 'vegetables', label: 'Verdure' },
    { id: 'fruits', label: 'Frutta' },
    { id: 'nuts_seeds', label: 'Frutta Secca' },
    { id: 'oils_fats', label: 'Oli & Grassi' }
  ];

  const filteredFoods = FOODS_DATABASE.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const isAllowed = isFoodAllowed(food, profile);
    return matchesSearch && matchesCategory && isAllowed;
  });

  const handleSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setGrams(food.standardServingGrams || 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">Aggiungi Alimento a: {mealName}</h3>
            <p className="text-xs text-slate-500">Cerca tra centinaia di alimenti conformi al tuo profilo</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cerca alimento (es. pollo, riso, mela, parmigiano)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {filteredFoods.map(food => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <div
                key={food.id}
                onClick={() => handleSelect(food)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-sm ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-800">{food.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 flex gap-3">
                    <span>{food.calories} kcal/100g</span>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>G: {food.fats}g</span>
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

          {filteredFoods.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nessun alimento trovato per questa ricerca o compatibile con le patologie selezionate.
            </div>
          )}
        </div>

        {/* Grams & Add Footer */}
        {selectedFood && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Quantità:</label>
              <input
                type="number"
                min={5}
                max={1000}
                step={5}
                value={grams}
                onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                className="w-20 px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-center font-bold"
              />
              <span className="text-xs text-slate-500">grammi</span>
            </div>

            <button
              onClick={() => {
                onAddFood(selectedFood, grams);
                onClose();
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Aggiungi al Pasto</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
