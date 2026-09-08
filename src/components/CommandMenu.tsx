import React, { useState, useEffect, useRef } from 'react';
import type { DesignItem, FilterState, TechStack } from '../types/design';
import { Search, X, ArrowRight, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: DesignItem[];
  onSelectItem: (item: DesignItem) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
  setFilters,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.visualStyle.toLowerCase().includes(q) ||
      item.techStack.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectItem(filteredItems[selectedIndex]);
        onClose();
      }
    }
  };

  const handleFilterClick = (tech: TechStack) => {
    setFilters((prev) => ({ ...prev, techStack: tech, savedOnly: false }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Command Menu Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#121215] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10"
          onKeyDown={handleKeyDown}
        >
          {/* Input Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search design title, tech stack (Next.js, GSAP)..."
              className="w-full bg-transparent text-white placeholder-zinc-500 font-sans text-sm outline-none"
            />
            <button onClick={onClose} className="p-1 rounded text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filters Row */}
          <div className="px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/60 flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-zinc-500 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-emerald-400" /> Filter:
            </span>
            {(['Next.js', 'GSAP', 'WebGL', 'Tailwind CSS', 'React'] as TechStack[]).map((tech) => (
              <button
                key={tech}
                onClick={() => handleFilterClick(tech)}
                className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                No matching results found for "{query}".
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-white'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-10 rounded-lg object-cover bg-zinc-950 border border-zinc-800 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm text-white truncate">
                            {item.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {isSelected && (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          Press Enter <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>STACKSIGHT Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
