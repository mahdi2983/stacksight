import React from 'react';
import type { Category, FilterState, TechStack, VisualStyle } from '../types/design';
import { Code, Palette, ArrowUpDown } from 'lucide-react';


interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  filteredCount: number;
}

const CATEGORIES: Category[] = ['All', 'SaaS', 'Portfolio', 'E-Commerce', 'Agency', 'Editorial', 'AI / Tech', 'Mobile App'];
const TECH_STACKS: (TechStack | 'All')[] = ['All', 'Next.js', 'GSAP', 'Tailwind CSS', 'WebGL', 'Three.js', 'React', 'Framer Motion', 'TypeScript'];
const VISUAL_STYLES: (VisualStyle | 'All')[] = ['All', 'Dark Tech', 'Minimalist', 'Glassmorphism', 'Industrial Brutalism', '3D / Interactive', 'Editorial Luxury'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalCount,
  filteredCount,
}) => {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.techStack !== 'All' ||
    filters.visualStyle !== 'All' ||
    filters.searchQuery !== '' ||
    filters.savedOnly;

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      techStack: 'All',
      visualStyle: 'All',
      sortBy: 'trending',
      viewMode: filters.viewMode,
      savedOnly: false,
    });
  };

  return (
    <div className="sticky top-20 z-30 w-full bg-[#09090B]/90 backdrop-blur-md border-y border-zinc-800/80 py-3.5 px-4 mb-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat && !filters.savedOnly;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: cat,
                      savedOnly: false,
                    }))
                  }
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-zinc-300">
            {/* Tech Stack Select */}
            <div className="relative flex items-center">
              <Code className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.techStack}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    techStack: e.target.value as TechStack | 'All',
                  }))
                }
                className="pl-8 pr-7 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer outline-none appearance-none font-mono text-xs transition-colors"
              >
                <option value="All">Tech: All</option>
                {TECH_STACKS.filter((t) => t !== 'All').map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Style Select */}
            <div className="relative flex items-center">
              <Palette className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.visualStyle}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    visualStyle: e.target.value as VisualStyle | 'All',
                  }))
                }
                className="pl-8 pr-7 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer outline-none appearance-none font-mono text-xs transition-colors"
              >
                <option value="All">Style: All</option>
                {VISUAL_STYLES.filter((s) => s !== 'All').map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as 'trending' | 'latest' | 'saved',
                  }))
                }
                className="pl-8 pr-7 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer outline-none appearance-none font-mono text-xs transition-colors"
              >
                <option value="trending">Sort: Trending</option>
                <option value="latest">Sort: Latest</option>
                <option value="saved">Sort: Saved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Count Bar & Reset */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-900 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">
            Showing <strong className="text-emerald-400 font-bold">{filteredCount}</strong> of {totalCount} designs
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-zinc-400 hover:text-emerald-400 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              Reset active filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
