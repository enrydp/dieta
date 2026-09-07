import { Gender } from '../types/diet';

export interface AvatarOption {
  id: string;
  name: string;
  label: string;
  gender: Gender | 'any';
  bgGradient: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'guy_sporty', name: 'Leo', label: 'Leo Sprint (Sportivo)', gender: 'male', bgGradient: 'from-blue-400 via-sky-400 to-indigo-500' },
  { id: 'girl_sporty', name: 'Mia', label: 'Mia Vital (Sportiva)', gender: 'female', bgGradient: 'from-pink-400 via-rose-400 to-amber-300' },
  { id: 'chef_guy', name: 'Chef Gigi', label: 'Chef Gigi (Cucina Sana)', gender: 'male', bgGradient: 'from-emerald-400 via-teal-400 to-cyan-500' },
  { id: 'chef_girl', name: 'Chef Sara', label: 'Chef Sara (Benessere)', gender: 'female', bgGradient: 'from-teal-400 via-emerald-400 to-lime-400' },
  { id: 'gym_power', name: 'Max', label: 'Max Power (Forza)', gender: 'male', bgGradient: 'from-amber-400 via-orange-400 to-red-500' },
  { id: 'girl_yoga', name: 'Zoe', label: 'Zoe Zen (Armonia)', gender: 'female', bgGradient: 'from-purple-400 via-fuchsia-400 to-pink-400' },
  { id: 'smart_guy', name: 'Nico', label: 'Nico Smart (Avocado)', gender: 'male', bgGradient: 'from-emerald-400 via-lime-400 to-teal-500' },
  { id: 'healthy_girl', name: 'Emma', label: 'Emma Berry (Frutta)', gender: 'female', bgGradient: 'from-rose-400 via-pink-400 to-yellow-300' },
  { id: 'active_senior_m', name: 'Nonno Sprint', label: 'Nonno Sprint (Senior)', gender: 'male', bgGradient: 'from-amber-500 via-yellow-400 to-orange-400' },
  { id: 'active_senior_f', name: 'Nonna Sprint', label: 'Nonna Sprint (Senior)', gender: 'female', bgGradient: 'from-indigo-400 via-purple-400 to-rose-300' }
];
