import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Layers, Cpu, Database, Monitor } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const getIcon = (id: string) => {
    switch (id) {
      case 'web-stack':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'mobile-stack':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'data-stack':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'desktop-stack':
        return <Monitor className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-neutral-300" />;
    }
  };

  const filteredCategories = selectedCat === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCat);

  const getSkillWidth = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return '95%';
      case 'advanced':
        return '85%';
      case 'proficient':
        return '75%';
      case 'intermediate':
        return '65%';
      default:
        return '70%';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0e0f13] border border-neutral-800 shadow-2xl p-6 sm:p-10 text-white z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Close button */}
            <motion.button
              id="close-skills-modal-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close Skills Dialog"
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Header */}
            <div className="mb-8">
              <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase block mb-2">
                TECHNICAL CAPABILITIES
              </span>
              <h2 className="font-extended text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                CORE COMPETENCIES
              </h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-xl">
                Engineered across cross-platform mobile frameworks, full-stack web architectures, and statistical data pipelines.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCat('all')}
                className={`relative px-4 py-2 font-mono-tech text-xs uppercase tracking-wider transition-colors border ${
                  selectedCat === 'all'
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                ALL ARCHITECTURES
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`relative px-4 py-2 font-mono-tech text-xs uppercase tracking-wider transition-colors border ${
                    selectedCat === cat.id
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCategories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="p-6 bg-neutral-900/60 border border-neutral-800 space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      {getIcon(cat.id)}
                      <h3 className="font-extended text-base font-bold uppercase tracking-wider text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="font-mono-tech text-xs text-neutral-500">
                      {cat.number}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {cat.skills.map((skill, sIdx) => {
                      const width = getSkillWidth(skill.level);
                      return (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono-tech">
                            <span className="text-neutral-200">{skill.name}</span>
                            <span
                              className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                                skill.highlight
                                  ? 'bg-white/10 text-white font-semibold'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-850">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width }}
                              transition={{ duration: 0.8, delay: 0.1 + sIdx * 0.05, ease: 'easeOut' }}
                              className={`h-full ${
                                skill.highlight ? 'bg-white' : 'bg-neutral-500'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Engineering Tenets */}
            <div className="mt-8 p-6 bg-neutral-900/40 border border-neutral-800">
              <h4 className="font-mono-tech text-xs tracking-widest uppercase text-neutral-300 mb-3">
                ARCHITECTURAL PRINCIPLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero downtime with local offline-first SQLite cache replication.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Predictable unidirection reactive state streams with typed contracts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Sub-16ms render loop budget with hardware-accelerated animations.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

