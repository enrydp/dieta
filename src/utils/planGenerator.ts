import { UserProfile, MealCategory, MealPlan, DayDietPlan, FoodItem, MealFoodItem, MacroTargets } from '../types/diet';
import { FOODS_DATABASE } from '../data/foods';
import { calculateMacroTargets } from './calculations';

export function isFoodAllowed(food: FoodItem, profile: UserProfile): boolean {
  // Preferenze alimentari
  if (profile.dietType === 'vegan' && !food.isVegan) return false;
  if (profile.dietType === 'vegetarian' && !food.isVegetarian) return false;

  // Patologie
  for (const pathologyId of profile.pathologies) {
    // Celiachia
    if (pathologyId === 'celiac' && !food.isGlutenFree) return false;
    // Intolleranza Lattosio
    if (pathologyId === 'lactose' && !food.isLactoseFree) return false;
    // Gotta
    if (pathologyId === 'gout' && food.purines === 'high') return false;
    // IBS Low FODMAP
    if (pathologyId === 'ibs_fodmap' && food.fodmap === 'high') return false;

    // Controllo flag specifico di esclusione
    if (food.pathologySuitability && food.pathologySuitability[pathologyId] === 'avoid') {
      return false;
    }
  }

  return true;
}

export function getMealDistribution(mealsPerDay: number): { category: MealCategory; label: string; time: string; calRatio: number }[] {
  if (mealsPerDay === 3) {
    return [
      { category: 'breakfast', label: 'Colazione Energetica', time: '07:30 - 08:30', calRatio: 0.25 },
      { category: 'lunch', label: 'Pranzo Completo', time: '12:30 - 13:30', calRatio: 0.40 },
      { category: 'dinner', label: 'Cena Nutriente & Leggera', time: '19:30 - 20:30', calRatio: 0.35 }
    ];
  } else if (mealsPerDay === 4) {
    return [
      { category: 'breakfast', label: 'Colazione', time: '07:30 - 08:30', calRatio: 0.22 },
      { category: 'lunch', label: 'Pranzo', time: '12:30 - 13:30', calRatio: 0.38 },
      { category: 'snack_afternoon', label: 'Spuntino Pomeridiano', time: '16:30 - 17:00', calRatio: 0.15 },
      { category: 'dinner', label: 'Cena', time: '19:45 - 20:45', calRatio: 0.25 }
    ];
  } else if (mealsPerDay === 5) {
    return [
      { category: 'breakfast', label: 'Colazione', time: '07:30 - 08:30', calRatio: 0.20 },
      { category: 'snack_morning', label: 'Spuntino Mattina', time: '10:30 - 11:00', calRatio: 0.10 },
      { category: 'lunch', label: 'Pranzo', time: '12:45 - 13:30', calRatio: 0.35 },
      { category: 'snack_afternoon', label: 'Spuntino Pomeriggio', time: '16:30 - 17:00', calRatio: 0.10 },
      { category: 'dinner', label: 'Cena', time: '20:00 - 20:45', calRatio: 0.25 }
    ];
  } else {
    // 6 pasti
    return [
      { category: 'breakfast', label: 'Colazione', time: '07:30 - 08:30', calRatio: 0.20 },
      { category: 'snack_morning', label: 'Spuntino Mattina', time: '10:30 - 11:00', calRatio: 0.10 },
      { category: 'lunch', label: 'Pranzo', time: '12:45 - 13:30', calRatio: 0.30 },
      { category: 'snack_afternoon', label: 'Spuntino Pomeriggio', time: '16:30 - 17:00', calRatio: 0.10 },
      { category: 'dinner', label: 'Cena', time: '19:45 - 20:30', calRatio: 0.23 },
      { category: 'snack_night', label: 'Spuntino Pre-nanna', time: '22:30 - 23:00', calRatio: 0.07 }
    ];
  }
}

