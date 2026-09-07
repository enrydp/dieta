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

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [weekPlan, setWeekPlan] = useState<DayDietPlan[]>(() => {
    const saved = loadWeekPlan();
    if (saved && saved.length === 7) return saved;
    const initial = loadUserProfile();
    return generateWeekPlan(initial);
  });
  
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<NavTab>('day');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const targets = calculateMacroTargets(profile);
  const currentDay = weekPlan[activeDayIndex] || weekPlan[0];

  // Salvataggio automatico piano settimanale al variare
  useEffect(() => {
    saveWeekPlan(weekPlan);
  }, [weekPlan]);

  // Aggiornamento pasto
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

  // Salvataggio profilo e ricalcolo totale
  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
    const newWeek = generateWeekPlan(newProfile);
    setWeekPlan(newWeek);
  };

  // Rigenera solo il giorno corrente
  const handleRegenerateDay = () => {
    const newDay = generateDailyPlan(profile, targets, activeDayIndex);
    setWeekPlan(prev => {
      const updated = [...prev];
      updated[activeDayIndex] = newDay;
      return updated;
    });
  };

  // Rigenera l'intera settimana
  const handleRegenerateAll = () => {
    const newWeek = generateWeekPlan(profile);
    setWeekPlan(newWeek);
  };

  // Attiva/disattiva patologia dal catalogo clinico
  const handleTogglePathology = (pathId: PathologyId) => {
    const exists = profile.pathologies.includes(pathId);
    const updated = exists
      ? profile.pathologies.filter(id => id !== pathId)
      : [...profile.pathologies, pathId];
    
    const newProfile = { ...profile, pathologies: updated };
    handleSaveProfile(newProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-8">
      
      {/* Disclaimer Medico */}
      <DisclaimerBanner />

      {/* Navbar Responsiva */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onPrintClick={() => setIsPrintModalOpen(true)}
        onRegenerateClick={handleRegenerateAll}
        activePathologyCount={profile.pathologies.length}
      />

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
            activePathologies={profile.pathologies}
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
