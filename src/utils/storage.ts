import { UserProfile, DayDietPlan } from '../types/diet';

const PROFILE_KEY = 'nutriplan_user_profile';
const WEEK_PLAN_KEY = 'nutriplan_week_plan';

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: 0,
  gender: 'male',
  heightCm: 0,
  weightKg: 0,
  activityLevel: 'moderate',
  goal: 'maintain',
  dietType: 'mediterranean',
  mealsPerDay: 4,
  pathologies: [],
  isConfigured: false
};

export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Assicura che la proprietà pathologies esista
      if (!Array.isArray(parsed.pathologies)) {
        parsed.pathologies = [];
      }
      // Se non è mai stato configurato dall'utente, azzera i campi fisici per non mostrare numeri pre-impostati
      if (!parsed.isConfigured) {
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          age: (parsed.age && parsed.age !== 30) ? parsed.age : 0,
          heightCm: (parsed.heightCm && parsed.heightCm !== 175) ? parsed.heightCm : 0,
          weightKg: (parsed.weightKg && parsed.weightKg !== 70) ? parsed.weightKg : 0,
          isConfigured: false
        };
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading profile from localStorage:', e);
  }
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage:', e);
  }
}

export function loadWeekPlan(): DayDietPlan[] | null {
  try {
    const userProfile = loadUserProfile();
    if (!userProfile.isConfigured) {
      return null;
    }
    const data = localStorage.getItem(WEEK_PLAN_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading week plan from localStorage:', e);
  }
  return null;
}

export function saveWeekPlan(weekPlan: DayDietPlan[]): void {
  try {
    localStorage.setItem(WEEK_PLAN_KEY, JSON.stringify(weekPlan));
  } catch (e) {
    console.error('Error saving week plan to localStorage:', e);
  }
}