// Calcolo sostituzione equivalente
export function calculateEquivalentGrams(oldFood: FoodItem, oldGrams: number, newFood: FoodItem): number {
  if (oldFood.id === newFood.id) return oldGrams;

  // Se entrambi sono carboidrati/cereali, bilancia sui carboidrati
  if (oldFood.category === 'cereals_grains' && newFood.category === 'cereals_grains') {
    const oldTotalCarbs = (oldFood.carbs * oldGrams) / 100;
    if (newFood.carbs > 0) {
      return Math.round((oldTotalCarbs / newFood.carbs) * 100);
    }
  }

  // Se entrambi sono proteine (carni, pesce, uova, tofu, legumi), bilancia sulle proteine
  const isProtein1 = ['proteins_meat', 'proteins_fish', 'eggs', 'proteins_plant', 'proteins_dairy'].includes(oldFood.category);
  const isProtein2 = ['proteins_meat', 'proteins_fish', 'eggs', 'proteins_plant', 'proteins_dairy'].includes(newFood.category);

  if (isProtein1 && isProtein2) {
    const oldTotalProt = (oldFood.protein * oldGrams) / 100;
    if (newFood.protein > 0) {
      return Math.round((oldTotalProt / newFood.protein) * 100);
    }
  }

  // Se entrambi sono grassi/frutta secca/olio
  const isFat1 = ['oils_fats', 'nuts_seeds'].includes(oldFood.category);
  const isFat2 = ['oils_fats', 'nuts_seeds'].includes(newFood.category);

  if (isFat1 && isFat2) {
    const oldTotalFats = (oldFood.fats * oldGrams) / 100;
    if (newFood.fats > 0) {
      return Math.round((oldTotalFats / newFood.fats) * 100);
    }
  }

  // Fallback: equivalenza calorica
  const oldCalories = (oldFood.calories * oldGrams) / 100;
  if (newFood.calories > 0) {
    return Math.round((oldCalories / newFood.calories) * 100);
  }

  return oldGrams;
}

export function getFoodsByCategory(category: FoodItem['category'], profile: UserProfile): FoodItem[] {
  return FOODS_DATABASE.filter(f => f.category === category && isFoodAllowed(f, profile));
}

