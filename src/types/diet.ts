export type Gender = 'male' | 'female';

export type ActivityLevel = 
  | 'sedentary'      // 1.2 Poco o nessun esercizio, lavoro sedentario
  | 'light'          // 1.375 Esercizio leggero 1-3 gg/settimana
  | 'moderate'       // 1.55 Esercizio moderato 3-5 gg/settimana
  | 'heavy'          // 1.725 Esercizio pesante 6-7 gg/settimana
  | 'athlete';       // 1.9 Esercizio molto intenso o lavoro fisico pesante

export type FitnessGoal = 
  | 'cut_slow'       // Dimagrimento graduale (-15% deficit)
  | 'cut_fast'       // Dimagrimento rapido (-20% deficit)
  | 'maintain'       // Mantenimento / Tonificazione (TDEE)
  | 'recomp'         // Ricomposizione corporea
  | 'bulk_clean'     // Aumento massa magra (+10% surplus)
  | 'bulk_high';     // Crescita muscolare rapida (+15% surplus)

export type DietType = 
  | 'mediterranean'  // Dieta Mediterranea bilanciata
  | 'standard'       // Onnivora standard
  | 'vegetarian'     // Vegetariana (uova e latticini sì, carne/pesce no)
  | 'vegan'          // Vegana (100% vegetale)
  | 'low_carb';      // Low-Carb controllata

export type PathologyId =
  | 'diabetes'           // Diabete Tipo 2 / Insulino-resistenza
  | 'cholesterol'        // Ipercolesterolemia / Dislipidemia
  | 'hypertension'       // Ipertensione Arteriosa (DASH)
  | 'nafld'              // Steatosi Epatica (Fegato grasso)
  | 'gout'               // Gotta / Iperuricemia
  | 'gerd_gastritis'     // Reflusso gastroesofageo / Gastrite
  | 'ibs_fodmap'         // Intestino Irritabile (IBS / Low-FODMAP)
  | 'celiac'             // Celiachia (Senza Glutine)
  | 'lactose'            // Intolleranza al Lattosio
  | 'mild_renal';        // Insufficienza renale lieve (controllo proteine)

export interface PathologyInfo {
  id: PathologyId;
  name: string;
  badge: string;
  severity: 'high' | 'medium' | 'low';
  summary: string;
  nutritionalRules: string[];
  recommendedFoods: string[];
  avoidFoods: string[];
  clinicalNotes: string;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  waistCm?: number;
  neckCm?: number;
  hipCm?: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  dietType: DietType;
  mealsPerDay: number; // 3 to 6
  pathologies: PathologyId[];
  isConfigured?: boolean;
  avatarStyle?: string;
}

export type FoodCategory =
  | 'cereals_grains'  // Pasta, riso, avena, pane, patate, cereali
  | 'proteins_meat'   // Pollo, tacchino, manzo magro
  | 'proteins_fish'   // Salmone, merluzzo, tonno, orata, sgombro
  | 'proteins_dairy'  // Yogurt greco, fiocchi di latte, parmigiano, ricotta
  | 'proteins_plant'  // Legumi, tofu, tempeh, hummus
  | 'eggs'            // Uova, albumi
  | 'vegetables'      // Ortaggi, verdure a foglia verde
  | 'fruits'          // Frutta fresca varia
  | 'nuts_seeds'      // Noci, mandorle, semi di lino/chia, burro d'arachidi
  | 'oils_fats'       // Olio EVO, avocado
  | 'beverages';      // Tè verde, tisane, latte vegetale

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  calories: number;        // kcal per 100g
  protein: number;         // g per 100g
  carbs: number;           // g per 100g
  sugars: number;          // g per 100g
  fats: number;            // g per 100g
  satFats: number;         // g per 100g
  fiber: number;           // g per 100g
  sodiumMg: number;        // mg per 100g
  purines: 'low' | 'medium' | 'high';
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  fodmap: 'low' | 'medium' | 'high';
  isVegan: boolean;
  isVegetarian: boolean;
  standardServingGrams: number;
  servingDescription: string;
  // Note o tag per patologie
  pathologySuitability?: {
    [key in PathologyId]?: 'recommended' | 'moderation' | 'avoid';
  };
}

export type MealCategory = 
  | 'breakfast'
  | 'snack_morning'
  | 'lunch'
  | 'snack_afternoon'
  | 'dinner'
  | 'snack_night';

export interface MealFoodItem {
  food: FoodItem;
  grams: number;
}

export interface MealPlan {
  id: string;
  category: MealCategory;
  name: string;
  timeSlot: string;
  foods: MealFoodItem[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}

export interface DayDietPlan {
  dayIndex: number;
  dayName: string;
  meals: MealPlan[];
}

export interface MacroTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  proteinKcal: number;
  carbsGrams: number;
  carbsKcal: number;
  fatsGrams: number;
  fatsKcal: number;
  fiberGramsMin: number;
  waterLiters: number;
  bmi: number;
  bmiCategory: string;
  bodyFatPercentage?: number;
}
