import React, { useState, useEffect } from 'react';
import { UserProfile, DayDietPlan, MealPlan, PathologyId } from './types/diet';
import { loadUserProfile, saveUserProfile, loadWeekPlan, saveWeekPlan } from './utils/storage';
import { calculateMacroTargets } from './utils/calculations';
import { generateWeekPlan, generateDailyPlan } from './utils/planGenerator';

import { Navbar, NavTab } from './components/Navbar';
import { DayPlanView } from './components/DayPlanView';
import { WeekPlanView } from './components/WeekPlanView';
import { GroceryListView } from './components/GroceryListView';
import { UserProfileForm } from './components/UserProfileForm';
import { PathologyInfoModal } from './components/PathologyInfoModal';
import { PrintExportModal } from './components/PrintExportModal';
import { Sparkles, CheckCircle2, UserCheck, ArrowRight, Utensils, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';

// Schermata vuota amichevole al primo avvio se i dati personali non sono inseriti
const EmptyPlanView: React.FC<{ onConfigureClick: () => void }> = ({ onConfigureClick }) => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-xs">
        <Utensils className="w-9 h-9" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-black border border-amber-200 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Primo Accesso • Nessuna Dieta Calcolata</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
        Nessun Piano Alimentare Presente
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
        Per evitare di mostrarti piani generici o non adatti al tuo fisico, il piano alimentare viene generato solo dopo aver inserito i tuoi dati reali.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>1. Misure Reali</span>
          </div>
          <p className="text-[11px] text-slate-500">Sesso, peso, altezza ed età per calcolare BMR e fabbisogno calorico (TDEE).</p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>2. Obiettivo Fisico</span>
          </div>
          <p className="text-[11px] text-slate-500">Dimagrimento, mantenimento tonico o aumento massa muscolare.</p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>3. Salute & Patologie</span>
          </div>
          <p className="text-[11px] text-slate-500">Diabete, colesterolo, intolleranze o reflusso per esclusioni mirate.</p>
        </div>
      </div>

      <button
        onClick={onConfigureClick}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
      >
        <UserCheck className="w-4 h-4" />
        <span>Inserisci Dati & Genera la Tua Dieta</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  </div>
);

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [weekPlan, setWeekPlan] = useState<DayDietPlan[]>(() => {
    const initial = loadUserProfile();
    // Al primo avvio, se il profilo non è configurato, non mostrare alcuna dieta
    if (!initial.isConfigured) return [];
    const saved = loadWeekPlan();
    if (saved && saved.length === 7) return saved;
    return generateWeekPlan(initial);
  });
  
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  // Se il profilo non è ancora stato configurato, apri direttamente sulla scheda profilo
  const [currentTab, setCurrentTab] = useState<NavTab>(() => profile.isConfigured ? 'day' : 'profile');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const targets = calculateMacroTargets(profile);
  const hasPlan = Boolean(profile.isConfigured && weekPlan && weekPlan.length === 7);
  const currentDay = hasPlan ? (weekPlan[activeDayIndex] || weekPlan[0]) : null;

  // Salvataggio automatico piano settimanale al variare solo se configurato
  useEffect(() => {
    if (profile.isConfigured && weekPlan && weekPlan.length === 7) {
      saveWeekPlan(weekPlan);
    }
  }, [weekPlan, profile.isConfigured]);

  // Aggiornamento pasto singolo
  const handleUpdateMeal = (updatedMeal: MealPlan) => {
    setWeekPlan(prevWeek => {
      const updatedWeek = [...prevWeek];
      const day = updatedWeek[activeDayIndex];
      if (!day) return prevWeek;

      const mealIdx = day.meals.findIndex(m => m.id === updatedMeal.id);
      if (mealIdx !== -1) {
        const newMeals = [...day.meals];
        newMeals[mealIdx] = updatedMeal;
        updatedWeek[activeDayIndex] = {
          ...day,
          meals: newMeals
        };
      }
      return updatedWeek;
    });
  };

  // Salvataggio profilo e ricalcolo totale con generazione immediata
  const handleSaveProfile = (newProfile: UserProfile) => {
    const configuredProfile = { ...newProfile, isConfigured: true };
    setProfile(configuredProfile);
    saveUserProfile(configuredProfile);

    // Usa timestamp come seed di variazione per garantire nuove combinazioni
    const newWeek = generateWeekPlan(configuredProfile, Date.now());
    setWeekPlan(newWeek);
    saveWeekPlan(newWeek);

    // Passa immediatamente alla visualizzazione del piano giornaliero per far vedere il risultato
    setCurrentTab('day');
    setActiveDayIndex(0);

    // Effetto visivo e toast di successo
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti opzionale
    }

    setSuccessToast(`Piano alimentare personalizzato generato per ${configuredProfile.name || 'te'}! Target: ${calculateMacroTargets(configuredProfile).targetCalories} kcal`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Rigenera solo il giorno corrente con variazioni
  const handleRegenerateDay = () => {
    const seed = Math.floor(Math.random() * 1000) + 1;
    const newDay = generateDailyPlan(profile, targets, activeDayIndex, seed);
    setWeekPlan(prev => {
      const updated = [...prev];
      updated[activeDayIndex] = newDay;
      return updated;
    });
    setSuccessToast(`Pasti di ${newDay.dayName} variati con successo!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Rigenera l'intera settimana con nuove combinazioni
  const handleRegenerateAll = () => {
    const seed = Math.floor(Math.random() * 1000) + 1;
    const newWeek = generateWeekPlan(profile, seed);
    setWeekPlan(newWeek);
    saveWeekPlan(newWeek);
    setSuccessToast(`Intero piano settimanale rigenerato con nuovi alimenti variati!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Attiva/disattiva patologia dal catalogo clinico
  const handleTogglePathology = (pathId: PathologyId) => {
    const currentPaths = profile.pathologies || [];
    const exists = currentPaths.includes(pathId);
    const updated = exists
      ? currentPaths.filter(id => id !== pathId)
      : [...currentPaths, pathId];
    
    const newProfile = { ...profile, pathologies: updated, isConfigured: true };
    handleSaveProfile(newProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-8">
      
      {/* Toast Notifica Successo Dinamico */}
      {successToast && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center sticky top-0 z-50 shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Navbar Responsiva */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onPrintClick={() => setIsPrintModalOpen(true)}
        onRegenerateClick={handleRegenerateAll}
        activePathologyCount={(profile.pathologies || []).length}
        profile={profile}
      />

      {/* Banner onboarding se il profilo non è ancora configurato */}
      {!profile.isConfigured && currentTab !== 'profile' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">Personalizza il Tuo Piano Alimentare</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Inserisci peso, altezza, obiettivo ed eventuali patologie per generare una dieta calcolata scientificamente per te.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('profile')}
              className="px-5 py-2 bg-white text-emerald-800 text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Inserisci i Tuoi Dati</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'day' && (
          hasPlan && currentDay ? (
            <DayPlanView
              dayPlan={currentDay}
              activeDayIndex={activeDayIndex}
              onSelectDayIndex={setActiveDayIndex}
              profile={profile}
              targets={targets}
              onUpdateMeal={handleUpdateMeal}
              onRegenerateDay={handleRegenerateDay}
              onOpenPathologyModal={() => setCurrentTab('pathologies')}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
            />
          ) : (
            <EmptyPlanView onConfigureClick={() => setCurrentTab('profile')} />
          )
        )}

        {currentTab === 'week' && (
          hasPlan ? (
            <WeekPlanView
              weekPlan={weekPlan}
              profile={profile}
              targets={targets}
              onSelectDayIndex={(idx) => {
                setActiveDayIndex(idx);
                setCurrentTab('day');
              }}
              onRegenerateAll={handleRegenerateAll}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
            />
          ) : (
            <EmptyPlanView onConfigureClick={() => setCurrentTab('profile')} />
          )
        )}

        {currentTab === 'grocery' && (
          hasPlan ? (
            <GroceryListView weekPlan={weekPlan} />
          ) : (
            <EmptyPlanView onConfigureClick={() => setCurrentTab('profile')} />
          )
        )}

        {currentTab === 'profile' && (
          <UserProfileForm
            initialProfile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {currentTab === 'pathologies' && (
          <PathologyInfoModal
            activePathologies={profile.pathologies || []}
            onTogglePathology={handleTogglePathology}
          />
        )}
      </main>

      {/* Pulsante Fluttuante Genera PDF per Cellulari (sempre a portata di mano ovunque si scorra) */}
      {hasPlan && (
        <button
          onClick={() => setIsPrintModalOpen(true)}
          className="md:hidden fixed bottom-18 right-3.5 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 active:scale-95 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-full shadow-xl border-2 border-white flex items-center gap-1.5 transition-all cursor-pointer"
          title="Genera PDF del piano alimentare"
        >
          <FileDown className="w-4 h-4" />
          <span>Genera PDF</span>
        </button>
      )}

      {/* Modale Stampa & Esporta PDF (attiva solo se il piano è generato) */}
      {hasPlan && currentDay && (
        <PrintExportModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          profile={profile}
          targets={targets}
          currentDay={currentDay}
          weekPlan={weekPlan}
        />
      )}

    </div>
  );
}

export default App;
