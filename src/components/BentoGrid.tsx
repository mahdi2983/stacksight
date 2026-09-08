import React from 'react';
import type { DesignItem, FilterState } from '../types/design';
import { CardItem } from './CardItem';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BentoGridProps {
  items: DesignItem[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onSelect: (item: DesignItem) => void;
  filters: FilterState;
  onResetFilters: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  items,
  savedIds,
  onToggleSave,
  onSelect,
  filters,
  onResetFilters,
}) => {
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="font-heading font-bold text-xl text-white mb-2">No Matching Designs Found</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          We couldn't find any designs matching your active search query or tech stack filter.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      </div>
    );
  }

  if (filters.viewMode === 'list') {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <CardItem
                item={item}
                isSaved={savedIds.has(item.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelect}
                viewMode="list"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px]"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const isWide = item.layoutSpan === 'wide';
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`${isWide ? 'lg:col-span-2' : 'col-span-1'}`}
              >
                <CardItem
                  item={item}
                  isSaved={savedIds.has(item.id)}
                  onToggleSave={onToggleSave}
                  onSelect={onSelect}
                  viewMode="grid"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
