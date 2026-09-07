import { UserProfile, MacroTargets } from '../types/diet';

export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: string } {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  
  let category = 'Normopeso';
  if (bmi < 18.5) category = 'Sottopeso';
  else if (bmi >= 18.5 && bmi < 25.0) category = 'Normopeso';
  else if (bmi >= 25.0 && bmi < 30.0) category = 'Sovrappeso';
  else if (bmi >= 30.0 && bmi < 35.0) category = 'Obesità Classe I';
  else if (bmi >= 35.0 && bmi < 40.0) category = 'Obesità Classe II';
  else category = 'Obesità Grave (Classe III)';

  return { bmi, category };
}

export function calculateBodyFat(profile: UserProfile): number | undefined {
  const { gender, heightCm, waistCm, neckCm, hipCm } = profile;
  if (!waistCm || !neckCm) return undefined;

  if (gender === 'male') {
    if (waistCm <= neckCm) return undefined;
    // Formula US Navy Uomini
    const bf = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    return Number(Math.max(4, Math.min(50, bf)).toFixed(1));
  } else {
    if (!hipCm || (waistCm + hipCm) <= neckCm) return undefined;
    // Formula US Navy Donne
    const bf = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    return Number(Math.max(10, Math.min(55, bf)).toFixed(1));
  }
}

export function calculateBMR(profile: UserProfile): number {
  // Formula di Mifflin-St Jeor
  const s = profile.gender === 'male' ? 5 : -161;
  const bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + s;
  return Math.round(bmr);
}

export function getActivityMultiplier(level: UserProfile['activityLevel']): number {
  switch (level) {
    case 'sedentary': return 1.2;
    case 'light': return 1.375;
    case 'moderate': return 1.55;
    case 'heavy': return 1.725;
    case 'athlete': return 1.9;
    default: return 1.375;
  }
}

export function calculateMacroTargets(profile: UserProfile): MacroTargets {
  const { bmi, category: bmiCategory } = calculateBMI(profile.weightKg, profile.heightCm);
  const bodyFatPercentage = calculateBodyFat(profile);
  const bmr = calculateBMR(profile);
  const tdee = Math.round(bmr * getActivityMultiplier(profile.activityLevel));

  // Modificatore obiettivo
  let calorieMultiplier = 1.0;
  switch (profile.goal) {
    case 'cut_fast': calorieMultiplier = 0.80; break;
    case 'cut_slow': calorieMultiplier = 0.85; break;
    case 'maintain': calorieMultiplier = 1.00; break;
    case 'recomp': calorieMultiplier = 0.97; break;
    case 'bulk_clean': calorieMultiplier = 1.10; break;
    case 'bulk_high': calorieMultiplier = 1.15; break;
  }

  let targetCalories = Math.round(tdee * calorieMultiplier);

  // Soglia minima di sicurezza
  const minSafeCalories = profile.gender === 'male' ? 1400 : 1200;
  if (targetCalories < minSafeCalories) {
    targetCalories = minSafeCalories;
  }

  // --- Calcolo Proteine (g/kg) ---
  let proteinPerKg = 1.7; // Standard sport/fitness moderato
  if (profile.pathologies.includes('mild_renal')) {
    // Insufficienza renale lieve: restrizione rigorosa 0.75 g/kg
    proteinPerKg = 0.75;
  } else if (profile.goal === 'cut_fast' || profile.goal === 'cut_slow') {
    // In deficit preserviamo la massa magra
    proteinPerKg = 2.0;
  } else if (profile.goal === 'bulk_clean' || profile.goal === 'bulk_high') {
    proteinPerKg = 1.8;
  } else if (profile.activityLevel === 'sedentary') {
    proteinPerKg = 1.2;
  }

  let proteinGrams = Math.round(profile.weightKg * proteinPerKg);
  let proteinKcal = proteinGrams * 4;

  // --- Calcolo Grassi ---
  // In percentuale sulle calorie totali (25-30%)
  let fatPercentage = 0.28;
  if (profile.dietType === 'low_carb') {
    fatPercentage = 0.40;
  } else if (profile.pathologies.includes('cholesterol') || profile.pathologies.includes('nafld')) {
    fatPercentage = 0.25; // Moderato e con focus su grassi vegetali insaturi
  }

  let fatsKcal = Math.round(targetCalories * fatPercentage);
  let fatsGrams = Math.round(fatsKcal / 9);

  // --- Calcolo Carboidrati a completamento ---
  let carbsKcal = targetCalories - proteinKcal - fatsKcal;
  if (carbsKcal < 300) {
    // Minimo biologico di sicurezza se non chetogenica pura
    carbsKcal = 300;
    fatsKcal = targetCalories - proteinKcal - carbsKcal;
    fatsGrams = Math.round(fatsKcal / 9);
  }
  let carbsGrams = Math.round(carbsKcal / 4);

  // Fibre consigliate (30g standard, 35g+ per diabete/colesterolo)
  let fiberGramsMin = 30;
  if (profile.pathologies.includes('diabetes') || profile.pathologies.includes('cholesterol')) {
    fiberGramsMin = 35;
  }

  // Idratazione stimata in litri (base 35 ml per kg + idratazione extra per gotta o caldo)
  let waterLiters = Number(((profile.weightKg * 35) / 1000).toFixed(1));
  if (profile.pathologies.includes('gout')) {
    waterLiters = Math.max(waterLiters, 2.8);
  }

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    proteinKcal,
    carbsGrams,
    carbsKcal,
    fatsGrams,
    fatsKcal,
    fiberGramsMin,
    waterLiters,
    bmi,
    bmiCategory,
    bodyFatPercentage
  };
}
