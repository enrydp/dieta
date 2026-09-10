import { PathologyId } from './diet';

export type RecipeCategory =
  | 'primi'
  | 'secondi_pesce'
  | 'secondi_carne'
  | 'secondi_veg'
  | 'colazione_snack'
  | 'contorni_zuppe';

export interface RecipeIngredient {
  name: string;
  amount: string;
  note?: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  subtitle: string;
  category: RecipeCategory;
  categoryLabel: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: 'Facile' | 'Media';
  servings: number;
  estimatedCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  fiberGrams: number;
  tags: string[];
  suitablePathologies?: PathologyId[];
  avoidPathologies?: PathologyId[];
  dietType?: 'omnivore' | 'pescatarian' | 'vegetarian' | 'vegan';
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  ingredients: RecipeIngredient[];
  instructions: string[];
  dietaryTips: string;
}
