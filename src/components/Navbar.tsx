import React from 'react';
import { Utensils, CalendarDays, ShoppingBag, User, BookOpen, Printer, RefreshCw } from 'lucide-react';

export type NavTab = 'day' | 'week' | 'grocery' | 'profile' | 'pathologies';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onPrintClick: () => void;
  onRegenerateClick: () => void;
  activePathologyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onPrintClick,
  onRegenerateClick,
  activePathologyCount
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('day')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">NutriPlan</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Piani alimentari scientifici e personalizzati</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => onSelectTab('day')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'day'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Oggi</span>
              </button>

              <button
                onClick={() => onSelectTab('week')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'week'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Settimana</span>
              </button>

              <button
                onClick={() => onSelectTab('grocery')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'grocery'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lista Spesa</span>
              </button>

              <button
                onClick={() => onSelectTab('profile')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'profile'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profilo & Macro</span>
              </button>

              <button
                onClick={() => onSelectTab('pathologies')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  currentTab === 'pathologies'
                    ? 'bg-emerald-50 text-emerald-700'
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

            {/* Quick Actions (Desktop & Mobile) */}
            <div className="flex items-center gap-2">
              <button
                onClick={onRegenerateClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Rigenera il piano alimentare con nuove combinazioni"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Rigenera</span>
              </button>

              <button
                onClick={onPrintClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Stampa / PDF</span>
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
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentTab === 'day' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Oggi</span>
          </button>

          <button
            onClick={() => onSelectTab('week')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentTab === 'week' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Settimana</span>
          </button>

          <button
            onClick={() => onSelectTab('grocery')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentTab === 'grocery' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Spesa</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentTab === 'profile' ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Profilo</span>
          </button>

          <button
            onClick={() => onSelectTab('pathologies')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors relative ${
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
