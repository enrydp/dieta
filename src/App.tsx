import React, { useState, useEffect } from 'react';
import { UserProfile, DayDietPlan, MealPlan, PathologyId } from './types/diet';
import { loadUserProfile, saveUserProfile, loadWeekPlan, saveWeekPlan } from './utils/storage';
import { calculateMacroTargets } from './utils/calculations';
import { generateWeekPlan, generateDailyPlan } from './utils/planGenerator';

import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar, NavTab } from './components/Navbar';
import { DayPlanView } from './components/DayPlanView';
import { WeekPlanView } from './components/WeekPlanView';
import { GroceryListView } from './components/GroceryListView';
import { UserProfileForm } from './components/UserProfileForm';
import { PathologyInfoModal } from './components/PathologyInfoModal';
import { PrintExportModal } from './components/PrintExportModal';
import { Sparkles, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [weekPlan, setWeekPlan] = useState<DayDietPlan[]>(() => {
    const saved = loadWeekPlan();
    if (saved && saved.length === 7) return saved;
    const initial = loadUserProfile();
    return generateWeekPlan(initial);
  });
  
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  // Se il profilo non è ancora stato configurato, apri direttamente sulla scheda profilo
  const [currentTab, setCurrentTab] = useState<NavTab>(() => profile.isConfigured ? 'day' : 'profile');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const targets = calculateMacroTargets(profile);
  const currentDay = weekPlan[activeDayIndex] || weekPlan[0];

  // Salvataggio automatico piano settimanale al variare
  useEffect(() => {
    saveWeekPlan(weekPlan);
  }, [weekPlan]);

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
      
      {/* Disclaimer Medico */}
      <DisclaimerBanner />

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
          <DayPlanView
            dayPlan={currentDay}
            activeDayIndex={activeDayIndex}
            onSelectDayIndex={setActiveDayIndex}
            profile={profile}
            targets={targets}
            onUpdateMeal={handleUpdateMeal}
            onRegenerateDay={handleRegenerateDay}
            onOpenPathologyModal={() => setCurrentTab('pathologies')}
          />
        )}

        {currentTab === 'week' && (
          <WeekPlanView
            weekPlan={weekPlan}
            profile={profile}
            targets={targets}
            onSelectDayIndex={(idx) => {
              setActiveDayIndex(idx);
              setCurrentTab('day');
            }}
            onRegenerateAll={handleRegenerateAll}
          />
        )}

        {currentTab === 'grocery' && (
          <GroceryListView weekPlan={weekPlan} />
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

      {/* Modale Stampa & Esporta PDF */}
      <PrintExportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        profile={profile}
        targets={targets}
        currentDay={currentDay}
        weekPlan={weekPlan}
      />

    </div>
  );
}

export default App;
