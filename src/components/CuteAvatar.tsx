import React from 'react';
import { Gender } from '../types/diet';

export interface AvatarOption {
  id: string;
  label: string;
  gender: Gender | 'any';
  bgGradient: string;
  emoji: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'guy_sporty', label: 'Sportivo Dinamico', gender: 'male', bgGradient: 'from-blue-500 to-cyan-400', emoji: '🏃‍♂️' },
  { id: 'girl_sporty', label: 'Sportiva Dinamica', gender: 'female', bgGradient: 'from-pink-500 to-rose-400', emoji: '🏃‍♀️' },
  { id: 'chef_guy', label: 'Chef Salute', gender: 'male', bgGradient: 'from-emerald-500 to-teal-400', emoji: '👨‍🍳' },
  { id: 'chef_girl', label: 'Chef Benessere', gender: 'female', bgGradient: 'from-teal-500 to-emerald-400', emoji: '👩‍🍳' },
  { id: 'gym_power', label: 'Fitness & Forza', gender: 'male', bgGradient: 'from-amber-500 to-orange-400', emoji: '💪' },
  { id: 'girl_yoga', label: 'Armonia & Yoga', gender: 'female', bgGradient: 'from-purple-500 to-indigo-400', emoji: '🧘‍♀️' },
  { id: 'smart_guy', label: 'Nutrizione Smart', gender: 'male', bgGradient: 'from-indigo-500 to-blue-400', emoji: '🥑' },
  { id: 'healthy_girl', label: 'Vitalità & Frutta', gender: 'female', bgGradient: 'from-emerald-400 to-lime-500', emoji: '🍓' },
  { id: 'active_senior_m', label: 'Senior Attivo', gender: 'male', bgGradient: 'from-amber-600 to-yellow-500', emoji: '🚶‍♂️' },
  { id: 'active_senior_f', label: 'Senior Attiva', gender: 'female', bgGradient: 'from-rose-400 to-amber-400', emoji: '🚶‍♀️' }
];

interface CuteAvatarProps {
  gender?: Gender;
  avatarStyle?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const CuteAvatar: React.FC<CuteAvatarProps> = ({
  gender = 'male',
  avatarStyle,
  name,
  size = 'md',
  className = '',
  showBadge = false
}) => {
  // Trova l'opzione scelta o una predefinita coerente col sesso
  let selected = AVATAR_OPTIONS.find(a => a.id === avatarStyle);
  if (!selected) {
    selected = AVATAR_OPTIONS.find(a => a.gender === gender) || AVATAR_OPTIONS[0];
  }

  const sizeClasses = {
    xs: 'w-7 h-7 text-sm',
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-xl',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-4xl'
  };

  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : '?';

  return (
    <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}>
      {/* Cerchio Avatar con Gradiente e Illustrazione SVG/Emoji simpatica */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr ${selected.bgGradient} p-0.5 shadow-md flex items-center justify-center transition-transform hover:scale-105 duration-200 border-2 border-white`}
      >
        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-2xs flex items-center justify-center overflow-hidden">
          <span className="transform -translate-y-0.5 filter drop-shadow-xs">
            {selected.emoji}
          </span>
        </div>
      </div>

      {/* Badge iniziale facoltativo */}
      {showBadge && name && (
        <span className="absolute -bottom-1 -right-1 bg-white text-slate-800 text-[10px] font-black w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center shadow-xs">
          {initial}
        </span>
      )}
    </div>
  );
};
