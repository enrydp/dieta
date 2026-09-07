import { UserProfile, DayDietPlan } from '../types/diet';

const PROFILE_KEY = 'nutriplan_user_profile';
const WEEK_PLAN_KEY = 'nutriplan_week_plan';

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: 30,
  gender: 'male',
  heightCm: 175,
  weightKg: 70,
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