export function generateDailyPlan(profile: UserProfile, targets: MacroTargets, dayIndex: number = 0): DayDietPlan {
  const dayNames = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  const distribution = getMealDistribution(profile.mealsPerDay);

  // Pool alimenti consentiti
  const allowed = FOODS_DATABASE.filter(f => isFoodAllowed(f, profile));

  const grains = allowed.filter(f => f.category === 'cereals_grains');
  const meats = allowed.filter(f => f.category === 'proteins_meat');
  const fish = allowed.filter(f => f.category === 'proteins_fish');
  const eggs = allowed.filter(f => f.category === 'eggs');
  const dairy = allowed.filter(f => f.category === 'proteins_dairy');
  const plants = allowed.filter(f => f.category === 'proteins_plant');
  const vegetables = allowed.filter(f => f.category === 'vegetables');
  const fruits = allowed.filter(f => f.category === 'fruits');
  const nuts = allowed.filter(f => f.category === 'nuts_seeds');
  const oils = allowed.filter(f => f.category === 'oils_fats');

  // Varianti proteiche per i 7 giorni
  // Alterniamo carne bianca, pesce azzurro/magro, uova, legumi/tofu, ecc.
  const lunchProteins = [
    meats.length ? meats[dayIndex % meats.length] : (fish[0] || eggs[0]),
    fish.length ? fish[(dayIndex + 1) % fish.length] : (meats[0] || plants[0]),
    plants.length ? plants[dayIndex % plants.length] : (fish[0] || meats[0]),
    fish.length ? fish[dayIndex % fish.length] : (meats[0] || eggs[0]),
    meats.length ? meats[(dayIndex + 1) % meats.length] : (fish[0] || plants[0]),
    fish.length ? fish[(dayIndex + 2) % fish.length] : (eggs[0] || meats[0]),
    eggs.length ? eggs[dayIndex % eggs.length] : (fish[0] || plants[0])
  ];

  const dinnerProteins = [
    fish.length ? fish[dayIndex % fish.length] : (meats[0] || plants[0]),
    meats.length ? meats[dayIndex % meats.length] : (fish[0] || eggs[0]),
    eggs.length ? eggs[dayIndex % eggs.length] : (fish[0] || plants[0]),
    meats.length ? meats[(dayIndex + 1) % meats.length] : (plants[0] || fish[0]),
    fish.length ? fish[(dayIndex + 1) % fish.length] : (eggs[0] || meats[0]),
    plants.length ? plants[dayIndex % plants.length] : (fish[0] || meats[0]),
    fish.length ? fish[(dayIndex + 2) % fish.length] : (meats[0] || eggs[0])
  ];

  const lunchCarb = grains.length ? grains[dayIndex % grains.length] : null;
  const dinnerCarb = grains.length ? grains[(dayIndex + 2) % grains.length] : null;
  const lunchVeg = vegetables.length ? vegetables[dayIndex % vegetables.length] : null;
  const dinnerVeg = vegetables.length ? vegetables[(dayIndex + 1) % vegetables.length] : null;
  const lunchOil = oils.length ? oils[0] : null;
  const dinnerOil = oils.length ? oils[0] : null;

  const meals: MealPlan[] = [];

  for (const slot of distribution) {
    const mealTargetCal = Math.round(targets.targetCalories * slot.calRatio);
    const mealTargetProt = Math.round(targets.proteinGrams * slot.calRatio);
    const mealTargetCarbs = Math.round(targets.carbsGrams * slot.calRatio);
    const mealTargetFats = Math.round(targets.fatsGrams * slot.calRatio);

    const mealFoods: MealFoodItem[] = [];

    if (slot.category === 'breakfast') {
      // Colazione: Avena/pane + Yogurt/Uova + Frutta/Noci
      const breakfastGrain = grains.find(g => g.id.includes('avena')) || grains[0];
      const breakfastProt = dairy.find(d => d.id.includes('yogurt')) || eggs.find(e => e.id.includes('albume')) || dairy[0];
      const breakfastFruit = fruits.find(f => f.id.includes('mirtilli') || f.id.includes('banana')) || fruits[0];
      const breakfastNut = nuts[0];

      if (breakfastGrain) {
        // Grammatura proporzionata ai carbs del pasto
        const g = Math.max(30, Math.min(100, Math.round((mealTargetCarbs * 0.6 / breakfastGrain.carbs) * 100)));
        mealFoods.push({ food: breakfastGrain, grams: g });
      }
      if (breakfastProt) {
        const g = Math.max(100, Math.min(250, Math.round((mealTargetProt * 0.7 / breakfastProt.protein) * 100)));
        mealFoods.push({ food: breakfastProt, grams: g });
      }
      if (breakfastFruit) {
        mealFoods.push({ food: breakfastFruit, grams: breakfastFruit.standardServingGrams });
      }
      if (breakfastNut && mealTargetFats > 15) {
        mealFoods.push({ food: breakfastNut, grams: 15 });
      }
    } else if (slot.category === 'lunch') {
      // Pranzo: Primo + Secondo + Contorno + Olio EVO
      const proteinFood = lunchProteins[dayIndex % lunchProteins.length];
      if (lunchCarb) {
        const g = Math.max(50, Math.min(130, Math.round((mealTargetCarbs * 0.75 / lunchCarb.carbs) * 100)));
        mealFoods.push({ food: lunchCarb, grams: g });
      }
      if (proteinFood) {
        const g = Math.max(100, Math.min(250, Math.round((mealTargetProt * 0.75 / proteinFood.protein) * 100)));
        mealFoods.push({ food: proteinFood, grams: g });
      }
      if (lunchVeg) {
        mealFoods.push({ food: lunchVeg, grams: 200 });
      }
      if (lunchOil) {
        const oilGrams = Math.max(10, Math.min(20, Math.round(mealTargetFats * 0.4)));
        mealFoods.push({ food: lunchOil, grams: oilGrams });
      }
    } else if (slot.category === 'dinner') {
      // Cena: Secondo + Contorno + Carboidrati leggeri/Tuberi + Olio EVO
      const proteinFood = dinnerProteins[dayIndex % dinnerProteins.length];
      if (proteinFood) {
        const g = Math.max(100, Math.min(250, Math.round((mealTargetProt * 0.75 / proteinFood.protein) * 100)));
        mealFoods.push({ food: proteinFood, grams: g });
      }
      if (dinnerCarb) {
        const g = Math.max(40, Math.min(250, Math.round((mealTargetCarbs * 0.6 / dinnerCarb.carbs) * 100)));
        mealFoods.push({ food: dinnerCarb, grams: g });
      }
      if (dinnerVeg) {
        mealFoods.push({ food: dinnerVeg, grams: 200 });
      }
      if (dinnerOil) {
        const oilGrams = Math.max(10, Math.min(20, Math.round(mealTargetFats * 0.4)));
        mealFoods.push({ food: dinnerOil, grams: oilGrams });
      }
    } else if (slot.category === 'snack_morning') {
      // Spuntino mattina: Frutta fresca o secca
      const fruit = fruits[dayIndex % fruits.length] || fruits[0];
      const nut = nuts[0];
      if (fruit) mealFoods.push({ food: fruit, grams: fruit.standardServingGrams });
      if (nut) mealFoods.push({ food: nut, grams: 15 });
    } else if (slot.category === 'snack_afternoon') {
      // Merenda: Frutta secca + Frutto o Yogurt
      const fruit = fruits[(dayIndex + 1) % fruits.length] || fruits[0];
      const prot = dairy.find(d => d.id.includes('yogurt') || d.id.includes('fiocchi')) || nuts[0];
      if (fruit) mealFoods.push({ food: fruit, grams: fruit.standardServingGrams });
      if (prot) {
        const g = prot.category === 'nuts_seeds' ? 20 : 125;
        mealFoods.push({ food: prot, grams: g });
      }
    } else if (slot.category === 'snack_night') {
      // Pre-nanna: Fiocchi di latte o Tisana/Mandorle
      const snack = dairy.find(d => d.id.includes('fiocchi')) || nuts[1] || nuts[0];
      if (snack) {
        const g = snack.category === 'nuts_seeds' ? 15 : 100;
        mealFoods.push({ food: snack, grams: g });
      }
    }

    meals.push({
      id: `meal-${dayIndex}-${slot.category}`,
      category: slot.category,
      name: slot.label,
      timeSlot: slot.time,
      foods: mealFoods,
      targetCalories: mealTargetCal,
      targetProtein: mealTargetProt,
      targetCarbs: mealTargetCarbs,
      targetFats: mealTargetFats
    });
  }

  return {
    dayIndex,
    dayName: dayNames[dayIndex],
    meals
  };
}

