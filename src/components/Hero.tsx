import React, { useEffect, useRef } from 'react';
import { Search, Sparkles, X, Code2, Palette, Bookmark } from 'lucide-react';
import type { FilterState } from '../types/design';
import { gsap } from 'gsap';

interface HeroProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const POPULAR_TECH: { label: string; filter: () => void }[] = [
  { label: 'Next.js', filter: () => {} },
  { label: 'GSAP', filter: () => {} },
  { label: 'WebGL', filter: () => {} },
  { label: 'Tailwind CSS', filter: () => {} },
];

export const Hero: React.FC<HeroProps> = ({ filters, setFilters }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTechClick = (label: string) => {
    setFilters((prev) => ({ ...prev, techStack: label as any }));
  };

  return (
    <section ref={containerRef} className="relative pt-12 pb-10 px-4 max-w-5xl mx-auto text-center">
      {/* Soft Ambient Radial Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Clear Eyebrow Badge */}
      <div className="hero-item inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        INSPECT · EXTRACT · BOOKMARK
      </div>

      {/* Crystal Clear 2-Line Headline */}
      <h1 className="hero-item font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.05] max-w-4xl mx-auto mb-6">
        See What Elite Websites Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-emerald-400">Built With.</span>
      </h1>

      {/* Direct Purpose Explanation */}
      <p className="hero-item text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
        Inspect production tech stacks, extract hex color palettes in one click, and save award-winning UI design inspirations.
      </p>

      {/* 3 Core Action Steps (Decluttered Visual Indicator) */}
      <div className="hero-item grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10 text-left font-mono text-xs">
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-bold text-white text-xs">1. Inspect Stack</span>
            <span className="block text-[11px] text-zinc-400 font-sans">Frameworks & GLSL</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20 flex-shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-bold text-white text-xs">2. Extract Hex</span>
            <span className="block text-[11px] text-zinc-400 font-sans">1-click color palette</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 flex-shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-bold text-white text-xs">3. Save Curation</span>
            <span className="block text-[11px] text-zinc-400 font-sans">Personal collection</span>
          </div>
        </div>
      </div>

      {/* Clean Dynamic Search Input Bar */}
      <div className="hero-item max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center group">
          <Search className="absolute left-4 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search by technology (GSAP, WebGL), site name, or style..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 text-white placeholder-zinc-500 text-sm font-sans outline-none transition-all shadow-xl"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-4 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Clean Popular Tech Pills */}
      <div className="hero-item flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400">
        <span className="text-zinc-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" /> Filter:
        </span>
        {POPULAR_TECH.map((t) => (
          <button
            key={t.label}
            onClick={() => handleTechClick(t.label)}
            className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
};
