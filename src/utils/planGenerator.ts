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

  const nameLower = food.name.toLowerCase();
  const idLower = food.id.toLowerCase();

  // Allergie e Intolleranze Alimentari
  const allergies = profile.allergies || [];
  for (const allergy of allergies) {
    // 1. Glutine
    if (allergy === 'gluten' && !food.isGlutenFree) return false;

    // 2. Lattosio
    if (allergy === 'lactose' && (!food.isLactoseFree || food.category === 'proteins_dairy')) return false;

    // 3. Uova
    if (allergy === 'eggs' && (food.category === 'eggs' || nameLower.includes('uov') || nameLower.includes('album'))) return false;

    // 4. Frutta a guscio (noci, mandorle, nocciole, pistacchi, anacardi)
    if (allergy === 'nuts' && (
      nameLower.includes('noc') || 
      nameLower.includes('mandorl') || 
      nameLower.includes('nocciol') || 
      nameLower.includes('pistacch') || 
      nameLower.includes('anacard')
    )) return false;

    // 5. Arachidi
    if (allergy === 'peanuts' && nameLower.includes('arachid')) return false;

    // 6. Crostacei e Molluschi
    if (allergy === 'crustaceans' && (
      nameLower.includes('gamber') || 
      nameLower.includes('calamar') || 
      nameLower.includes('cozz') || 
      nameLower.includes('vongol') || 
      nameLower.includes('polpo') || 
      nameLower.includes('seppi') || 
      nameLower.includes('crostace') ||
      nameLower.includes('mazzancoll')
    )) return false;

    // 7. Pesce (esclude tutti i pesci)
    if (allergy === 'fish' && food.category === 'proteins_fish' && !(
      nameLower.includes('gamber') || 
      nameLower.includes('calamar') || 
      nameLower.includes('cozz') || 
      nameLower.includes('vongol') || 
      nameLower.includes('polpo') || 
      nameLower.includes('seppi')
    )) return false;

    // 8. Soia
    if (allergy === 'soy' && (
      nameLower.includes('soia') || 
      nameLower.includes('tofu') || 
      nameLower.includes('edamame') || 
      nameLower.includes('tempeh')
    )) return false;

    // 9. Sensibilità al Nichel
    if (allergy === 'nickel' && (
      nameLower.includes('pomodor') || 
      nameLower.includes('spinac') || 
      nameLower.includes('cacao') || 
      nameLower.includes('cioccolat') || 
      nameLower.includes('lenticchi') || 
      nameLower.includes('ceci')
    )) return false;

    // 10. Istamina
    if (allergy === 'histamine' && (
      nameLower.includes('scatola') || 
      nameLower.includes('salame') || 
      nameLower.includes('prosciutto') || 
      nameLower.includes('bresaola') || 
      nameLower.includes('parmigiano') || 
      nameLower.includes('grana') || 
      nameLower.includes('stagionat') ||
      nameLower.includes('affumicat')
    )) return false;

    // 11. Sesamo
    if (allergy === 'sesame' && (
      nameLower.includes('sesamo') || 
      nameLower.includes('tahina')
    )) return false;
  }

  // Alimenti sgraditi personalizzati inseriti manualmente
  const customExclusions = profile.customExcludedFoods || [];
  for (const exclusion of customExclusions) {
    const clean = exclusion.trim().toLowerCase();
    if (clean && (nameLower.includes(clean) || idLower.includes(clean))) {
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

export function generateDailyPlan(profile: UserProfile, targets: MacroTargets, dayIndex: number = 0, seed: number = 0): DayDietPlan {
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

  // Varianti proteiche per i 7 giorni con offset di variazione (seed)
  const allProteins = [...meats, ...fish, ...eggs, ...plants, ...dairy];
  const offset = dayIndex + seed;

  const lunchProteins = [
    meats.length ? meats[offset % meats.length] : (fish[0] || allProteins[0]),
    fish.length ? fish[(offset + 1) % fish.length] : (meats[0] || allProteins[0]),
    plants.length ? plants[offset % plants.length] : (fish[0] || allProteins[0]),
    fish.length ? fish[offset % fish.length] : (meats[0] || allProteins[0]),
    meats.length ? meats[(offset + 1) % meats.length] : (fish[0] || allProteins[0]),
    fish.length ? fish[(offset + 2) % fish.length] : (eggs[0] || allProteins[0]),
    eggs.length ? eggs[offset % eggs.length] : (fish[0] || allProteins[0])
  ];

  const dinnerProteins = [
    fish.length ? fish[(offset + 1) % fish.length] : (meats[0] || allProteins[0]),
    meats.length ? meats[offset % meats.length] : (fish[0] || allProteins[0]),
    eggs.length ? eggs[offset % eggs.length] : (fish[0] || allProteins[0]),
    meats.length ? meats[(offset + 2) % meats.length] : (plants[0] || allProteins[0]),
    fish.length ? fish[(offset + 2) % fish.length] : (eggs[0] || allProteins[0]),
    plants.length ? plants[offset % plants.length] : (fish[0] || allProteins[0]),
    fish.length ? fish[(offset + 3) % fish.length] : (meats[0] || allProteins[0])
  ];

  const lunchCarb = grains.length ? grains[offset % grains.length] : null;
  const dinnerCarb = grains.length ? grains[(offset + 2) % grains.length] : null;
  const lunchVeg = vegetables.length ? vegetables[offset % vegetables.length] : null;
  const dinnerVeg = vegetables.length ? vegetables[(offset + 1) % vegetables.length] : null;
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
      // === COLAZIONE DINAMICA: 8 template ruotanti (dolci + salati) ===
      // Usiamo l'offset (dayIndex + seed) per variare ogni giorno e ogni rigenerazione
      const bOffset = offset;

      // --- Pool alimenti per colazione ---
      // Pani e base croccante
      const bBreads = allowed.filter(f =>
        f.id.includes('pane') || f.id.includes('fette_biscottate') ||
        f.id.includes('gallette') || f.id.includes('wasa') || f.id.includes('farro')
      );
      // Avena e cereali da porridge
      const bOats = allowed.filter(f => f.id.includes('avena') || f.id.includes('muesli'));
      // Latticini proteici (yogurt, ricotta, fiocchi, formaggio spalmabile)
      const bDairy = allowed.filter(f =>
        f.id.includes('yogurt') || f.id.includes('fiocchi') ||
        f.id.includes('ricotta') || f.id.includes('kefir') ||
        f.id.includes('quark') || f.id.includes('formaggio_spalmabile')
      );
      // Uova o alternativa vegana
      const bEggs = allowed.filter(f =>
        f.id.includes('uov') || f.id.includes('albume') ||
        f.id.includes('frittata') || f.id.includes('strapazzat')
      );
      const bTofu = allowed.filter(f => f.id.includes('tofu_strapazzato'));
      // Proteine salate affettabili (bresaola, prosciutto cotto, fesa tacchino, salmone affumicato)
      const bSaltedProteins = allowed.filter(f =>
        f.id.includes('bresaola') || f.id.includes('prosciutto_cotto') ||
        f.id.includes('fesa_tacchino') || f.id.includes('salmone_affumicato') ||
        f.id.includes('prosciutto_crudo')
      );
      // Avocado
      const bAvocado = allowed.find(f => f.id === 'avocado_fresco');
      // Frutta fresca varia
      const bFruits = allowed.filter(f => f.category === 'fruits' &&
        !f.id.includes('confettura') && !f.id.includes('miele')
      );
      // Condimenti dolci (confettura, miele)
      const bSweetCondiments = allowed.filter(f =>
        f.id.includes('confettura') || f.id.includes('miele')
      );
      // Frutta secca e semi
      const bNuts = allowed.filter(f => f.category === 'nuts_seeds' &&
        !f.id.includes('cioccolato')
      );
      const bChocolate = allowed.find(f => f.id === 'cioccolato_fondente_85');
      const bOil = oils.length ? oils[0] : null;
      // Verdure fresche per colazione salata (pomodorini, spinaci, cetrioli)
      const bVeggies = allowed.filter(f =>
        f.id.includes('pomodorini') || f.id.includes('spinac') || f.id.includes('cetrioli')
      );

      // Helper: seleziona con rotazione
      const pick = <T>(arr: T[], i: number): T | null => arr.length ? arr[i % arr.length] : null;

      // --- Definizione dei 8 template colazione ---
      // 0: Porridge avena dolce con frutti di bosco e frutta secca
      // 1: Toast salato (pane integrale) con uova strapazzate / albumi e pomodorini
      // 2: Avocado toast salato con salmone affumicato o affettato magro
      // 3: Fette biscottate/pane con ricotta o yogurt greco e confettura/miele
      // 4: Toast salato con formaggio spalmabile light e verdure fresche + EVO
      // 5: Muesli/bowl con kefir o yogurt, frutta fresca e cioccolato fondente
      // 6: Pane con bresaola/fesa tacchino, avocado e limone (salato proteico)
      // 7: Gallette/wasa con burro mandorle o ricotta, frutta fresca e noci

      const templateIndex = bOffset % 8;

      switch (templateIndex) {
        case 0: {
          // Porridge avena con frutti di bosco, frutta secca
          const oat = pick(bOats, bOffset);
          const dairyEl = pick(bDairy, bOffset);
          const fruit = pick(bFruits, bOffset);
          const nut = pick(bNuts, bOffset);
          if (oat) {
            const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.65 / oat.carbs) * 100)));
            mealFoods.push({ food: oat, grams: g });
          }
          if (dairyEl) {
            const g = Math.max(100, Math.min(200, Math.round((mealTargetProt * 0.7 / dairyEl.protein) * 100)));
            mealFoods.push({ food: dairyEl, grams: g });
          }
          if (fruit) mealFoods.push({ food: fruit, grams: fruit.standardServingGrams });
          if (nut && mealTargetFats > 10) mealFoods.push({ food: nut, grams: 15 });
          break;
        }
        case 1: {
          // Toast salato con uova strapazzate / albumi e pomodorini
          const bread = pick(bBreads, bOffset) || pick(grains.filter(f => f.id.includes('pane')), bOffset);
          const eggItem = pick(bEggs, bOffset) ||
            (profile.dietType === 'vegan' ? pick(bTofu, 0) : null);
          const veggie = pick(bVeggies, bOffset);
          if (bread) {
            const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.7 / bread.carbs) * 100)));
            mealFoods.push({ food: bread, grams: g });
          }
          if (eggItem) {
            const g = Math.max(80, Math.min(200, Math.round((mealTargetProt * 0.75 / eggItem.protein) * 100)));
            mealFoods.push({ food: eggItem, grams: g });
          }
          if (veggie) mealFoods.push({ food: veggie, grams: 80 });
          if (bOil && mealTargetFats > 8) mealFoods.push({ food: bOil, grams: 8 });
          break;
        }
        case 2: {
          // Avocado toast con salmone affumicato o affettato magro salato
          const bread = pick(bBreads, bOffset + 1) || pick(grains, bOffset);
          const saltedProt = pick(bSaltedProteins, bOffset);
          const vegan_prot = pick(bTofu, 0);
          const protItem = (profile.dietType === 'vegan') ? vegan_prot : saltedProt;
          if (bread) {
            const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.65 / bread.carbs) * 100)));
            mealFoods.push({ food: bread, grams: g });
          }
          if (bAvocado) mealFoods.push({ food: bAvocado, grams: 80 });
          if (protItem) {
            const g = Math.max(50, Math.min(100, Math.round((mealTargetProt * 0.6 / protItem.protein) * 100)));
            mealFoods.push({ food: protItem, grams: g });
          }
          const tomato = bVeggies.find(v => v.id.includes('pomodorini'));
          if (tomato) mealFoods.push({ food: tomato, grams: 70 });
          break;
        }
        case 3: {
          // Fette biscottate/pane con ricotta/yogurt greco e confettura o miele
          const base = grains.find(f => f.id.includes('fette_biscottate')) ||
            pick(bBreads, bOffset + 2) || pick(grains, bOffset);
          const cream = bDairy.find(f => f.id.includes('ricotta') || f.id.includes('yogurt')) ||
            pick(bDairy, bOffset + 1);
          const sweet = pick(bSweetCondiments, bOffset);
          const fruit = pick(bFruits, bOffset + 1);
          if (base) {
            const g = Math.max(35, Math.min(70, Math.round((mealTargetCarbs * 0.55 / base.carbs) * 100)));
            mealFoods.push({ food: base, grams: g });
          }
          if (cream) {
            const g = Math.max(100, Math.min(200, Math.round((mealTargetProt * 0.65 / cream.protein) * 100)));
            mealFoods.push({ food: cream, grams: g });
          }
          if (sweet) mealFoods.push({ food: sweet, grams: sweet.standardServingGrams });
          if (fruit) mealFoods.push({ food: fruit, grams: fruit.standardServingGrams });
          break;
        }
        case 4: {
          // Toast salato con formaggio spalmabile light, verdure fresche ed EVO
          const bread = pick(bBreads, bOffset + 3) || pick(grains.filter(f => f.id.includes('pane')), bOffset);
          const cheese = bDairy.find(f => f.id.includes('formaggio_spalmabile')) || pick(bDairy, bOffset + 2);
          const veggie1 = bVeggies.find(v => v.id.includes('pomodorini'));
          const veggie2 = bVeggies.find(v => v.id.includes('cetrioli'));
          if (bread) {
            const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.70 / bread.carbs) * 100)));
            mealFoods.push({ food: bread, grams: g });
          }
          if (cheese) {
            const g = Math.max(60, Math.min(120, Math.round((mealTargetProt * 0.65 / cheese.protein) * 100)));
            mealFoods.push({ food: cheese, grams: g });
          }
          if (veggie1) mealFoods.push({ food: veggie1, grams: 80 });
          if (veggie2) mealFoods.push({ food: veggie2, grams: 60 });
          if (bOil && mealTargetFats > 8) mealFoods.push({ food: bOil, grams: 10 });
          break;
        }
        case 5: {
          // Muesli / Smoothie bowl con kefir/yogurt, frutta fresca e cioccolato fondente
          const oat = pick(bOats, bOffset + 1);
          const kefirEl = bDairy.find(f => f.id.includes('kefir') || f.id.includes('yogurt')) ||
            pick(bDairy, bOffset + 3);
          const fruit1 = pick(bFruits, bOffset + 2);
          const fruit2 = pick(bFruits, bOffset + 3);
          if (oat) {
            const g = Math.max(40, Math.min(70, Math.round((mealTargetCarbs * 0.5 / oat.carbs) * 100)));
            mealFoods.push({ food: oat, grams: g });
          }
          if (kefirEl) {
            const g = Math.max(100, Math.min(180, Math.round((mealTargetProt * 0.65 / kefirEl.protein) * 100)));
            mealFoods.push({ food: kefirEl, grams: g });
          }
          if (fruit1) mealFoods.push({ food: fruit1, grams: fruit1.standardServingGrams });
          if (fruit2 && fruit2.id !== fruit1?.id) mealFoods.push({ food: fruit2, grams: 50 });
          if (bChocolate) mealFoods.push({ food: bChocolate, grams: 15 });
          break;
        }
        case 6: {
          // Pane con bresaola/fesa tacchino, avocado, limone (salato proteico)
          const bread = pick(bBreads, bOffset + 4) || pick(grains.filter(f => f.id.includes('pane')), bOffset + 1);
          const lean_salted = bSaltedProteins.find(f =>
            f.id.includes('bresaola') || f.id.includes('fesa_tacchino')
          ) || pick(bSaltedProteins, bOffset + 1);
          const vegan_prot = pick(bTofu, 0);
          const protItem = (profile.dietType === 'vegan') ? vegan_prot : lean_salted;
          if (bread) {
            const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.70 / bread.carbs) * 100)));
            mealFoods.push({ food: bread, grams: g });
          }
          if (protItem) {
            const g = Math.max(50, Math.min(100, Math.round((mealTargetProt * 0.65 / protItem.protein) * 100)));
            mealFoods.push({ food: protItem, grams: g });
          }
          if (bAvocado) mealFoods.push({ food: bAvocado, grams: 70 });
          const nut = pick(bNuts, bOffset + 1);
          if (nut && mealTargetFats > 12) mealFoods.push({ food: nut, grams: 15 });
          break;
        }
        case 7:
        default: {
          // Gallette/Wasa con burro mandorle o ricotta, frutta fresca e noci
          const crispy = allowed.find(f => f.id.includes('gallette') || f.id.includes('wasa')) ||
            grains.find(f => f.id.includes('fette_biscottate')) ||
            pick(grains, bOffset + 2);
          const spread = allowed.find(f => f.id.includes('crema_mandorle') || f.id.includes('burro_arachidi')) ||
            bDairy.find(f => f.id.includes('ricotta')) ||
            pick(bDairy, bOffset + 4);
          const fruit = pick(bFruits, bOffset + 4);
          const nut = pick(bNuts, bOffset + 2);
          if (crispy) {
            const g = Math.max(35, Math.min(70, Math.round((mealTargetCarbs * 0.6 / crispy.carbs) * 100)));
            mealFoods.push({ food: crispy, grams: g });
          }
          if (spread) {
            const g = Math.max(20, Math.min(80, Math.round((mealTargetProt * 0.55 / spread.protein) * 100)));
            mealFoods.push({ food: spread, grams: g });
          }
          if (fruit) mealFoods.push({ food: fruit, grams: fruit.standardServingGrams });
          if (nut && mealTargetFats > 12) mealFoods.push({ food: nut, grams: 15 });
          break;
        }
      }

      // Fallback: se il template ha prodotto 0 alimenti (es. tutti filtrati per allergie),
      // usa la logica base avena + yogurt + frutta
      if (mealFoods.length === 0) {
        const fallbackGrain = pick(bOats, bOffset) || pick(grains, bOffset);
        const fallbackProt = pick(bDairy, bOffset) || pick(bEggs, bOffset);
        const fallbackFruit = pick(bFruits, bOffset);
        const fallbackNut = pick(bNuts, bOffset);
        if (fallbackGrain) {
          const g = Math.max(40, Math.min(80, Math.round((mealTargetCarbs * 0.6 / fallbackGrain.carbs) * 100)));
          mealFoods.push({ food: fallbackGrain, grams: g });
        }
        if (fallbackProt) {
          const g = Math.max(100, Math.min(200, Math.round((mealTargetProt * 0.7 / fallbackProt.protein) * 100)));
          mealFoods.push({ food: fallbackProt, grams: g });
        }
        if (fallbackFruit) mealFoods.push({ food: fallbackFruit, grams: fallbackFruit.standardServingGrams });
        if (fallbackNut && mealTargetFats > 15) mealFoods.push({ food: fallbackNut, grams: 15 });
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

export function generateWeekPlan(profile: UserProfile, seed: number = 0): DayDietPlan[] {
  const targets = calculateMacroTargets(profile);
  const week: DayDietPlan[] = [];
  for (let i = 0; i < 7; i++) {
    week.push(generateDailyPlan(profile, targets, i, seed));
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
