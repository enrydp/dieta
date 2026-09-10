import React, { useState, useMemo, useEffect } from 'react';
import { RECIPES_DATABASE } from '../data/recipes';
import { RecipeItem, RecipeCategory } from '../types/recipe';
import { UserProfile } from '../types/diet';
import { Search, Clock, ChefHat, Users, X, Leaf, Flame, Droplets, Wheat, ChevronDown, ChevronUp } from 'lucide-react';

interface RecipesViewProps {
  profile: UserProfile;
}

type FilterCategory = 'all' | RecipeCategory;

const CATEGORY_FILTERS: { key: FilterCategory; label: string; emoji: string }[] = [
  { key: 'all', label: 'Tutte', emoji: '🍽️' },
  { key: 'primi', label: 'Primi', emoji: '🍝' },
  { key: 'secondi_pesce', label: 'Pesce', emoji: '🐟' },
  { key: 'secondi_carne', label: 'Carne', emoji: '🍗' },
  { key: 'secondi_veg', label: 'Vegetariano', emoji: '🥗' },
  { key: 'colazione_snack', label: 'Col. & Spuntini', emoji: '🥣' },
  { key: 'contorni_zuppe', label: 'Contorni & Zuppe', emoji: '🥕' },
];

const RecipeCard: React.FC<{ recipe: RecipeItem; onSelect: (r: RecipeItem) => void }> = ({ recipe, onSelect }) => (
  <div
    onClick={() => onSelect(recipe)}
    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer overflow-hidden group"
  >
    {/* Color Header */}
    <div className={`h-2 w-full ${
      recipe.category === 'primi' ? 'bg-amber-400' :
      recipe.category === 'secondi_pesce' ? 'bg-blue-400' :
      recipe.category === 'secondi_carne' ? 'bg-red-400' :
      recipe.category === 'secondi_veg' ? 'bg-emerald-400' :
      recipe.category === 'colazione_snack' ? 'bg-purple-400' :
      'bg-orange-400'
    }`} />

    <div className="p-4">
      {/* Category Label & Badges */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{recipe.categoryLabel}</span>
        <div className="flex gap-1 flex-wrap">
          {recipe.isGlutenFree && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">Senza Glutine</span>
          )}
          {recipe.isLactoseFree && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">Senza Lattosio</span>
          )}
          {recipe.dietType === 'vegan' && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">Vegano</span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight group-hover:text-emerald-700 transition-colors mb-1">
        {recipe.title}
      </h3>
      <p className="text-[12px] text-slate-500 mb-3 leading-snug">{recipe.subtitle}</p>

      {/* Macros Quick View */}
      <div className="grid grid-cols-4 gap-1 mb-3">
        <div className="text-center bg-orange-50 rounded-xl py-1.5">
          <div className="text-xs font-black text-orange-600">{recipe.estimatedCalories}</div>
          <div className="text-[10px] text-orange-500">kcal</div>
        </div>
        <div className="text-center bg-blue-50 rounded-xl py-1.5">
          <div className="text-xs font-black text-blue-600">{recipe.proteinGrams}g</div>
          <div className="text-[10px] text-blue-500">Prot</div>
        </div>
        <div className="text-center bg-amber-50 rounded-xl py-1.5">
          <div className="text-xs font-black text-amber-600">{recipe.carbsGrams}g</div>
          <div className="text-[10px] text-amber-500">Carb</div>
        </div>
        <div className="text-center bg-emerald-50 rounded-xl py-1.5">
          <div className="text-xs font-black text-emerald-600">{recipe.fiberGrams}g</div>
          <div className="text-[10px] text-emerald-500">Fibre</div>
        </div>
      </div>

      {/* Time & Difficulty */}
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat className="w-3.5 h-3.5" />
          <span>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{recipe.servings} {recipe.servings === 1 ? 'persona' : 'persone'}</span>
        </div>
      </div>
    </div>
  </div>
);

