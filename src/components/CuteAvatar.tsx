import React from 'react';
import { Gender } from '../types/diet';

export interface CuteAvatarProps {
  gender?: Gender;
  weightKg?: number;
  heightCm?: number;
  age?: number;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  mode?: 'bust' | 'full';
  className?: string;
  showBadge?: boolean;
}

export const CuteAvatar: React.FC<CuteAvatarProps> = ({
  gender = 'male',
  weightKg = 70,
  heightCm = 175,
  age = 35,
  size = 'lg',
  mode = 'full',
  className = '',
  showBadge = false
}) => {
  // 1. Calcolo del BMI per determinare la corporatura
  const heightM = (heightCm && heightCm > 50) ? heightCm / 100 : 1.75;
  const validWeight = (weightKg && weightKg > 20) ? weightKg : 70;
  const bmi = validWeight / (heightM * heightM);

  // Categorie di corporatura
  let bodyBuild: 'slim' | 'fit' | 'curvy' | 'plus' = 'fit';
  if (bmi < 19.5) {
    bodyBuild = 'slim';
  } else if (bmi < 25) {
    bodyBuild = 'fit';
  } else if (bmi < 30) {
    bodyBuild = 'curvy';
  } else {
    bodyBuild = 'plus';
  }

  // 2. Categoria età
  let ageGroup: 'young' | 'adult' | 'senior' = 'adult';
  const validAge = age || 35;
  if (validAge < 30) {
    ageGroup = 'young';
  } else if (validAge > 55) {
    ageGroup = 'senior';
  }

  // Dimensioni contenitore in base a size e mode
  const getContainerDimensions = () => {
    if (mode === 'bust') {
      switch (size) {
        case 'sm': return 'w-10 h-10';
        case 'md': return 'w-12 h-12';
        case 'lg': return 'w-16 h-16';
        case 'xl': return 'w-24 h-24';
        case '2xl': return 'w-32 h-32';
        case 'full': return 'w-48 h-48';
      }
    } else {
      // mode === 'full' (proporzioni verticali per figura intera)
      switch (size) {
        case 'sm': return 'w-10 h-16';
        case 'md': return 'w-14 h-22';
        case 'lg': return 'w-24 h-36';
        case 'xl': return 'w-36 h-56';
        case '2xl': return 'w-48 h-72';
        case 'full': return 'w-52 sm:w-60 h-80 sm:h-92';
      }
    }
  };

  // Parametri di forma in base alla corporatura (BMI)
  const buildParams = {
    slim: {
      torsoHalfWidth: 21,
      bellyCurve: 23,
      legOffset: 12,
      legWidth: 10,
      hipsWidth: 22,
      shadowRx: 38
    },
    fit: {
      torsoHalfWidth: 25,
      bellyCurve: 26,
      legOffset: 13,
      legWidth: 12,
      hipsWidth: 26,
      shadowRx: 42
    },
    curvy: {
      torsoHalfWidth: 31,
      bellyCurve: 35,
      legOffset: 15,
      legWidth: 15,
      hipsWidth: 32,
      shadowRx: 48
    },
    plus: {
      torsoHalfWidth: 37,
      bellyCurve: 42,
      legOffset: 17,
      legWidth: 18,
      hipsWidth: 38,
      shadowRx: 54
    }
  }[bodyBuild];

  // Colori abbigliamento per genere
  const isMale = gender === 'male';
  const shirtColorPrimary = isMale ? '#059669' : '#E11D48';
  const shirtColorSecondary = isMale ? '#10B981' : '#FB7185';
  const pantsColor = isMale ? '#1E293B' : '#0F172A';
  const shoeColor = isMale ? '#0284C7' : '#F43F5E';
  
  // Colore capelli in base all'età
  const hairColor = ageGroup === 'senior' 
    ? '#94A3B8' // Argento/Grigio distinto
    : (isMale ? '#331800' : '#451A03'); // Bruno caldo
  const hairAccent = ageGroup === 'senior' ? '#CBD5E1' : '#6B3410';

  // Coordinate viewBox:
  // Se mode 'bust', inquadra testa e spalle. Se 'full', tutta la figura.
  const viewBox = mode === 'bust' ? '25 18 110 110' : '0 0 160 260';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${getContainerDimensions()} ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full drop-shadow-md overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`shirtGrad-${gender}-${bodyBuild}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={shirtColorPrimary} />
            <stop offset="100%" stopColor={shirtColorSecondary} />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>

        {/* --- OMBRA SUL PAVIMENTO (solo in figura intera) --- */}
        {mode === 'full' && (
          <ellipse
            cx="80"
            cy="252"
            rx={buildParams.shadowRx}
            ry="7.5"
            fill="#94A3B8"
            opacity="0.35"
          />
        )}

        {/* --- SCARPE SNEAKERS SPORTIVE (solo in figura intera) --- */}
        {mode === 'full' && (
          <g id="shoes">
            {/* Scarpa sinistra */}
            <path
              d={`M ${80 - buildParams.legOffset - buildParams.legWidth - 2} 242 
                 C ${80 - buildParams.legOffset - buildParams.legWidth - 7} 244, ${80 - buildParams.legOffset - buildParams.legWidth - 8} 250, ${80 - buildParams.legOffset - buildParams.legWidth} 252 
                 L ${80 - buildParams.legOffset + 4} 252 
                 C ${80 - buildParams.legOffset + 7} 250, ${80 - buildParams.legOffset + 6} 243, ${80 - buildParams.legOffset} 242 Z`}
              fill={shoeColor}
            />
            <rect
              x={80 - buildParams.legOffset - buildParams.legWidth - 5}
              y="250"
              width={buildParams.legWidth + 10}
              height="3"
              rx="1.5"
              fill="#FFFFFF"
            />

            {/* Scarpa destra */}
            <path
              d={`M ${80 + buildParams.legOffset} 242 
                 C ${80 + buildParams.legOffset - 6} 243, ${80 + buildParams.legOffset - 7} 250, ${80 + buildParams.legOffset} 252 
                 L ${80 + buildParams.legOffset + buildParams.legWidth + 2} 252 
                 C ${80 + buildParams.legOffset + buildParams.legWidth + 8} 250, ${80 + buildParams.legOffset + buildParams.legWidth + 7} 244, ${80 + buildParams.legOffset + buildParams.legWidth + 2} 242 Z`}
              fill={shoeColor}
            />
            <rect
              x={80 + buildParams.legOffset - 4}
              y="250"
              width={buildParams.legWidth + 10}
              height="3"
              rx="1.5"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* --- GAMBE & PANTALONI (solo in figura intera) --- */}
        {mode === 'full' && (
          <g id="legs">
            {/* Gamba sinistra */}
            <path
              d={`M ${80 - buildParams.hipsWidth + 4} 158 
                 L ${80 - buildParams.legOffset - buildParams.legWidth} 242 
                 L ${80 - buildParams.legOffset + 2} 242 
                 L 78 165 Z`}
              fill={pantsColor}
            />
            {/* Gamba destra */}
            <path
              d={`M ${80 + buildParams.hipsWidth - 4} 158 
                 L ${80 + buildParams.legOffset + buildParams.legWidth} 242 
                 L ${80 + buildParams.legOffset - 2} 242 
                 L 82 165 Z`}
              fill={pantsColor}
            />
            {/* Cavallo dei pantaloni */}
            <path
              d="M 75 160 Q 80 172 85 160 Z"
              fill="#0F172A"
              opacity="0.3"
            />
          </g>
        )}

        {/* --- BRACCIO SINISTRO (appoggiato al fianco) --- */}
        <g id="left-arm">
          <path
            d={`M ${80 - buildParams.torsoHalfWidth + 2} 104 
               Q ${80 - buildParams.torsoHalfWidth - 14} 128 ${80 - buildParams.torsoHalfWidth - 4} 152`}
            stroke="url(#skinGrad)"
            strokeWidth={isMale ? 11 : 9.5}
            strokeLinecap="round"
            fill="none"
          />
          {/* Manica sinistra */}
          <path
            d={`M ${80 - buildParams.torsoHalfWidth + 3} 98 
               Q ${80 - buildParams.torsoHalfWidth - 10} 112 ${80 - buildParams.torsoHalfWidth - 3} 120`}
            stroke={`url(#shirtGrad-${gender}-${bodyBuild})`}
            strokeWidth={isMale ? 12 : 10.5}
            strokeLinecap="round"
            fill="none"
          />
          {/* Manina sinistra al fianco */}
          <circle
            cx={80 - buildParams.torsoHalfWidth - 4}
            cy="152"
            r={isMale ? 5.5 : 4.8}
            fill="url(#skinGrad)"
          />
        </g>

        {/* --- BUSTO & MAGLIETTA (con larghezza dinamica proporzionata al BMI) --- */}
        <g id="torso">
          {/* Corpo principale */}
          <path
            d={`M ${80 - buildParams.torsoHalfWidth} 96 
               Q ${80 - buildParams.bellyCurve} 130 ${80 - buildParams.hipsWidth} 160 
               L ${80 + buildParams.hipsWidth} 160 
               Q ${80 + buildParams.bellyCurve} 130 ${80 + buildParams.torsoHalfWidth} 96 
               Z`}
            fill={`url(#shirtGrad-${gender}-${bodyBuild})`}
          />

          {/* Dettaglio scollo / colletto sportivo */}
          <path
            d={isMale ? "M 70 96 Q 80 106 90 96" : "M 71 96 Q 80 109 89 96"}
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="none"
            opacity="0.9"
          />

          {/* Logo NutriPlan sul petto: una fogliolina verde stilizzata */}
          <g transform="translate(80, 114) scale(0.7)">
            <circle cx="0" cy="0" r="9" fill="#FFFFFF" opacity="0.9" />
            <path
              d="M -4 3 C -4 -4, 4 -4, 4 3 C 4 3, -1 6, -4 3 Z"
              fill="#10B981"
            />
            <path
              d="M -3 3 L 3 -3"
              stroke="#059669"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Sfumatura morbida per corporature curvy/plus */}
          {(bodyBuild === 'curvy' || bodyBuild === 'plus') && (
            <path
              d={`M ${80 - buildParams.bellyCurve + 6} 142 Q 80 156 ${80 + buildParams.bellyCurve - 6} 142`}
              stroke="#000000"
              strokeWidth="2"
              opacity="0.08"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* --- BRACCIO DESTRO (alza con orgoglio una mela verde fresca) --- */}
        <g id="right-arm">
          <path
            d={`M ${80 + buildParams.torsoHalfWidth - 2} 104 
               Q ${80 + buildParams.torsoHalfWidth + 14} 120 ${80 + buildParams.torsoHalfWidth + 6} 136`}
            stroke="url(#skinGrad)"
            strokeWidth={isMale ? 11 : 9.5}
            strokeLinecap="round"
            fill="none"
          />
          {/* Manica destra */}
          <path
            d={`M ${80 + buildParams.torsoHalfWidth - 3} 98 
               Q ${80 + buildParams.torsoHalfWidth + 9} 112 ${80 + buildParams.torsoHalfWidth + 3} 120`}
            stroke={`url(#shirtGrad-${gender}-${bodyBuild})`}
            strokeWidth={isMale ? 12 : 10.5}
            strokeLinecap="round"
            fill="none"
          />
          {/* Manina destra */}
          <circle
            cx={80 + buildParams.torsoHalfWidth + 6}
            cy="136"
            r={isMale ? 5.5 : 4.8}
            fill="url(#skinGrad)"
          />

          {/* Mela verde salutare nella mano */}
          <g transform={`translate(${80 + buildParams.torsoHalfWidth + 8}, 130)`}>
            {/* Picciolo e fogliolina */}
            <path d="M 0 -8 Q 2 -12 4 -11" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 1 -9 Q 6 -11 6 -8 Q 3 -6 1 -9" fill="#22C55E" />
            {/* Corpo mela */}
            <circle cx="0" cy="0" r="7.5" fill="url(#appleGrad)" />
            {/* Riflesso luce mela */}
            <circle cx="-2.5" cy="-2.5" r="2" fill="#FFFFFF" opacity="0.65" />
          </g>
        </g>

        {/* --- COLLO --- */}
        <rect
          x="74"
          y="78"
          width="12"
          height="20"
          rx="5"
          fill="url(#skinGrad)"
        />

        {/* --- TESTA & VISO --- */}
        <g id="head">
          {/* Capelli posteriori per donna */}
          {!isMale && (
            ageGroup === 'young' ? (
              // Coda alta sbarazzina per ragazza giovane
              <path d="M 94 48 Q 124 38 116 75 Q 106 65 96 58 Z" fill={hairColor} />
            ) : (
              // Capelli ondulati per donna adulta/senior
              <path d="M 50 50 C 44 80 50 92 60 92 C 55 75 56 60 62 50 Z M 110 50 C 116 80 110 92 100 92 C 105 75 104 60 98 50 Z" fill={hairColor} />
            )
          )}

          {/* Orecchie */}
          <circle cx="56" cy="56" r="5.5" fill="url(#skinGrad)" />
          <circle cx="104" cy="56" r="5.5" fill="url(#skinGrad)" />
          {/* Orecchino chic per donna */}
          {!isMale && (
            <circle cx="104" cy="59" r="1.5" fill="#F59E0B" />
          )}

          {/* Viso tondeggiante e amichevole */}
          <ellipse cx="80" cy="56" rx="24" ry="24" fill="url(#skinGrad)" />

          {/* Occhi grandi stile cartoon luminosi */}
          {/* Occhio sinistro */}
          <ellipse cx="71" cy="54" rx="4" ry="5.5" fill="#0F172A" />
          <circle cx="69.5" cy="52" r="1.8" fill="#FFFFFF" />
          <circle cx="72.5" cy="56" r="0.9" fill="#FFFFFF" />

          {/* Occhio destro */}
          <ellipse cx="89" cy="54" rx="4" ry="5.5" fill="#0F172A" />
          <circle cx="87.5" cy="52" r="1.8" fill="#FFFFFF" />
          <circle cx="90.5" cy="56" r="0.9" fill="#FFFFFF" />

          {/* Ciglia graziose per donna */}
          {!isMale && (
            <>
              <path d="M 65 50 Q 70 48 76 50" stroke="#0F172A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M 84 50 Q 90 48 95 50" stroke="#0F172A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Sopracciglia */}
          {isMale ? (
            <>
              <path d="M 66 46 Q 71 44 76 46" stroke={hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M 84 46 Q 89 44 94 46" stroke={hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M 66 46 Q 71 43 76 46" stroke={hairColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 84 46 Q 89 43 94 46" stroke={hairColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Guancette rosee simpatiche */}
          <circle cx="64" cy="62" r="4.8" fill="#FB7185" opacity="0.65" />
          <circle cx="96" cy="62" r="4.8" fill="#FB7185" opacity="0.65" />

          {/* Nasino grazioso all'insù */}
          <ellipse cx="80" cy="59" rx="2" ry="1.6" fill="#F59E0B" />

          {/* Sorriso gioioso aperto con dentini bianchi */}
          <path
            d="M 73 64 Q 80 74 87 64 Z"
            fill="#BE123C"
            stroke="#9F1239"
            strokeWidth="0.8"
          />
          <path
            d="M 75 64 Q 80 67 85 64"
            fill="#FFFFFF"
          />

          {/* Occhiali moderni da intellettuale/senior */}
          {ageGroup === 'senior' && (
            <g id="glasses" stroke="#0F172A" strokeWidth="1.8" fill="none">
              <circle cx="71" cy="54" r="7.5" fill="#FFFFFF" fillOpacity="0.25" />
              <circle cx="89" cy="54" r="7.5" fill="#FFFFFF" fillOpacity="0.25" />
              <path d="M 78.5 54 Q 80 52 81.5 54" strokeLinecap="round" />
              <path d="M 63.5 54 L 56 53" strokeLinecap="round" />
              <path d="M 96.5 54 L 104 53" strokeLinecap="round" />
            </g>
          )}

          {/* --- CAPIGLIATURA SUPERIORE --- */}
          {isMale ? (
            // Capelli Uomo
            ageGroup === 'young' ? (
              // Ciuffo moderno / sbarazzino
              <g fill={hairColor}>
                <path d="M 54 50 C 52 30 70 20 86 24 C 98 27 106 38 104 50 C 96 36 84 34 76 36 C 68 37 60 42 54 50 Z" />
                <path d="M 74 24 Q 86 16 92 24 Q 82 23 74 24 Z" fill={hairAccent} />
              </g>
            ) : ageGroup === 'adult' ? (
              // Taglio classico ordinato da uomo adulto
              <g fill={hairColor}>
                <path d="M 54 50 C 52 28 72 24 88 26 C 102 28 106 38 104 50 C 96 38 86 36 78 36 C 68 36 60 42 54 50 Z" />
                <path d="M 56 50 L 56 58 L 60 52 Z" />
              </g>
            ) : (
              // Capelli brizzolati distinti per senior con basetta
              <g fill={hairColor}>
                <path d="M 54 50 C 53 30 72 26 88 28 C 102 30 106 40 104 50 C 96 40 86 38 78 38 C 68 38 60 44 54 50 Z" />
                <path d="M 55 48 L 55 58 L 59 52 Z" />
                <path d="M 105 48 L 105 58 L 101 52 Z" />
                <path d="M 68 32 Q 80 28 92 32" stroke={hairAccent} strokeWidth="1.5" fill="none" />
              </g>
            )
          ) : (
            // Capelli Donna
            ageGroup === 'young' ? (
              // Frangetta sbarazzina con fascia sportiva
              <g>
                <path d="M 54 48 C 52 26 108 26 106 48 C 96 34 64 34 54 48 Z" fill={hairColor} />
                {/* Fascia sportiva colorata */}
                <path d="M 55 42 Q 80 37 105 42 Q 105 37 80 32 Q 55 37 55 42 Z" fill="#FB7185" />
              </g>
            ) : ageGroup === 'adult' ? (
              // Taglio medio scalato elegante
              <g fill={hairColor}>
                <path d="M 53 48 C 50 25 110 25 107 48 C 95 33 65 33 53 48 Z" />
                <path d="M 56 36 Q 80 30 102 36" stroke={hairAccent} strokeWidth="1.8" fill="none" opacity="0.6" />
              </g>
            ) : (
              // Capigliatura argento chic corta per senior
              <g fill={hairColor}>
                <path d="M 53 48 C 50 25 110 25 107 48 C 95 34 65 34 53 48 Z" />
                <path d="M 62 33 Q 80 27 98 33" stroke={hairAccent} strokeWidth="2" fill="none" />
              </g>
            )
          )}
        </g>
      </svg>

      {/* Badge opzionale */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs border border-white">
          {bodyBuild === 'fit' ? 'FIT' : bodyBuild === 'slim' ? 'SLIM' : bodyBuild === 'curvy' ? 'CURVY' : 'STRONG'}
        </span>
      )}
    </div>
  );
};
