import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Command, Cpu } from 'lucide-react';

interface IntroScreenProps {
  onEnterCatalog: () => void;
  onOpenCommandMenu: () => void;
}

const letterAnimation = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
};

const containerAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnterCatalog,
  onOpenCommandMenu,
}) => {
  const title = "See Inside Elite Web Stacks";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#09090B] relative overflow-hidden w-full flex items-center justify-center select-none"
    >
      {/* SVG Glass Distortion Filter */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.004" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.25" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Dark OLED Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-zinc-950 to-[#09090B] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Dark Tech Wireframe Grid Lines Overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main Intro Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 max-w-4xl mx-auto py-12">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 px-4 py-1.5 rounded-full bg-zinc-900/90 text-zinc-300 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-xl border border-zinc-800 shadow-xl"
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>STACKSIGHT · WEB ARCHITECTURE INSPECTOR</span>
        </motion.div>

        {/* Animated Staggered Character Title */}
        <motion.h1
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          aria-label={title}
          className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white drop-shadow-2xl flex flex-wrap justify-center leading-[1.08] max-w-4xl"
        >
          {/* Letters are grouped per word so a line can only break between words, never inside one */}
          {title.split(' ').map((word, wordIndex, words) => (
            <React.Fragment key={wordIndex}>
              <span className="inline-flex whitespace-nowrap" aria-hidden="true">
                {word.split('').map((char, charIndex) => (
                  <motion.span key={charIndex} variants={letterAnimation}>
                    {char}
                  </motion.span>
                ))}
              </span>
              {wordIndex < words.length - 1 && <span className="w-3 sm:w-4" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base sm:text-xl text-zinc-400 font-sans leading-relaxed"
        >
          Uncover production tech stacks, extract hex color palettes in 1 click, and bookmark award-winning digital experiences.
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onEnterCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Explore Tech Stacks</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              onEnterCatalog();
              setTimeout(() => onOpenCommandMenu(), 200);
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-mono text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Command className="w-4 h-4 text-emerald-400" />
            <span>Search (⌘K)</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
