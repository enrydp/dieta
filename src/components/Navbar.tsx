import React from 'react';
import { UserProfile } from '../types/diet';
import { CuteAvatar } from './CuteAvatar';
import { Utensils, CalendarDays, ShoppingBag, User, BookOpen, Printer, RefreshCw } from 'lucide-react';

export type NavTab = 'day' | 'week' | 'grocery' | 'profile' | 'pathologies';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onPrintClick: () => void;
  onRegenerateClick: () => void;
  activePathologyCount: number;
  profile: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onPrintClick,
  onRegenerateClick,
  activePathologyCount,
  profile
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Logo & Brand con dicitura : By Barone soft */}
            <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => onSelectTab('day')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">NutriPlan</span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300/80 px-2 py-0.5 rounded-lg shadow-2xs whitespace-nowrap">
                    : By Barone soft
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Piani alimentari intelligenti & clinici</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => onSelectTab('day')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'day'
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Oggi</span>
              </button>

              <button
                onClick={() => onSelectTab('week')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'week'
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Settimana</span>
              </button>

              <button
                onClick={() => onSelectTab('grocery')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'grocery'
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lista Spesa</span>
              </button>

              <button
                onClick={() => onSelectTab('profile')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'profile'
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profilo & Macro</span>
              </button>

              <button
                onClick={() => onSelectTab('pathologies')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  currentTab === 'pathologies'
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Guida Clinica</span>
                {activePathologyCount > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {activePathologyCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Avatar Utente con Nome & Azioni Rapide */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Avatar e Nome Visibile in Alto da Ogni Schermata */}
              <div
                onClick={() => onSelectTab('profile')}
                className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-emerald-50/80 border-2 border-slate-200/90 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                title="Visualizza e modifica il tuo profilo e avatar"
              >
                <CuteAvatar
                  gender={profile.gender}
                  avatarStyle={profile.avatarStyle}
                  name={profile.name}
                  size="md"
                  showBadge={true}
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 leading-tight max-w-[95px] sm:max-w-[140px] truncate">
                    {profile.name && profile.name.trim() ? profile.name : 'Profilo'}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {profile.isConfigured ? `${profile.weightKg || '--'} kg` : 'Configura'}
                  </span>
                </div>
              </div>

              {/* Azioni rapide */}
              <button
                onClick={onRegenerateClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Rigenera il piano alimentare con nuove combinazioni"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Rigenera</span>
              </button>

              <button
                onClick={onPrintClick}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                title="Stampa o Salva PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stampa / PDF</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Accessible & Ergonomic for thumbs) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg no-print">
        <div className="flex items-center justify-around">
          
          <button
            onClick={() => onSelectTab('day')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'day' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Oggi</span>
          </button>

          <button
            onClick={() => onSelectTab('week')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'week' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Settimana</span>
          </button>

          <button
            onClick={() => onSelectTab('grocery')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'grocery' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Spesa</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'profile' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Profilo</span>
          </button>

          <button
            onClick={() => onSelectTab('pathologies')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer relative ${
              currentTab === 'pathologies' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <BookOpen className="w-5 h-5" />
              {activePathologyCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activePathologyCount}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5">Patologie</span>
          </button>

        </div>
      </div>
    </>
  );
};
