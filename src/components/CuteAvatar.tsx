import React from 'react';
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
  { id: 'active_senior_m', name: 'Nono Sprint', label: 'Nonno Sprint (Senior)', gender: 'male', bgGradient: 'from-amber-500 via-yellow-400 to-orange-400' },
  { id: 'active_senior_f', name: 'Nonna Sprint', label: 'Nonna Sprint (Senior)', gender: 'female', bgGradient: 'from-indigo-400 via-purple-400 to-rose-300' }
];

interface CuteAvatarProps {
  gender?: Gender;
  avatarStyle?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBadge?: boolean;
}

export const CuteAvatar: React.FC<CuteAvatarProps> = ({
  gender = 'male',
  avatarStyle,
  name,
  size = 'lg',
  className = '',
  showBadge = false
}) => {
  let selected = AVATAR_OPTIONS.find(a => a.id === avatarStyle);
  if (!selected) {
    selected = AVATAR_OPTIONS.find(a => a.gender === gender) || AVATAR_OPTIONS[0];
  }

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : '?';

  // Render dell'illustrazione cartoon SVG specifica
  const renderCartoonFace = (id: string) => {
    switch (id) {
      case 'girl_sporty':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Coda di cavallo laterale */}
            <path d="M 68 35 Q 92 25 82 55 Q 75 48 68 45 Z" fill="#8B4513" />
            {/* Corpo / Canotta sportiva */}
            <path d="M 28 85 Q 50 78 72 85 L 75 100 L 25 100 Z" fill="#F43F5E" />
            <path d="M 40 82 Q 50 86 60 82" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            {/* Collo */}
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            {/* Viso */}
            <ellipse cx="50" cy="52" rx="24" ry="22" fill="#FDE68A" />
            {/* Orecchie */}
            <circle cx="26" cy="53" r="5" fill="#FDE68A" />
            <circle cx="74" cy="53" r="5" fill="#FDE68A" />
            {/* Orecchino */}
            <circle cx="74" cy="56" r="1.5" fill="#F59E0B" />
            {/* Capelli base */}
            <path d="M 26 48 C 24 25 76 25 74 48 C 65 30 35 30 26 48 Z" fill="#92400E" />
            {/* Fascia capelli sportiva */}
            <path d="M 25 40 Q 50 35 75 40 Q 75 34 50 29 Q 25 34 25 40 Z" fill="#FB7185" />
            {/* Occhi grandi Cartoon */}
            <ellipse cx="40" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            <ellipse cx="60" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            {/* Punti luce occhi (stile anime/cartoon) */}
            <circle cx="38.5" cy="48" r="1.8" fill="#FFFFFF" />
            <circle cx="58.5" cy="48" r="1.8" fill="#FFFFFF" />
            <circle cx="41.5" cy="52" r="0.8" fill="#FFFFFF" />
            <circle cx="61.5" cy="52" r="0.8" fill="#FFFFFF" />
            {/* Ciglia graziose */}
            <path d="M 34 47 Q 38 45 43 46" stroke="#1F2937" strokeWidth="1.2" fill="none" />
            <path d="M 57 46 Q 62 45 66 47" stroke="#1F2937" strokeWidth="1.2" fill="none" />
            {/* Guance rosee */}
            <circle cx="33" cy="56" r="4.5" fill="#FDA4AF" opacity="0.85" />
            <circle cx="67" cy="56" r="4.5" fill="#FDA4AF" opacity="0.85" />
            {/* Sorriso simpatico aperto */}
            <path d="M 43 57 Q 50 66 57 57" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 45 58 Q 50 61 55 58" fill="#FFFFFF" />
          </svg>
        );

      case 'chef_guy':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Corpo Giacca Chef */}
            <path d="M 25 85 Q 50 78 75 85 L 78 100 L 22 100 Z" fill="#F8FAFC" />
            <circle cx="46" cy="88" r="2" fill="#0F172A" />
            <circle cx="46" cy="94" r="2" fill="#0F172A" />
            <circle cx="54" cy="88" r="2" fill="#0F172A" />
            <circle cx="54" cy="94" r="2" fill="#0F172A" />
            <path d="M 40 82 L 50 88 L 60 82" stroke="#EF4444" strokeWidth="3" fill="none" />
            {/* Collo */}
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            {/* Viso tondo simpatico */}
            <ellipse cx="50" cy="55" rx="24" ry="21" fill="#FDE68A" />
            {/* Orecchie */}
            <circle cx="26" cy="55" r="5" fill="#FDE68A" />
            <circle cx="74" cy="55" r="5" fill="#FDE68A" />
            {/* Cappello da Chef gonfio Cartoon */}
            <ellipse cx="50" cy="28" rx="26" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="35" cy="20" r="14" fill="#FFFFFF" />
            <circle cx="50" cy="14" r="15" fill="#FFFFFF" />
            <circle cx="65" cy="20" r="14" fill="#FFFFFF" />
            <rect x="29" y="32" width="42" height="12" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            {/* Ciuffi capelli scuri che sbucano */}
            <path d="M 28 44 Q 35 48 38 44" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 62 44 Q 65 48 72 44" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
            {/* Occhi ammiccanti simpatici */}
            <ellipse cx="39" cy="53" rx="3.5" ry="4.5" fill="#1F2937" />
            <circle cx="38" cy="51" r="1.5" fill="#FFFFFF" />
            <path d="M 58 55 Q 63 48 67 55" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Naso tondo da chef */}
            <circle cx="50" cy="58" r="3" fill="#F59E0B" />
            {/* Baffetto simpatico curvo */}
            <path d="M 43 63 Q 48 60 50 63 Q 52 60 57 63" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Sorriso fiero */}
            <path d="M 45 66 Q 50 71 55 66" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Guancette */}
            <circle cx="33" cy="58" r="4" fill="#FCA5A5" opacity="0.8" />
            <circle cx="67" cy="58" r="4" fill="#FCA5A5" opacity="0.8" />
          </svg>
        );

      case 'chef_girl':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 25 85 Q 50 78 75 85 L 78 100 L 22 100 Z" fill="#F8FAFC" />
            <path d="M 43 82 Q 50 86 57 82" stroke="#10B981" strokeWidth="3" fill="none" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="54" rx="24" ry="21" fill="#FDE68A" />
            <circle cx="26" cy="54" r="5" fill="#FDE68A" />
            <circle cx="74" cy="54" r="5" fill="#FDE68A" />
            {/* Capelli castano-rame */}
            <path d="M 25 55 Q 22 70 30 72 Q 33 60 30 50 Z" fill="#B45309" />
            <path d="M 75 55 Q 78 70 70 72 Q 67 60 70 50 Z" fill="#B45309" />
            {/* Cappello Chef */}
            <circle cx="35" cy="20" r="13" fill="#FFFFFF" />
            <circle cx="50" cy="14" r="15" fill="#FFFFFF" />
            <circle cx="65" cy="20" r="13" fill="#FFFFFF" />
            <rect x="30" y="30" width="40" height="12" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            {/* Frangetta sbarazzina */}
            <path d="M 32 42 Q 40 47 48 42 Q 56 47 68 42" fill="#D97706" />
            {/* Occhi grandi luminosi */}
            <ellipse cx="39" cy="52" rx="4" ry="5.5" fill="#1F2937" />
            <ellipse cx="61" cy="52" rx="4" ry="5.5" fill="#1F2937" />
            <circle cx="37.5" cy="50" r="1.8" fill="#FFFFFF" />
            <circle cx="59.5" cy="50" r="1.8" fill="#FFFFFF" />
            {/* Lentiggini simpatiche */}
            <circle cx="36" cy="59" r="0.8" fill="#B45309" />
            <circle cx="38" cy="61" r="0.8" fill="#B45309" />
            <circle cx="62" cy="61" r="0.8" fill="#B45309" />
            <circle cx="64" cy="59" r="0.8" fill="#B45309" />
            {/* Guance rosee */}
            <circle cx="32" cy="58" r="4.5" fill="#FDA4AF" opacity="0.85" />
            <circle cx="68" cy="58" r="4.5" fill="#FDA4AF" opacity="0.85" />
            {/* Sorriso felice */}
            <path d="M 43 60 Q 50 68 57 60" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 45 61 Q 50 63 55 61" fill="#FFFFFF" />
          </svg>
        );

      case 'gym_power':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Spalle larghe / Canotta Gym */}
            <path d="M 18 85 Q 50 75 82 85 L 85 100 L 15 100 Z" fill="#F59E0B" />
            <path d="M 40 83 Q 50 88 60 83" stroke="#B45309" strokeWidth="2.5" fill="none" />
            <rect x="42" y="68" width="16" height="15" rx="3" fill="#FCD34D" />
            {/* Viso squadrato/forte simpatico */}
            <rect x="27" y="36" width="46" height="38" rx="16" fill="#FDE68A" />
            <circle cx="25" cy="54" r="5" fill="#FDE68A" />
            <circle cx="75" cy="54" r="5" fill="#FDE68A" />
            {/* Capelli corti con ciuffo forte */}
            <path d="M 28 40 C 25 24 75 24 72 40 C 65 30 35 30 28 40 Z" fill="#374151" />
            {/* Fascia rossa sportiva */}
            <rect x="25" y="36" width="50" height="9" rx="3" fill="#EF4444" />
            {/* Occhi cartoon determinati e allegri */}
            <ellipse cx="40" cy="53" rx="4" ry="5" fill="#1F2937" />
            <ellipse cx="60" cy="53" rx="4" ry="5" fill="#1F2937" />
            <circle cx="39" cy="51" r="1.8" fill="#FFFFFF" />
            <circle cx="59" cy="51" r="1.8" fill="#FFFFFF" />
            {/* Sopracciglia decise */}
            <path d="M 34 46 L 45 48" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 55 48 L 66 46" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            {/* Gocciolina di sudore anime simpatico */}
            <path d="M 72 48 C 70 45 74 42 74 44 C 75 46 73 48 72 48 Z" fill="#38BDF8" />
            {/* Sorriso energico */}
            <path d="M 42 61 Q 50 71 58 61" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 44 62 Q 50 65 56 62" fill="#FFFFFF" />
          </svg>
        );

      case 'girl_yoga':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 28 85 Q 50 78 72 85 L 75 100 L 25 100 Z" fill="#8B5CF6" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="52" rx="23" ry="21" fill="#FDE68A" />
            <circle cx="27" cy="52" r="5" fill="#FDE68A" />
            <circle cx="73" cy="52" r="5" fill="#FDE68A" />
            {/* Capelli morbidi viola/scuri raccolti */}
            <path d="M 27 50 C 24 26 76 26 73 50 C 65 32 35 32 27 50 Z" fill="#4C1D95" />
            <circle cx="50" cy="26" r="10" fill="#5B21B6" />
            {/* Fiore tra i capelli */}
            <circle cx="68" cy="38" r="4.5" fill="#EC4899" />
            <circle cx="68" cy="38" r="2" fill="#FDE047" />
            {/* Occhi chiusi beati a mezzaluna (^_^) */}
            <path d="M 34 52 Q 40 46 46 52" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 54 52 Q 60 46 66 52" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Guance rosee rilassate */}
            <circle cx="33" cy="56" r="5" fill="#F472B6" opacity="0.8" />
            <circle cx="67" cy="56" r="5" fill="#F472B6" opacity="0.8" />
            {/* Sorriso sereno e dolce */}
            <path d="M 44 60 Q 50 65 56 60" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'smart_guy':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 25 85 Q 50 78 75 85 L 78 100 L 22 100 Z" fill="#059669" />
            {/* Spilletta Avocado sulla maglietta */}
            <ellipse cx="62" cy="90" rx="3.5" ry="5" fill="#84CC16" />
            <circle cx="62" cy="91" r="2" fill="#78350F" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="52" rx="24" ry="21" fill="#FDE68A" />
            <circle cx="26" cy="52" r="5" fill="#FDE68A" />
            <circle cx="74" cy="52" r="5" fill="#FDE68A" />
            {/* Capelli castani con riga laterale pulita */}
            <path d="M 26 46 C 24 24 76 24 74 46 C 65 30 40 30 26 46 Z" fill="#78350F" />
            <path d="M 32 36 Q 45 32 68 40" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Occhiali rotondi da nerd simpatico */}
            <circle cx="38" cy="52" r="8.5" fill="none" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="62" cy="52" r="8.5" fill="none" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M 46.5 52 L 53.5 52" stroke="#1E293B" strokeWidth="2.5" />
            {/* Occhi intelligenti dietro le lenti */}
            <ellipse cx="38" cy="52" rx="3.5" ry="4.5" fill="#1F2937" />
            <ellipse cx="62" cy="52" rx="3.5" ry="4.5" fill="#1F2937" />
            <circle cx="36.5" cy="50" r="1.5" fill="#FFFFFF" />
            <circle cx="60.5" cy="50" r="1.5" fill="#FFFFFF" />
            {/* Sorriso intelligente a denti scoperti */}
            <path d="M 43 62 Q 50 69 57 62" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 45 63 Q 50 66 55 63" fill="#FFFFFF" />
            <circle cx="30" cy="57" r="4" fill="#FCA5A5" opacity="0.75" />
            <circle cx="70" cy="57" r="4" fill="#FCA5A5" opacity="0.75" />
          </svg>
        );

      case 'healthy_girl':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 28 85 Q 50 78 72 85 L 75 100 L 25 100 Z" fill="#EC4899" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="52" rx="23" ry="21" fill="#FDE68A" />
            <circle cx="27" cy="52" r="5" fill="#FDE68A" />
            <circle cx="73" cy="52" r="5" fill="#FDE68A" />
            {/* Caschetto sbarazzino con punte all'insù */}
            <path d="M 26 48 C 24 24 76 24 74 48 C 65 30 35 30 26 48 Z" fill="#9A3412" />
            <path d="M 23 54 Q 25 68 31 66" stroke="#9A3412" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 77 54 Q 75 68 69 66" stroke="#9A3412" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Mollettina fragola */}
            <path d="M 33 38 Q 37 42 33 46 Q 29 42 33 38 Z" fill="#EF4444" />
            <circle cx="33" cy="38" r="1" fill="#10B981" />
            {/* Occhi grandi felici */}
            <ellipse cx="39" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            <ellipse cx="61" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            <circle cx="37.5" cy="48" r="2" fill="#FFFFFF" />
            <circle cx="59.5" cy="48" r="2" fill="#FFFFFF" />
            <circle cx="40.5" cy="52" r="0.8" fill="#FFFFFF" />
            <circle cx="62.5" cy="52" r="0.8" fill="#FFFFFF" />
            {/* Guance super rosee */}
            <circle cx="32" cy="56" r="5" fill="#F43F5E" opacity="0.85" />
            <circle cx="68" cy="56" r="5" fill="#F43F5E" opacity="0.85" />
            {/* Sorrisone gigante felice */}
            <path d="M 41 57 Q 50 68 59 57" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 43 58 Q 50 63 57 58" fill="#FFFFFF" />
          </svg>
        );

      case 'active_senior_m':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 25 85 Q 50 78 75 85 L 78 100 L 22 100 Z" fill="#0284C7" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="53" rx="24" ry="21" fill="#FDE68A" />
            <circle cx="26" cy="53" r="5" fill="#FDE68A" />
            <circle cx="74" cy="53" r="5" fill="#FDE68A" />
            {/* Capelli brizzolati argento e berretto sportivo */}
            <path d="M 27 50 Q 23 40 27 34" stroke="#CBD5E1" strokeWidth="3" fill="none" />
            <path d="M 73 50 Q 77 40 73 34" stroke="#CBD5E1" strokeWidth="3" fill="none" />
            {/* Berretto con visiera */}
            <ellipse cx="50" cy="34" rx="24" ry="12" fill="#EA580C" />
            <path d="M 28 36 Q 50 30 76 34 L 84 37 Q 50 33 26 40 Z" fill="#C2410C" />
            {/* Occhiali simpatici con zampette */}
            <circle cx="39" cy="53" r="7.5" fill="none" stroke="#475569" strokeWidth="2" />
            <circle cx="61" cy="53" r="7.5" fill="none" stroke="#475569" strokeWidth="2" />
            <path d="M 46.5 53 L 53.5 53" stroke="#475569" strokeWidth="2" />
            {/* Occhietti vispi */}
            <circle cx="39" cy="53" r="3" fill="#1F2937" />
            <circle cx="61" cy="53" r="3" fill="#1F2937" />
            <circle cx="38" cy="51.5" r="1.2" fill="#FFFFFF" />
            <circle cx="60" cy="51.5" r="1.2" fill="#FFFFFF" />
            {/* Baffetti bianchi a spazzola */}
            <path d="M 43 62 Q 50 60 57 62" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            {/* Sorriso arzillo */}
            <path d="M 44 65 Q 50 71 56 65" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="32" cy="58" r="3.5" fill="#FCA5A5" opacity="0.7" />
            <circle cx="68" cy="58" r="3.5" fill="#FCA5A5" opacity="0.7" />
          </svg>
        );

      case 'active_senior_f':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <path d="M 26 85 Q 50 78 74 85 L 77 100 L 23 100 Z" fill="#7C3AED" />
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            <ellipse cx="50" cy="53" rx="23" ry="21" fill="#FDE68A" />
            <circle cx="27" cy="53" r="5" fill="#FDE68A" />
            <circle cx="73" cy="53" r="5" fill="#FDE68A" />
            {/* Capelli argento curati voluminosi */}
            <path d="M 25 50 C 20 25 80 25 75 50 C 65 32 35 32 25 50 Z" fill="#E2E8F0" />
            <circle cx="28" cy="45" r="7" fill="#E2E8F0" />
            <circle cx="72" cy="45" r="7" fill="#E2E8F0" />
            {/* Occhiali cat-eye viola alla moda */}
            <circle cx="39" cy="53" r="7.5" fill="none" stroke="#6D28D9" strokeWidth="2" />
            <circle cx="61" cy="53" r="7.5" fill="none" stroke="#6D28D9" strokeWidth="2" />
            <path d="M 46.5 53 L 53.5 53" stroke="#6D28D9" strokeWidth="2" />
            <ellipse cx="39" cy="53" rx="3.5" ry="4.5" fill="#1F2937" />
            <ellipse cx="61" cy="53" rx="3.5" ry="4.5" fill="#1F2937" />
            <circle cx="37.5" cy="51" r="1.5" fill="#FFFFFF" />
            <circle cx="59.5" cy="51" r="1.5" fill="#FFFFFF" />
            {/* Rossetto e sorriso cordiale */}
            <path d="M 43 63 Q 50 70 57 63" fill="#BE123C" stroke="#9F1239" strokeWidth="1" />
            <circle cx="32" cy="59" r="4" fill="#FDA4AF" opacity="0.8" />
            <circle cx="68" cy="59" r="4" fill="#FDA4AF" opacity="0.8" />
          </svg>
        );

      case 'guy_sporty':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Corpo / T-shirt sportiva azzurra */}
            <path d="M 25 85 Q 50 78 75 85 L 78 100 L 22 100 Z" fill="#0284C7" />
            <path d="M 40 82 Q 50 86 60 82" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            {/* Collo */}
            <rect x="44" y="68" width="12" height="15" rx="3" fill="#FCD34D" />
            {/* Viso tondeggiante cartoon */}
            <ellipse cx="50" cy="52" rx="24" ry="22" fill="#FDE68A" />
            {/* Orecchie */}
            <circle cx="26" cy="53" r="5" fill="#FDE68A" />
            <circle cx="74" cy="53" r="5" fill="#FDE68A" />
            {/* Capelli castani con ciuffo ribelle cartoon */}
            <path d="M 26 46 C 24 24 76 24 74 46 C 65 30 35 30 26 46 Z" fill="#78350F" />
            <path d="M 45 22 Q 52 14 56 22" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Fascia sportiva rossa in testa */}
            <path d="M 25 40 Q 50 35 75 40 Q 75 34 50 29 Q 25 34 25 40 Z" fill="#EF4444" />
            {/* Occhi grandi Cartoon espressivi */}
            <ellipse cx="40" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            <ellipse cx="60" cy="50" rx="4" ry="5.5" fill="#1F2937" />
            {/* Punti luce stile cartoon */}
            <circle cx="38.5" cy="48" r="1.8" fill="#FFFFFF" />
            <circle cx="58.5" cy="48" r="1.8" fill="#FFFFFF" />
            <circle cx="41.5" cy="52" r="0.8" fill="#FFFFFF" />
            <circle cx="61.5" cy="52" r="0.8" fill="#FFFFFF" />
            {/* Guancette simpatiche rosee */}
            <circle cx="32" cy="56" r="4.5" fill="#FDA4AF" opacity="0.85" />
            <circle cx="68" cy="56" r="4.5" fill="#FDA4AF" opacity="0.85" />
            {/* Sorriso aperto e allegro con denti visibili */}
            <path d="M 42 58 Q 50 68 58 58" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            <path d="M 44 59 Q 50 63 56 59" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}>
      {/* Contenitore con cornice tonda e sfumatura */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr ${selected.bgGradient} p-1 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-white`}
      >
        <div className="w-full h-full rounded-full bg-white/25 backdrop-blur-2xs flex items-center justify-center overflow-hidden">
          {renderCartoonFace(selected.id)}
        </div>
      </div>

      {/* Badge iniziale decorativo */}
      {showBadge && name && (
        <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
          {initial}
        </span>
      )}
    </div>
  );
};
