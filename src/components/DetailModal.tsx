import React, { useState } from 'react';
import type { DesignItem } from '../types/design';
import { X, ExternalLink, Bookmark, Copy, Check, Sparkles, Cpu, BarChart3, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailModalProps {
  item: DesignItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onShowToast: (message: string) => void;
}

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23121215'/%3E%3Ccircle cx='400' cy='250' r='100' fill='%2310b981' opacity='0.15'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fafafa' font-family='sans-serif' font-size='20' font-weight='bold'%3ESTACKSIGHT PREVIEW%3C/text%3E%3C/svg%3E";

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2327272a'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23fafafa' font-family='sans-serif' font-size='32' font-weight='bold'%3EU%3C/text%3E%3C/svg%3E";

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleSave,
  onShowToast,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!item) return null;

  const activeImage = selectedImage || item.thumbnail;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMG;
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_AVATAR;
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onShowToast(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}?design=${item.id}`;
    navigator.clipboard.writeText(url);
    onShowToast('Share link copied to clipboard!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Sliding Side Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-3xl h-full bg-[#09090B] border-l border-zinc-800 shadow-2xl flex flex-col z-10 overflow-y-auto"
        >
          {/* Drawer Header */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                {item.category}
              </span>
              <h2 className="font-heading font-bold text-xl text-white line-clamp-1">{item.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8 flex-1">
            {/* Main Showcase Image Preview */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl group">
                <img
                  src={activeImage}
                  alt={item.title}
                  onError={handleImgError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {item.gallery && item.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {item.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer flex-shrink-0 ${
                        activeImage === img
                          ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx}`}
                        onError={handleImgError}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center gap-3">
                <img
                  src={item.author.avatar}
                  alt={item.author.name}
                  onError={handleAvatarError}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">{item.author.name}</h4>
                  <span className="text-zinc-400 font-mono text-xs">{item.author.handle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onToggleSave(item.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSaved
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-400' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={copyShareLink}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                  title="Share Design"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <a
                  href={item.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Extracted Color Palette Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Extracted Color Palette
                </h3>
                <span className="text-zinc-500 text-xs font-mono">Click swatch to copy hex</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {item.colorPalette.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => copyToClipboard(col.hex)}
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-left transition-all group cursor-pointer flex flex-col justify-between h-24 relative overflow-hidden"
                  >
                    <div
                      style={{ backgroundColor: col.hex }}
                      className="w-full h-8 rounded-md border border-white/10 shadow-inner mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {col.hex}
                        </span>
                        <span className="block text-[10px] text-zinc-400 font-sans">{col.name}</span>
                      </div>
                      {copiedHex === col.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Breakdown Section */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" /> Technical Architecture & Stack
              </h3>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {item.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800 flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {tech}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-lg bg-zinc-900/50 text-zinc-400 border border-zinc-800/50">
                  Style: {item.visualStyle}
                </span>
              </div>
            </div>

            {/* Performance & Engineering Metrics */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Performance Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                {item.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <span className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                      {m.label}
                    </span>
                    <span className="block text-base font-bold text-white">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Overview */}
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-base text-white">About the Project</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
