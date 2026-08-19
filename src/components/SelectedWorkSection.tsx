import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS, PILLARS } from '../data/portfolioData';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
  selectedPillar: string | null;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onSelectProject,
  selectedPillar,
}) => {
  const [filterPillar, setFilterPillar] = React.useState<string | null>(selectedPillar);

  React.useEffect(() => {
    setFilterPillar(selectedPillar);
  }, [selectedPillar]);

  const filteredProjects = filterPillar
    ? PROJECTS.filter(
        (p) =>
          p.pillar.toLowerCase().includes(filterPillar.toLowerCase()) ||
          p.category.toLowerCase().includes(filterPillar.toLowerCase())
      )
    : PROJECTS;

  return (
    <section id="work" className="w-full py-20 md:py-28 border-b border-[#22252a]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header & Interactive Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase block mb-3">
              02 . FEATURED CASE STUDIES
            </span>
            <h2 className="font-extended text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white dark:text-white leading-[0.9]">
              <span className="block">SELECTED</span>
              <span className="block">WORK</span>
            </h2>
          </motion.div>

          {/* Interactive Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              onClick={() => setFilterPillar(null)}
              className={`relative px-3.5 py-1.5 font-mono-tech text-xs uppercase tracking-wider transition-colors border ${
                filterPillar === null
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              ALL WORK ({PROJECTS.length})
            </button>

            {PILLARS.map((pillar) => {
              const isCatActive = filterPillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setFilterPillar(isCatActive ? null : pillar.id)}
                  className={`relative px-3.5 py-1.5 font-mono-tech text-xs uppercase tracking-wider transition-colors border ${
                    isCatActive
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {pillar.title.split(' ')[0]}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Project Grid with Framer Motion Layout animations */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx % 3 === 0;
              const colSpanClass = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';
              const aspectClass = isLarge ? 'aspect-[16/10]' : 'aspect-square';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  onClick={() => onSelectProject(project)}
                  className={`${colSpanClass} flex flex-col group cursor-pointer border border-neutral-800/80 bg-neutral-950 p-3 sm:p-4 hover:border-neutral-600 transition-colors duration-300 shadow-xl`}
                >
                  {/* Card Image Container */}
                  <div className={`relative overflow-hidden bg-neutral-950 border border-neutral-800 ${aspectClass} w-full flex items-center justify-center p-1.5`}>
                    <motion.img
                      src={project.image}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Tag badge overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 font-mono-tech text-[10px] text-neutral-300 uppercase tracking-widest">
                      {project.category}
                    </div>

                    {project.liveDemoAvailable && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 font-mono-tech text-[10px] text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Interactive Prototype</span>
                      </div>
                    )}
                  </div>

                  {/* Card Info & Hover Arrow */}
                  <div className="pt-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-extended text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-200 transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      <p className="font-mono-tech text-xs text-neutral-400 tracking-wider mt-1">
                        {project.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono-tech text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="p-2 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-white group-hover:bg-white/10 transition-all duration-200 shrink-0 ml-2"
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

