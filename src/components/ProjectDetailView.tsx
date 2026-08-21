import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onOpenContact: () => void;
  onLaunchDemo?: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onOpenContact,
  onLaunchDemo,
}) => {
  // Scroll to top when loaded
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-[#0a0b0d] text-white"
    >
      {/* Sub-header / Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-4">
        <motion.button
          id="project-back-btn"
          onClick={onBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-widest text-neutral-400 hover:text-white uppercase transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SELECTED WORK</span>
        </motion.button>
      </div>

      {/* Project Title Hero */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Huge Title */}
          <h1 className="font-extended text-3xl sm:text-5xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.9] mb-8">
            {project.title.includes('POS') ? (
              <>
                <span className="block">FLUTTER POS</span>
                <span className="block">SYSTEM</span>
              </>
            ) : (
              project.title
            )}
          </h1>

          {/* Metadata Specs Bar */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-8 sm:gap-x-12 pt-2 pb-6 border-b border-neutral-800 font-mono-tech text-xs tracking-wider text-neutral-400 uppercase">
            <div>
              <span className="text-neutral-500 mr-2">CATEGORY:</span>
              <span className="text-neutral-200">{project.category}</span>
            </div>
            <div>
              <span className="text-neutral-500 mr-2">TECH:</span>
              <span className="text-neutral-200">{project.tech.join(', ')}</span>
            </div>
            <div>
              <span className="text-neutral-500 mr-2">ROLE:</span>
              <span className="text-neutral-200">{project.role}</span>
            </div>
            <div>
              <span className="text-neutral-500 mr-2">YEAR:</span>
              <span className="text-neutral-200">{project.year}</span>
            </div>

            {project.liveDemoAvailable && onLaunchDemo && (
              <div className="ml-auto">
                <motion.button
                  id="launch-interactive-prototype-btn"
                  onClick={onLaunchDemo}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded border border-emerald-500/40 transition-all text-xs font-mono-tech uppercase shadow-lg shadow-emerald-500/10"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>TRY INTERACTIVE PROTOTYPE</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Large Hero Showcase Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden bg-neutral-950 border border-neutral-800 w-fit mx-auto my-12 group shadow-2xl p-2 rounded-lg"
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-auto max-w-full h-auto block object-contain transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Section 01: OVERVIEW */}
      {project.overview && (
        <div className="border-t border-neutral-850 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              <div className="lg:col-span-3">
                <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
                  01 / OVERVIEW
                </span>
              </div>

              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-extended text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-5">
                    THE PROBLEM
                  </h2>
                  <p className="text-neutral-300 text-base leading-relaxed font-normal">
                    {project.overview.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="font-extended text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-5">
                    THE SOLUTION
                  </h2>
                  <p className="text-neutral-300 text-base leading-relaxed font-normal">
                    {project.overview.solution}
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Section 02: TECHNICAL DIVE */}
      {project.technicalDive && project.technicalDive.length > 0 && (
        <div className="border-t border-neutral-850 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              <div className="lg:col-span-3">
                <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
                  02 / TECHNICAL DIVE
                </span>
              </div>

              <div className="lg:col-span-9 space-y-14">
                {project.technicalDive.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 border-b border-neutral-900 last:border-0"
                  >
                    <div className="max-w-xl">
                      <h3 className="font-extended text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-neutral-300 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="self-start">
                      <span className="inline-block px-3 py-1 border border-neutral-700 text-neutral-300 font-mono-tech text-xs tracking-widest uppercase rounded">
                        {item.tag}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Section 03: GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="border-t border-neutral-850 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
              <div className="lg:col-span-3">
                <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
                  03 / GALLERY
                </span>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {project.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col space-y-4 group"
                >
                  <div className="relative overflow-hidden bg-neutral-950 border border-neutral-800 w-full p-2 rounded-lg">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-auto block object-contain transition-all duration-500"
                    />
                  </div>

                  <div className="pt-2">
                    <h4 className="font-mono-tech text-xs tracking-widest text-white uppercase font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Call To Action Banner: LET'S BUILD SOMETHING */}
      <section className="border-t border-neutral-800 py-28 md:py-36 bg-[#08090a] text-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-extended text-3xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.9] mb-10 select-none">
              <span className="block">LET'S BUILD</span>
              <span className="block">SOMETHING</span>
            </h2>

            <motion.button
              id="cta-start-conversation-btn"
              onClick={onOpenContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-8 py-4 bg-white text-black font-mono-tech text-xs font-semibold tracking-widest uppercase transition-colors shadow-lg hover:bg-neutral-200"
            >
              START A CONVERSATION
            </motion.button>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

