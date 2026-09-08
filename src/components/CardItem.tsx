import React from 'react';
import type { DesignItem } from '../types/design';
import { Bookmark, Eye, Code2 } from 'lucide-react';

interface CardItemProps {
  item: DesignItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (item: DesignItem) => void;
  viewMode: 'grid' | 'list';
}

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23121215'/%3E%3Ccircle cx='400' cy='250' r='100' fill='%2310b981' opacity='0.15'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fafafa' font-family='sans-serif' font-size='20' font-weight='bold'%3ESTACKSIGHT PREVIEW%3C/text%3E%3C/svg%3E";

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2327272a'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23fafafa' font-family='sans-serif' font-size='32' font-weight='bold'%3EU%3C/text%3E%3C/svg%3E";

export const CardItem: React.FC<CardItemProps> = ({
  item,
  isSaved,
  onToggleSave,
  onSelect,
  viewMode,
}) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMG;
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_AVATAR;
  };

  if (viewMode === 'list') {
    return (
      <div className="bezel-outer w-full mb-3">
        <div className="bezel-inner p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors">
          {/* Left Thumbnail & Info */}
          <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onSelect(item)}>
            <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0 relative group/img">
              <img
                src={item.thumbnail}
                alt={item.title}
                onError={handleImgError}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-white text-base truncate group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  {item.category}
                </span>
              </div>
              <p className="text-zinc-400 text-xs truncate max-w-md">{item.subtitle}</p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
            {item.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                {tech}
              </span>
            ))}
            {item.techStack.length > 3 && (
              <span className="text-zinc-500">+{item.techStack.length - 3}</span>
            )}
          </div>

          {/* Color Palette Swatches */}
          <div className="hidden lg:flex items-center gap-1">
            {item.colorPalette.map((col) => (
              <span
                key={col.hex}
                style={{ backgroundColor: col.hex }}
                className="w-3.5 h-3.5 rounded-full border border-white/10"
                title={`${col.name}: ${col.hex}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onToggleSave(item.id)}
              className={`p-2 rounded-full border transition-all ${
                isSaved
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Design'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400' : ''}`} />
            </button>
            <button
              onClick={() => onSelect(item)}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bezel-outer h-full flex flex-col group cursor-pointer">
      <div className="bezel-inner flex-1 flex flex-col">
        {/* Visual Preview Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800/80 group/preview">
          <img
            src={item.thumbnail}
            alt={item.title}
            onError={handleImgError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover/preview:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/75 backdrop-blur-md text-zinc-200 border border-white/10 shadow-lg pointer-events-auto">
              {item.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(item.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md border transition-all pointer-events-auto shadow-lg ${
                isSaved
                  ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-300 scale-105'
                  : 'bg-black/60 border-white/10 text-zinc-300 hover:text-white hover:bg-black/80'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Design'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            </button>
          </div>

          {/* Bottom Hover Action Overlay */}
          <div
            onClick={() => onSelect(item)}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4"
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Tech Stack</span>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center gap-1 shadow-lg transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300">
              <Eye className="w-3.5 h-3.5" /> Preview
            </span>
          </div>
        </div>

        {/* Card Body Info */}
        <div className="p-4 flex-1 flex flex-col justify-between gap-3" onClick={() => onSelect(item)}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <span className="text-zinc-500 text-xs font-mono">{item.domain}</span>
            </div>
            <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed mb-3">
              {item.subtitle}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2 text-xs">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={item.author.avatar}
                alt={item.author.name}
                onError={handleAvatarError}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-zinc-700"
              />
              <span className="text-zinc-400 font-mono text-[11px] hover:text-zinc-200">
                {item.author.handle}
              </span>
            </div>

            {/* Tech Badges */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {item.techStack.slice(0, 2).map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/80">
                  {tech}
                </span>
              ))}
              {item.techStack.length > 2 && (
                <span className="text-zinc-500 font-mono text-[10px]">+{item.techStack.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
