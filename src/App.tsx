import { useState, useEffect, useMemo } from 'react';
import { MOCK_DESIGNS } from './data/mockDesigns';
import type { DesignItem, FilterState } from './types/design';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { BentoGrid } from './components/BentoGrid';
import { DetailModal } from './components/DetailModal';
import { CommandMenu } from './components/CommandMenu';
import { Toast } from './components/Toast';
import { IntroScreen } from './components/IntroScreen';
import { Sparkles, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [showIntro, setShowIntro] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    techStack: 'All',
    visualStyle: 'All',
    sortBy: 'trending',
    viewMode: 'grid',
    savedOnly: false,
  });

  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('save_design_bookmarks');
      return stored ? new Set(JSON.parse(stored)) : new Set(['kinetic-studio', 'vortex-engine']);
    } catch {
      return new Set(['kinetic-studio', 'vortex-engine']);
    }
  });

  const [selectedItem, setSelectedItem] = useState<DesignItem | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('save_design_bookmarks', JSON.stringify(Array.from(savedIds)));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [savedIds]);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (showIntro) {
          setShowIntro(false);
        }
        setIsCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved designs');
      } else {
        next.add(id);
        showToast('Saved to collection!');
      }
      return next;
    });
  };

  // Filter & Sort designs
  const filteredDesigns = useMemo(() => {
    return MOCK_DESIGNS.filter((item) => {
      // Saved filter check
      if (filters.savedOnly && !savedIds.has(item.id)) return false;

      // Category check
      if (filters.category !== 'All' && item.category !== filters.category) return false;

      // Tech Stack check
      if (filters.techStack !== 'All' && !item.techStack.includes(filters.techStack)) return false;

      // Visual Style check
      if (filters.visualStyle !== 'All' && item.visualStyle !== filters.visualStyle) return false;

      // Search Query check
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSub = item.subtitle.toLowerCase().includes(q);
        const matchesTech = item.techStack.some((t) => t.toLowerCase().includes(q));
        const matchesDomain = item.domain.toLowerCase().includes(q);
        return matchesTitle || matchesSub || matchesTech || matchesDomain;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else if (filters.sortBy === 'saved') {
        return (savedIds.has(b.id) ? 1 : 0) - (savedIds.has(a.id) ? 1 : 0);
      }
      return b.likes - a.likes; // default trending
    });
  }, [filters, savedIds]);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <IntroScreen
              onEnterCatalog={() => setShowIntro(false)}
              onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col"
          >
            {/* Floating Header */}
            <Navbar
              filters={filters}
              setFilters={setFilters}
              savedCount={savedIds.size}
              onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
              onShowIntro={() => setShowIntro(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1">
              <Hero
                filters={filters}
                setFilters={setFilters}
              />

              <FilterBar
                filters={filters}
                setFilters={setFilters}
                totalCount={MOCK_DESIGNS.length}
                filteredCount={filteredDesigns.length}
              />

              <BentoGrid
                items={filteredDesigns}
                savedIds={savedIds}
                onToggleSave={toggleSave}
                onSelect={(item) => setSelectedItem(item)}
                filters={filters}
                onResetFilters={() =>
                  setFilters({
                    searchQuery: '',
                    category: 'All',
                    techStack: 'All',
                    visualStyle: 'All',
                    sortBy: 'trending',
                    viewMode: filters.viewMode,
                    savedOnly: false,
                  })
                }
              />
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-900 bg-[#09090B] py-12 px-4 text-xs font-mono text-zinc-500">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-extrabold text-white text-base">
                    STACK<span className="text-emerald-400">SIGHT</span>
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span>Web Stack & Color Palette Inspector Engine</span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    60fps GSAP Motion
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    Tailwind CSS v4 & Vite Engine
                  </span>
                </div>

                <p className="text-zinc-600 text-center md:text-right">
                  STACKSIGHT · Inspect, Extract & Bookmark Elite Web Design
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Inspection Side Drawer */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isSaved={selectedItem ? savedIds.has(selectedItem.id) : false}
        onToggleSave={toggleSave}
        onShowToast={showToast}
      />

      {/* Cmd+K Command Menu */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        items={MOCK_DESIGNS}
        onSelectItem={(item) => {
          if (showIntro) setShowIntro(false);
          setSelectedItem(item);
        }}
        setFilters={setFilters}
      />

      {/* Floating Notification Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
