import React, { useState } from 'react';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { PathologyId } from '../types/diet';
import { HeartPulse, CheckCircle2, XCircle, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface PathologyInfoModalProps {
  activePathologies: PathologyId[];
  onTogglePathology?: (id: PathologyId) => void;
}

export const PathologyInfoModal: React.FC<PathologyInfoModalProps> = ({
  activePathologies,
  onTogglePathology
}) => {
  const [selectedId, setSelectedId] = useState<PathologyId>(activePathologies[0] || 'diabetes');
  const activePathology = PATHOLOGIES_DATA[selectedId];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Intestazione */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Guida alle Patologie & Condizioni Nutrizionali</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Approfondimenti scientifici, regole d'oro, cibi da privilegiare e da evitare per ogni condizione.
            </p>
          </div>
        </div>
      </div>

      {/* Layout a due colonne: Elenco laterale + Dettaglio scheda */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Colonna Sinistra: Lista Patologie */}
        <div className="md:col-span-4 space-y-2">
          {Object.values(PATHOLOGIES_DATA).map(p => {
            const isCurrent = p.id === selectedId;
            const isUserActive = activePathologies.includes(p.id);

            return (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{p.name.split('/')[0].trim()}</div>
                  <div className="text-[11px] text-slate-500 font-normal">{p.badge}</div>
                </div>

                {isUserActive && (
                  <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    Nel tuo profilo
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Colonna Destra: Dettaglio Patologia Selezionata */}
        <div className="md:col-span-8 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          
          {/* Header scheda patologia */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {activePathology.badge}
              </span>

              {onTogglePathology && (
                <button
                  type="button"
                  onClick={() => onTogglePathology(activePathology.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    activePathologies.includes(activePathology.id)
                      ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {activePathologies.includes(activePathology.id) ? '✓ Attiva nel Profilo' : '+ Includi nel Profilo'}
                </button>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              {activePathology.name}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {activePathology.summary}
            </p>
          </div>

          {/* Regole Nutrizionali Fondamentali */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Linee Guida & Regole Nutrizionali</span>
            </h4>
            <div className="space-y-2">
              {activePathology.nutritionalRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cibi Consigliati vs Cibi da Evitare */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Consigliati */}
            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200/80">
              <h5 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Alimenti Altamente Consigliati</span>
              </h5>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {activePathology.recommendedFoods.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Da Evitare */}
            <div className="bg-rose-50/50 rounded-xl p-4 border border-rose-200/80">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Alimenti da Evitare o Limitare</span>
              </h5>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {activePathology.avoidFoods.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Nota Clinica */}
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-950 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Nota Scientifica: </span>
              <span>{activePathology.clinicalNotes}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
