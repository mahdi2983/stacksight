import React from 'react';
import { Bookmark, Command, Grid, List, Cpu, Sparkles } from 'lucide-react';
import type { FilterState } from '../types/design';

interface NavbarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  savedCount: number;
  onOpenCommandMenu: () => void;
  onShowIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  filters,
  setFilters,
  savedCount,
  onOpenCommandMenu,
  onShowIntro,
}) => {
  const toggleViewMode = (mode: 'grid' | 'list') => {
    setFilters((prev) => ({ ...prev, viewMode: mode }));
  };

  const toggleSavedOnly = () => {
    setFilters((prev) => ({ ...prev, savedOnly: !prev.savedOnly }));
  };

  return (
    <header className="sticky top-4 z-40 w-full max-w-7xl mx-auto px-4">
      <nav className="glass-nav rounded-full px-4 sm:px-6 py-3 border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setFilters((prev) => ({ ...prev, savedOnly: false, category: 'All', searchQuery: '', techStack: 'All', visualStyle: 'All' }));
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/60 transition-colors shadow-inner">
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-0.5">
              STACK<span className="text-emerald-400">SIGHT</span>
            </span>
          </a>

          <button
            onClick={onShowIntro}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Replay Intro Screen"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" /> Intro
          </button>
        </div>

        {/* Quick Search & Command Palette Trigger */}
        <button
          onClick={onOpenCommandMenu}
          className="flex-1 max-w-md hidden sm:flex items-center justify-between px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all text-xs font-mono group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Command className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            <span>Search stack, site name, technology...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-300">
            ⌘K
          </kbd>
        </button>

        {/* Action Controls & View Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Cmd+K Button */}
          <button
            onClick={onOpenCommandMenu}
            className="sm:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            title="Search (Cmd+K)"
          >
            <Command className="w-4 h-4" />
          </button>

          {/* Saved Items Toggle Badge */}
          <button
            onClick={toggleSavedOnly}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filters.savedOnly
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${filters.savedOnly ? 'fill-emerald-400 text-emerald-400' : 'text-zinc-400'}`} />
            <span className="hidden xs:inline font-mono">Saved</span>
            <span className="w-4 h-4 rounded-full bg-zinc-800 font-mono text-[10px] flex items-center justify-center text-zinc-300">
              {savedCount}
            </span>
          </button>

          {/* Grid / List Switcher */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-full border border-zinc-800">
            <button
              onClick={() => toggleViewMode('grid')}
              className={`p-1.5 rounded-full transition-all ${
                filters.viewMode === 'grid'
                  ? 'bg-zinc-800 text-emerald-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleViewMode('list')}
              className={`p-1.5 rounded-full transition-all ${
                filters.viewMode === 'list'
                  ? 'bg-zinc-800 text-emerald-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
