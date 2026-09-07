import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, FitnessGoal, DietType, PathologyId, AllergyId } from '../types/diet';
import { PATHOLOGIES_DATA } from '../data/pathologies';
import { ALLERGIES_DATA } from '../data/allergies';
import { calculateBMI, calculateBodyFat, calculateMacroTargets } from '../utils/calculations';
import { User, Activity, HeartPulse, CheckCircle, Save, Sparkles, Scale, ShieldAlert, Plus, X } from 'lucide-react';
import { CuteAvatar } from './CuteAvatar';
import { DisclaimerBanner } from './DisclaimerBanner';

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
  const [customFoodInput, setCustomFoodInput] = useState('');

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

  const toggleAllergy = (allergyId: AllergyId) => {
    setProfile(prev => {
      const current = prev.allergies || [];
      const exists = current.includes(allergyId);
      const updated = exists
        ? current.filter(id => id !== allergyId)
        : [...current, allergyId];
      return { ...prev, allergies: updated };
    });
    setSavedSuccess(false);
  };

  const handleAddCustomExclusion = () => {
    const trimmed = customFoodInput.trim();
    if (!trimmed) return;
    setProfile(prev => {
      const current = prev.customExcludedFoods || [];
      if (current.some(item => item.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      return { ...prev, customExcludedFoods: [...current, trimmed] };
    });
    setCustomFoodInput('');
    setSavedSuccess(false);
  };

  const handleRemoveCustomExclusion = (foodName: string) => {
    setProfile(prev => ({
      ...prev,
      customExcludedFoods: (prev.customExcludedFoods || []).filter(item => item !== foodName)
    }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: profile.name.trim() || 'Utente',
      age: profile.age && profile.age > 0 ? profile.age : 30,
      heightCm: profile.heightCm && profile.heightCm > 0 ? profile.heightCm : 175,
      weightKg: profile.weightKg && profile.weightKg > 0 ? profile.weightKg : 70,
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
          <span>1. Misure Antropometriche & Avatar Personale</span>
        </h3>

        {/* Anteprima Avatar a Figura Intera Dinamico (calibrato su genere, peso, altezza ed età) */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-sky-50/70 rounded-3xl border-2 border-emerald-200/90 shadow-sm flex flex-col md:flex-row items-center gap-6">
          
          {/* Avatar a Figura Intera */}
          <div className="flex flex-col items-center shrink-0 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-emerald-200/60 shadow-xs">
            <CuteAvatar
              gender={profile.gender}
              weightKg={profile.weightKg}
              heightCm={profile.heightCm}
              age={profile.age}
              name={profile.name}
              size="full"
              mode="full"
              showBadge={true}
            />
            <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-wider">
              Figura Intera Cartoon
            </span>
          </div>

          {/* Dettagli dell'Avatar Generato Dinamicamente */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black tracking-wide border border-emerald-300/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>Avatar Intelligente Personalizzato</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {profile.name && profile.name.trim() ? profile.name : 'Il Tuo Avatar Personale'}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Questo personaggio a <strong>figura intera</strong> viene generato e proporzionato <strong>automaticamente</strong> in base alle tue caratteristiche fisiche. Cambiando sesso, peso, altezza o età qui sotto, l'illustrazione si aggiorna in tempo reale!
            </p>

            {/* Indicatori Dinamici */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Genere</div>
                <div className="text-xs font-black text-slate-800 mt-0.5">
                  {profile.gender === 'male' ? '👨 Uomo' : '👩 Donna'}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Corporatura</div>
                <div className="text-xs font-black text-emerald-700 mt-0.5">
                  {bmiCategory}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Fascia Età</div>
                <div className="text-xs font-black text-slate-800 mt-0.5">
                  {profile.age < 30 ? '⚡ Giovane' : profile.age > 55 ? '👓 Senior' : '🌟 Adulto'}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Misure</div>
                <div className="text-xs font-black text-slate-800 mt-0.5">
                  {profile.weightKg || '--'}kg • {profile.heightCm || '--'}cm
                </div>
              </div>
            </div>
          </div>

        </div>

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
              value={profile.age && profile.age > 0 ? profile.age : ''}
              onChange={(e) => {
                const val = e.target.value;
                handleFieldChange('age', val === '' ? 0 : Number(val));
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Altezza (cm)</label>
            <input
              type="number"
              min={100}
              max={230}
              placeholder="es. 175"
              value={profile.heightCm && profile.heightCm > 0 ? profile.heightCm : ''}
              onChange={(e) => {
                const val = e.target.value;
                handleFieldChange('heightCm', val === '' ? 0 : Number(val));
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Peso Corporeo (kg)</label>
            <input
              type="number"
              step={0.5}
              min={30}
              max={250}
              placeholder="es. 70"
              value={profile.weightKg && profile.weightKg > 0 ? profile.weightKg : ''}
              onChange={(e) => {
                const val = e.target.value;
                handleFieldChange('weightKg', val === '' ? 0 : Number(val));
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Vita (cm, opzionale)</label>
            <input
              type="number"
              placeholder="es. 82"
              value={profile.waistCm && profile.waistCm > 0 ? profile.waistCm : ''}
              onChange={(e) => {
                const val = e.target.value;
                handleFieldChange('waistCm', val === '' ? undefined : Number(val));
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Collo (cm, opzionale)</label>
            <input
              type="number"
              placeholder="es. 37"
              value={profile.neckCm && profile.neckCm > 0 ? profile.neckCm : ''}
              onChange={(e) => {
                const val = e.target.value;
                handleFieldChange('neckCm', val === '' ? undefined : Number(val));
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {profile.gender === 'female' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Circonferenza Fianchi (cm)</label>
              <input
                type="number"
                placeholder="es. 95"
                value={profile.hipCm && profile.hipCm > 0 ? profile.hipCm : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  handleFieldChange('hipCm', val === '' ? undefined : Number(val));
                }}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          )}

        </div>

        {/* Live BMI & Indicatori */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Indice Massa Corporea (BMI):</span>
            <span className="font-extrabold text-slate-900 text-base">{bmi > 0 ? bmi : '--'}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              bmi >= 18.5 && bmi < 25
                ? 'bg-emerald-100 text-emerald-800'
                : bmi > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
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

      {/* Box 3: Allergie, Intolleranze & Esclusioni Alimentari */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>3. Allergie, Intolleranze & Esclusioni Alimentari</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {(profile.allergies?.length || 0) + (profile.customExcludedFoods?.length || 0) > 0 ? (
              <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {(profile.allergies?.length || 0) + (profile.customExcludedFoods?.length || 0)} esclusioni attive
              </span>
            ) : (
              'Nessuna esclusione selezionata'
            )}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Seleziona le tue allergie o intolleranze diagnosticate. Gli alimenti contenenti questi allergeni verranno <strong>rigorosamente esclusi</strong> da tutti i pasti generati. Puoi anche aggiungere altri cibi che non gradisci o non puoi mangiare.
        </p>

        {/* Griglia Allergie Ufficiali */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {ALLERGIES_DATA.map(allergy => {
            const isSelected = profile.allergies && profile.allergies.includes(allergy.id);
            return (
              <div
                key={allergy.id}
                onClick={() => toggleAllergy(allergy.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30 shadow-xs scale-101'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-black text-slate-900 text-sm">{allergy.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      allergy.type === 'allergia' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {allergy.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed break-words whitespace-normal">
                    {allergy.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-slate-500">{allergy.badge}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-amber-600 text-white' : 'border border-slate-300 bg-white'
                  }`}>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sezione Alimenti Sgraditi / Esclusioni Personalizzate */}
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Altri alimenti specifici da escludere (non graditi o intolleranze personali)
          </label>
          <p className="text-[11px] text-slate-500 mb-2.5">
            Digita il nome di un alimento che non puoi o non vuoi mangiare (es. <em>funghi, peperoni, maiale, tonno</em>) e premi Aggiungi:
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="es. funghi, peperoni, maiale..."
              value={customFoodInput}
              onChange={(e) => setCustomFoodInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomExclusion();
                }
              }}
              className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <button
              type="button"
              onClick={handleAddCustomExclusion}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Aggiungi</span>
            </button>
          </div>

          {/* Chips degli alimenti esclusi */}
          {profile.customExcludedFoods && profile.customExcludedFoods.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.customExcludedFoods.map((food) => (
                <span
                  key={food}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-rose-800 text-xs font-bold rounded-xl border border-rose-200 shadow-2xs"
                >
                  <span>🚫 {food}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomExclusion(food)}
                    className="hover:bg-rose-100 text-rose-600 rounded-full p-0.5 transition-colors cursor-pointer"
                    title="Rimuovi esclusione"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 italic">Nessun alimento specifico escluso manualmente.</span>
          )}
        </div>

      </div>

      {/* Box 4: Patologie & Condizioni Cliniche */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <span>4. Patologie & Condizioni Clinico-Nutrizionali</span>
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
                  <p className="text-xs text-slate-600 leading-relaxed break-words whitespace-normal">
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

      {/* Avvertenze e Disclaimer Medico spostato nella pagina del profilo */}
      <div className="rounded-2xl overflow-hidden shadow-xs border border-amber-200">
        <DisclaimerBanner />
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