export function generateWeekPlan(profile: UserProfile): DayDietPlan[] {
  const targets = calculateMacroTargets(profile);
  const week: DayDietPlan[] = [];
  for (let i = 0; i < 7; i++) {
    week.push(generateDailyPlan(profile, targets, i));
  }
  return week;
}

export function calculateMealTotals(foods: MealFoodItem[]) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let sugars = 0;
  let fats = 0;
  let satFats = 0;
  let fiber = 0;
  let sodiumMg = 0;

  for (const item of foods) {
    const ratio = item.grams / 100;
    calories += item.food.calories * ratio;
    protein += item.food.protein * ratio;
    carbs += item.food.carbs * ratio;
    sugars += item.food.sugars * ratio;
    fats += item.food.fats * ratio;
    satFats += item.food.satFats * ratio;
    fiber += item.food.fiber * ratio;
    sodiumMg += item.food.sodiumMg * ratio;
  }

  return {
    calories: Math.round(calories),
    protein: Number(protein.toFixed(1)),
    carbs: Number(carbs.toFixed(1)),
    sugars: Number(sugars.toFixed(1)),
    fats: Number(fats.toFixed(1)),
    satFats: Number(satFats.toFixed(1)),
    fiber: Number(fiber.toFixed(1)),
    sodiumMg: Math.round(sodiumMg)
  };
}

export function calculateDayTotals(day: DayDietPlan) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;
  let fiber = 0;
  let sodiumMg = 0;

  for (const meal of day.meals) {
    const mealTotals = calculateMealTotals(meal.foods);
    calories += mealTotals.calories;
    protein += mealTotals.protein;
    carbs += mealTotals.carbs;
    fats += mealTotals.fats;
    fiber += mealTotals.fiber;
    sodiumMg += mealTotals.sodiumMg;
  }

  return {
    calories: Math.round(calories),
    protein: Number(protein.toFixed(1)),
    carbs: Number(carbs.toFixed(1)),
    fats: Number(fats.toFixed(1)),
    fiber: Number(fiber.toFixed(1)),
    sodiumMg: Math.round(sodiumMg)
  };
}
