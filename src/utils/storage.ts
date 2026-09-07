import { UserProfile, DayDietPlan } from '../types/diet';

const PROFILE_KEY = 'nutriplan_user_profile';
const WEEK_PLAN_KEY = 'nutriplan_week_plan';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Mario Rossi',
  age: 32,
  gender: 'male',
  heightCm: 178,
  weightKg: 78,
  activityLevel: 'moderate',
  goal: 'cut_slow',
  dietType: 'mediterranean',
  mealsPerDay: 4,
  pathologies: ['cholesterol']
};

export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
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