const RecipeModal: React.FC<{ recipe: RecipeItem; onClose: () => void }> = ({ recipe, onClose }) => {
  const [showAllSteps, setShowAllSteps] = useState(true);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header - Fixed at Top */}
        <div className={`shrink-0 relative p-5 pb-4 text-white shadow-xs ${
          recipe.category === 'primi' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
          recipe.category === 'secondi_pesce' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
          recipe.category === 'secondi_carne' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
          recipe.category === 'secondi_veg' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
          recipe.category === 'colazione_snack' ? 'bg-gradient-to-br from-purple-500 to-violet-600' :
          'bg-gradient-to-br from-orange-500 to-amber-600'
        }`}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/35 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm z-30"
            title="Chiudi ricetta (Esc)"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-xs font-bold opacity-80 mb-1">{recipe.categoryLabel}</div>
          <h2 className="text-xl font-black leading-tight pr-12">{recipe.title}</h2>
          <p className="text-sm opacity-90 mt-1">{recipe.subtitle}</p>

          {/* Quick Info Row */}
          <div className="flex items-center gap-4 mt-3 text-xs font-semibold opacity-90">
            <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</div>
            <div className="flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" />{recipe.difficulty}</div>
            <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{recipe.servings} {recipe.servings === 1 ? 'persona' : 'persone'}</div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Macros Grid */}
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center bg-orange-50 border border-orange-100 rounded-2xl py-2.5">
              <Flame className="w-4 h-4 mx-auto text-orange-500 mb-1" />
              <div className="text-sm font-black text-orange-600">{recipe.estimatedCalories}</div>
              <div className="text-[10px] text-orange-400 font-semibold">kcal</div>
            </div>
            <div className="text-center bg-blue-50 border border-blue-100 rounded-2xl py-2.5">
              <div className="text-sm font-black text-blue-600">{recipe.proteinGrams}g</div>
              <div className="text-[10px] text-blue-400 font-semibold">Prot.</div>
            </div>
            <div className="text-center bg-amber-50 border border-amber-100 rounded-2xl py-2.5">
              <div className="text-sm font-black text-amber-600">{recipe.carbsGrams}g</div>
              <div className="text-[10px] text-amber-400 font-semibold">Carb.</div>
            </div>
            <div className="text-center bg-rose-50 border border-rose-100 rounded-2xl py-2.5">
              <Droplets className="w-3.5 h-3.5 mx-auto text-rose-400 mb-0.5" />
              <div className="text-sm font-black text-rose-600">{recipe.fatsGrams}g</div>
              <div className="text-[10px] text-rose-400 font-semibold">Grassi</div>
            </div>
            <div className="text-center bg-emerald-50 border border-emerald-100 rounded-2xl py-2.5">
              <Wheat className="w-3.5 h-3.5 mx-auto text-emerald-500 mb-0.5" />
              <div className="text-sm font-black text-emerald-600">{recipe.fiberGrams}g</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Fibre</div>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map(tag => (
                <span key={tag} className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🛒</span> Ingredienti
            </h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-baseline justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="text-sm font-semibold text-slate-800">{ing.name}</span>
                    {ing.note && <span className="text-xs text-slate-400 ml-1.5">({ing.note})</span>}
                  </div>
                  <span className="text-sm font-black text-emerald-600 ml-4 shrink-0">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">👨‍🍳</span> Preparazione
            </h3>
            <div className="space-y-3">
              {(showAllSteps ? recipe.instructions : recipe.instructions.slice(0, 3)).map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed flex-1">{step}</p>
                </div>
              ))}
            </div>
            {recipe.instructions.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllSteps(!showAllSteps)}
                className="mt-3 flex items-center gap-1 text-emerald-600 text-sm font-bold hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {showAllSteps ? (
                  <><ChevronUp className="w-4 h-4" /> Mostra meno</>
                ) : (
                  <><ChevronDown className="w-4 h-4" /> Mostra tutti i {recipe.instructions.length} passaggi</>
                )}
              </button>
            )}
          </div>

          {/* Dietary Tips */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-black text-emerald-800">Consiglio Nutrizionale</h4>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">{recipe.dietaryTips}</p>
          </div>
        </div>

        {/* Modal Footer - Fixed at Bottom */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Premi <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-2xs">ESC</kbd> o clicca fuori per chiudere
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ml-auto"
          >
            <X className="w-4 h-4" />
            <span>Chiudi Ricetta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const RecipesView: React.FC<RecipesViewProps> = ({ profile }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  const filtered = useMemo(() => {
    return RECIPES_DATABASE.filter(r => {
      const matchCat = activeFilter === 'all' || r.category === activeFilter;
      const q = search.toLowerCase().trim();
      const matchSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q));
      
      // Filter for diet type compatibility
      let matchDiet = true;
      if (profile.dietType === 'vegan') matchDiet = r.dietType === 'vegan';
      else if (profile.dietType === 'vegetarian') matchDiet = r.dietType === 'vegan' || r.dietType === 'vegetarian';

      return matchCat && matchSearch && matchDiet;
    });
  }, [search, activeFilter, profile.dietType]);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
            👨‍🍳
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black leading-tight">Ricette della Dieta</h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
              {RECIPES_DATABASE.length} ricette sane e bilanciate ispirate ai pasti del tuo piano — con ingredienti, dosi e valori nutrizionali.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cerca ricetta o ingrediente…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-xs"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORY_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              activeFilter === f.key
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-500 font-semibold">
        {filtered.length} ricett{filtered.length === 1 ? 'a' : 'e'} trovat{filtered.length === 1 ? 'a' : 'e'}
      </div>

      {/* Recipe Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={setSelectedRecipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <div className="text-5xl mb-3">🍽️</div>
          <p className="font-bold text-slate-600">Nessuna ricetta trovata</p>
          <p className="text-sm mt-1">Prova a modificare i filtri o la ricerca</p>
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};
