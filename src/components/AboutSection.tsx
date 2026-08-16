import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, PILLARS } from '../data/portfolioData';
import { Layers, Cpu, Database, Monitor } from 'lucide-react';

interface AboutSectionProps {
  onSelectPillar: (pillarId: string) => void;
  selectedPillar: string | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onSelectPillar,
  selectedPillar,
}) => {
  const activePillarObj = PILLARS.find((p) => p.id === selectedPillar);

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'mobile':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'web':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'desktop':
        return <Monitor className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="about" className="w-full py-20 md:py-28 border-b border-[#22252a]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column Section Number & Tag */}
          <div className="lg:col-span-3">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase sticky top-28 block"
            >
              01 . ABOUT
            </motion.span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Main Headline */}
              <h2 className="font-extended text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white dark:text-white leading-tight">
                {PERSONAL_INFO.tagline}
              </h2>

              {/* Bio description */}
              <p className="text-neutral-300 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                {PERSONAL_INFO.bio}
              </p>

              {/* Subtle Horizontal Divider */}
              <div className="w-full h-px bg-neutral-800 my-10" />

              {/* 4 Architectural Pillars Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
                  ARCHITECTURAL PILLARS (CLICK TO FILTER WORK)
                </span>
                {selectedPillar && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => onSelectPillar('')}
                    className="font-mono-tech text-xs text-neutral-400 hover:text-white underline uppercase"
                  >
                    RESET FILTER
                  </motion.button>
                )}
              </div>

              {/* 4 Architectural Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {PILLARS.map((pillar, idx) => {
                  const isSelected = selectedPillar === pillar.id;
                  return (
                    <motion.button
                      key={pillar.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectPillar(isSelected ? '' : pillar.id)}
                      className={`relative text-left p-4 border transition-all duration-300 flex flex-col justify-between h-full ${
                        isSelected
                          ? 'bg-neutral-850 border-white text-white shadow-xl shadow-white/5'
                          : 'bg-neutral-900/40 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activePillarOutline"
                          className="absolute inset-0 border-2 border-white pointer-events-none"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono-tech text-xs tracking-widest text-neutral-500 block">
                            {pillar.number} /
                          </span>
                          {getPillarIcon(pillar.id)}
                        </div>
                        <h3 className="font-extended text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-400 mt-3 line-clamp-2">
                        {pillar.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Pillar Expanded Info Box */}
              <AnimatePresence>
                {activePillarObj && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="p-5 bg-neutral-900 border border-neutral-700 rounded-none overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono-tech text-xs text-emerald-400 uppercase tracking-wider block mb-1">
                          ACTIVE FILTER: {activePillarObj.number} - {activePillarObj.title}
                        </span>
                        <p className="text-sm text-neutral-200">
                          Showing selected engineering projects built with {activePillarObj.title} architecture below.
                        </p>
                      </div>
                      <button
                        onClick={() => onSelectPillar('')}
                        className="font-mono-tech text-xs px-3 py-1 bg-neutral-800 text-neutral-300 hover:text-white uppercase"
                      >
                        VIEW ALL
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

