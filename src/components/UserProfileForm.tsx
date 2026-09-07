import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, FitnessGoal, DietType, PathologyId } from '../types/diet';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { calculateBMI, calculateBodyFat, calculateMacroTargets } from '../utils/calculations';
import { User, Activity, HeartPulse, CheckCircle, Save, Sparkles, Scale } from 'lucide-react';

interface UserProfileFormProps {
  initialProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  initialProfile,
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const targets = calculateMacroTargets(profile);
  const { bmi, category: bmiCategory } = calculateBMI(profile.weightKg || 70, profile.heightCm || 175);
  const bodyFat = calculateBodyFat(profile);

  const handleFieldChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const togglePathology = (pathId: PathologyId) => {
    setProfile(prev => {
      const currentPaths = prev.pathologies || [];
      const exists = currentPaths.includes(pathId);
      const updated = exists
        ? currentPaths.filter(id => id !== pathId)
        : [...currentPaths, pathId];
      return { ...prev, pathologies: updated };
    });
    setSavedSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name: profile.name.trim() || 'Utente',
      isConfigured: true
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      
      {/* Intestazione */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <span>I Tuoi Dati & Fabbisogni Nutrizionali</span>
            </h2>
            {!profile.isConfigured && (
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Primo Avvio
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Inserisci i tuoi parametri reali e seleziona le tue preferenze alimentari o eventuali patologie cliniche.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              <span>Salvato & Ricalcolato!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Salva Profilo & Genera Piano</span>
            </>
          )}
        </button>
      </div>

      {/* Box 1: Dati Fisici & BMI */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>1. Misure Antropometriche</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome o Nickname</label>
            <input
              type="text"
              placeholder="Inserisci il tuo nome..."
              value={profile.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Sesso Biologico</label>
            <select
              value={profile.gender}
              onChange={(e) => handleFieldChange('gender', e.target.value as Gender)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="male">Uomo</option>
              <option value="female">Donna</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Età (anni)</label>
            <input
              type="number"
              min={14}
              max={100}
              placeholder="es. 30"
              value={profile.age || ''}
              onChange={(e) => handleFieldChange('age', Math.max(14, Number(e.target.value)))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Altezza (cm)</label>
            <input
              type="number"
              min={120}
              max={230}
              placeholder="es. 175"
              value={profile.heightCm || ''}
              onChange={(e) => handleFieldChange('heightCm', Math.max(100, Number(e.target.value)))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Peso Corporeo (kg)</label>
            <input
              type="number"
              step={0.5}
              min={35}
              max={250}
              placeholder="es. 70"
              value={profile.weightKg || ''}
              onChange={(e) => handleFieldChange('weightKg', Math.max(30, Number(e.target.value)))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Vita (cm, opzionale)</label>
            <input
              type="number"
              placeholder="es. 82"
              value={profile.waistCm || ''}
              onChange={(e) => handleFieldChange('waistCm', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Collo (cm, opzionale)</label>
            <input
              type="number"
              placeholder="es. 37"
              value={profile.neckCm || ''}
              onChange={(e) => handleFieldChange('neckCm', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {profile.gender === 'female' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Fianchi (cm)</label>
              <input
                type="number"
                placeholder="es. 95"
                value={profile.hipCm || ''}
                onChange={(e) => handleFieldChange('hipCm', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          )}

        </div>

        {/* Live BMI & Indicatori */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Indice Massa Corporea (BMI):</span>
            <span className="font-extrabold text-slate-900 text-base">{bmi}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              bmi >= 18.5 && bmi < 25
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {bmiCategory}
            </span>
          </div>

          {bodyFat !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Stima Massa Grassa (US Navy):</span>
              <span className="font-bold text-slate-900">{bodyFat}%</span>
            </div>
          )}
        </div>

      </div>

      {/* Box 2: Attività & Obiettivo */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>2. Stile di Vita, Pasti & Obiettivo</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Livello di Attività</label>
            <select
              value={profile.activityLevel}
              onChange={(e) => handleFieldChange('activityLevel', e.target.value as ActivityLevel)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="sedentary">Sedentario (lavoro d'ufficio, no sport)</option>
              <option value="light">Leggero (1-2 allenamenti/sett)</option>
              <option value="moderate">Moderato (3-4 allenamenti/sett)</option>
              <option value="heavy">Pesante (5-6 allenamenti intensi/sett)</option>
              <option value="athlete">Atleta agonista (x1.9)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Obiettivo Nutrizionale</label>
            <select
              value={profile.goal}
              onChange={(e) => handleFieldChange('goal', e.target.value as FitnessGoal)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="cut_slow">Dimagrimento Graduale (-15% deficit)</option>
              <option value="cut_fast">Dimagrimento Rapido (-20% deficit)</option>
              <option value="maintain">Mantenimento Peso / Forma</option>
              <option value="recomp">Ricomposizione Corporea</option>
              <option value="bulk_clean">Aumento Massa Muscolare (+10%)</option>
              <option value="bulk_high">Crescita Rapida (+15%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Regime Alimentare</label>
            <select
              value={profile.dietType}
              onChange={(e) => handleFieldChange('dietType', e.target.value as DietType)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="mediterranean">Mediterranea Equilibrata</option>
              <option value="standard">Onnivora Standard</option>
              <option value="vegetarian">Vegetariana</option>
              <option value="vegan">Vegana (100% vegetale)</option>
              <option value="low_carb">Low Carb (Bassi carboidrati)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Numero di Pasti al Giorno</label>
            <select
              value={profile.mealsPerDay}
              onChange={(e) => handleFieldChange('mealsPerDay', Number(e.target.value))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer font-semibold text-emerald-800"
            >
              <option value={3}>3 Pasti (Colazione, Pranzo, Cena)</option>
              <option value={4}>4 Pasti (+ Spuntino Pomeriggio)</option>
              <option value={5}>5 Pasti (+ Spuntino Mattina e Pomeriggio)</option>
              <option value={6}>6 Pasti (+ Pre-nanna)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Box 3: Patologie & Condizioni Cliniche */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <span>3. Patologie & Condizioni Clinico-Nutrizionali</span>
          </h3>
          <span className="text-xs text-slate-500">
            {profile.pathologies && profile.pathologies.length > 0 ? (
              <span className="font-bold text-rose-600">{profile.pathologies.length} selezionate</span>
            ) : (
              'Nessuna patologia selezionata'
            )}
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Seleziona solo le condizioni mediche diagnosticate che ti riguardano (lascia vuoto se non ne hai). L'algoritmo adatterà automaticamente alimenti, zuccheri, grassi saturi e sodio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {Object.values(PATHOLOGIES_DATA).map(p => {
            const isSelected = profile.pathologies && profile.pathologies.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => togglePathology(p.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 font-bold ${
                      isSelected ? 'bg-rose-600 text-white' : 'border border-slate-300'
                    }`}>
                      {isSelected && '✓'}
                    </span>
                  </div>
                  <span className="inline-block text-[10px] font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full mb-1.5">
                    {p.badge}
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {p.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Box 4: Risultato Fabbisogno */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-base">Fabbisogno Calcolato in Tempo Reale</span>
          </div>
          <span className="text-xs text-slate-400">Formula Mifflin-St Jeor</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs uppercase block">Metabolismo Basale (BMR)</span>
            <span className="text-xl font-bold text-white mt-1 block">{targets.bmr} <span className="text-xs font-normal">kcal</span></span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs uppercase block">Mantenimento (TDEE)</span>
            <span className="text-xl font-bold text-white mt-1 block">{targets.tdee} <span className="text-xs font-normal">kcal</span></span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-emerald-500/60">
            <span className="text-emerald-400 text-xs uppercase font-bold block">Target Calorico Giornaliero</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{targets.targetCalories} <span className="text-xs font-normal">kcal</span></span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs uppercase block">Idratazione Minima</span>
            <span className="text-xl font-bold text-sky-400 mt-1 block">{targets.waterLiters} <span className="text-xs font-normal">Litri/die</span></span>
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/60 flex flex-wrap items-center justify-around gap-2 text-xs">
          <div>Proteine Target: <span className="font-bold text-blue-400">{targets.proteinGrams}g</span> ({targets.proteinKcal} kcal)</div>
          <div>Carboidrati Target: <span className="font-bold text-amber-400">{targets.carbsGrams}g</span> ({targets.carbsKcal} kcal)</div>
          <div>Grassi Target: <span className="font-bold text-rose-400">{targets.fatsGrams}g</span> ({targets.fatsKcal} kcal)</div>
          <div>Fibre consigliate: <span className="font-bold text-teal-400">{targets.fiberGramsMin}g</span></div>
        </div>

      </div>

      {/* Pulsante di salvataggio a fondo pagina */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Salva Profilo & Genera Nuovo Piano Alimentare</span>
        </button>
      </div>

    </form>
  );
};
