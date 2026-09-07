import React, { useState } from 'react';
import { AlertTriangle, X, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm py-2.5 px-4 sm:px-6 relative no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-amber-200 rounded-full text-amber-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold">Nota Medico-Nutrizionale: </span>
            <span>
              NutriPlan calcola stime basate su formule scientifiche validate (Mifflin-St Jeor, linee guida SINU e DASH). I piani alimentari generati sono a scopo educativo e organizzativo e non sostituiscono la prescrizione personalizzata di un medico, diabetologo o biologo nutrizionista.
            </span>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded-md transition-colors shrink-0"
          title="Chiudi avviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
