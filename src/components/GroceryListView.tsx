import React, { useState } from 'react';
import { DayDietPlan, FoodCategory } from '../types/diet';
import { ShoppingBag, Check, Copy, Printer, Sparkles, CheckSquare, Square } from 'lucide-react';

interface GroceryListViewProps {
  weekPlan: DayDietPlan[];
}

export const GroceryListView: React.FC<GroceryListViewProps> = ({ weekPlan }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Aggrega tutti i cibi della settimana
  const aggregated: Record<string, { name: string; category: FoodCategory; totalGrams: number; unit: string }> = {};

  for (const day of weekPlan) {
    for (const meal of day.meals) {
      for (const item of meal.foods) {
        if (!aggregated[item.food.id]) {
          aggregated[item.food.id] = {
            name: item.food.name,
            category: item.food.category,
            totalGrams: 0,
            unit: 'g'
          };
        }
        aggregated[item.food.id].totalGrams += item.grams;
      }
    }
  }

  const categoryGroups: { title: string; categories: FoodCategory[] }[] = [
    {
      title: '🥬 Ortofrutta Fresca',
      categories: ['vegetables', 'fruits']
    },
    {
      title: '🥩 Macelleria & Pescheria',
      categories: ['proteins_meat', 'proteins_fish']
    },
    {
      title: '🥚 Latticini & Uova',
      categories: ['proteins_dairy', 'eggs']
    },
    {
      title: '🌾 Cereali, Pasta & Tuberi',
      categories: ['cereals_grains', 'proteins_plant']
    },
    {
      title: '🫒 Frutta Secca, Oli & Condimenti',
      categories: ['oils_fats', 'nuts_seeds']
    }
  ];

  const toggleCheck = (foodId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [foodId]: !prev[foodId]
    }));
  };

  const formatQuantity = (grams: number, foodName: string) => {
    if (foodName.toLowerCase().includes('uova')) {
      const eggs = Math.round(grams / 55);
      return `${eggs} uova (~${grams}g)`;
    }
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(2)} kg`;
    }
    return `${grams}g`;
  };

  const handleCopyText = () => {
    let text = "🛒 LISTA DELLA SPESA SETTIMANALE - NUTRIPLAN\n\n";
    for (const group of categoryGroups) {
      const itemsInGroup = Object.entries(aggregated).filter(([_, data]) =>
        group.categories.includes(data.category)
      );
      if (itemsInGroup.length > 0) {
        text += `--- ${group.title} ---\n`;
        itemsInGroup.forEach(([_, item]) => {
          text += `• ${item.name}: ${formatQuantity(item.totalGrams, item.name)}\n`;
        });
        text += "\n";
      }
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const totalItemsCount = Object.keys(aggregated).length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Lista Spesa */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>Lista della Spesa Intelligente (7 Giorni)</span>
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {checkedCount}/{totalItemsCount} spuntati
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quantità nette calcolate al grammo per l'intera settimana, raggruppate per corsia del supermercato.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiata!' : 'Copia Testo'}</span>
          </button>
        </div>
      </div>

      {/* Raggruppamenti per Reparto */}
      <div className="space-y-4">
        {categoryGroups.map(group => {
          const itemsInGroup = Object.entries(aggregated).filter(([_, data]) =>
            group.categories.includes(data.category)
          );

          if (itemsInGroup.length === 0) return null;

          return (
            <div key={group.title} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 font-bold text-slate-800 text-sm">
                {group.title}
              </div>

              <div className="divide-y divide-slate-100">
                {itemsInGroup.map(([foodId, item]) => {
                  const isChecked = !!checkedItems[foodId];

                  return (
                    <div
                      key={foodId}
                      onClick={() => toggleCheck(foodId)}
                      className={`p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked ? 'bg-slate-50/80 line-through text-slate-400' : 'hover:bg-slate-50/50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-sm ${isChecked ? 'font-normal' : 'font-semibold'}`}>
                          {item.name}
                        </span>
                      </div>

                      <div className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg ${
                        isChecked
                          ? 'bg-slate-200/60 text-slate-500'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {formatQuantity(item.totalGrams, item.name)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
