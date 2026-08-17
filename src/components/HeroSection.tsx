import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onViewProjects: () => void;
  onContactMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewProjects,
  onContactMe,
}) => {
  // 3D Card Interactive Tilt motion hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typewriter Walking Text Animation Logic
  const FULL_WORDS = React.useMemo(() => ['MUHAMMAD', 'IHSAN', 'PRATAMA'], []);

  const [wordIndex, setWordIndex] = React.useState<number>(0);
  const [charIndex, setCharIndex] = React.useState<number>(0);
  const [displayedLines, setDisplayedLines] = React.useState<string[]>(['', '', '']);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (wordIndex >= FULL_WORDS.length) {
      setIsComplete(true);
      return;
    }

    const currentWord = FULL_WORDS[wordIndex];

    if (charIndex < currentWord.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[wordIndex] = currentWord.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((prev) => prev + 1);
      }, 75);

      return () => clearTimeout(timer);
    } else {
      const wordDelay = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 180);

      return () => clearTimeout(wordDelay);
    }
  }, [wordIndex, charIndex, FULL_WORDS]);

  return (
    <section id="hero" className="w-full pt-8 pb-20 md:pt-14 md:pb-28 border-b border-[#22252a]/60 relative overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Tagline & Live Status Pill */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase"
              >
                {PERSONAL_INFO.role}
              </motion.span>

              <span className="text-neutral-700 font-mono-tech text-xs">•</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono-tech tracking-wider uppercase"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <span>Available for Opportunities</span>
              </motion.div>
            </div>

            {/* Giant Title Typography with Typewriter Walking Text Animation */}
            <h1 className="font-extended text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-[0.9] sm:leading-[0.88] uppercase mb-8 sm:mb-10 select-none z-[50]">
              <span className="block min-h-[0.9em] cursor-default hover:text-neutral-200 transition-colors">
                {displayedLines[0]}
                {wordIndex === 0 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-2 sm:w-3.5 h-[0.7em] bg-emerald-400 ml-1.5 sm:ml-2 align-baseline rounded-xs shadow-[0_0_15px_rgba(52,211,153,0.9)]"
                  />
                )}
              </span>

              <span className="block min-h-[0.9em] my-1 sm:my-2 cursor-default hover:text-neutral-200 transition-colors">
                {displayedLines[1]}
                {wordIndex === 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-2 sm:w-3.5 h-[0.7em] bg-emerald-400 ml-1.5 sm:ml-2 align-baseline rounded-xs shadow-[0_0_15px_rgba(52,211,153,0.9)]"
                  />
                )}
              </span>

              <span className="block min-h-[0.9em] cursor-default hover:text-neutral-200 transition-colors">
                {displayedLines[2]}
                {(wordIndex === 2 || isComplete) && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-2 sm:w-3.5 h-[0.7em] bg-emerald-400 ml-1.5 sm:ml-2 align-baseline rounded-xs shadow-[0_0_15px_rgba(52,211,153,0.9)]"
                  />
                )}
              </span>
            </h1>

            {/* Action Buttons with Framer Motion Spring Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2"
            >
              <motion.button
                id="hero-view-projects-btn"
                onClick={onViewProjects}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="px-7 py-3.5 bg-white text-black hover:bg-neutral-200 font-mono-tech text-xs font-semibold tracking-wider uppercase transition-colors shadow-lg shadow-white/5 inline-flex items-center gap-2 group"
              >
                <span>VIEW PROJECTS</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.button
                id="hero-contact-me-btn"
                onClick={onContactMe}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="px-7 py-3.5 bg-transparent border border-neutral-700 hover:border-neutral-300 text-neutral-200 hover:text-white font-mono-tech text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
                <span>CONTACT ME</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Mouse Interactive Single Rounded Rectangular Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="lg:col-span-5 flex justify-center items-center max-w-md mx-auto lg:max-w-none w-full perspective-1000 cursor-pointer"
          >
            {/* Outer Rounded Rectangular Card Frame */}
            <motion.div
              whileHover={{ scale: 1.03, z: 25 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl p-2.5 bg-neutral-900/80 border border-neutral-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] group overflow-hidden"
            >
              {/* Inner Image Container with Rounded Corners */}
              <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-neutral-950 border border-neutral-800">
                <img
                  src={PERSONAL_INFO.photos.hero}
                  alt="Muhammad Ihsan Pratama Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-bottom grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-110 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />

                {/* Ambient Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none group-hover:opacity-40 transition-opacity" />

                {/* Top Badge: Name & Status */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 rounded-lg font-mono-tech text-[10px] sm:text-xs text-white uppercase tracking-widest shadow-lg font-semibold">
                    MUHAMMAD IHSAN PRATAMA
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 rounded-lg font-mono-tech text-[10px] text-emerald-400 uppercase tracking-widest">
                    CREATIVE DEV
                  </span>
                </div>

                {/* Bottom Badge: Location */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 rounded-lg font-mono-tech text-[10px] sm:text-xs text-neutral-300 uppercase tracking-widest shadow-lg">
                    PADANG / INDONESIA
                  </span>
                </div>
              </div>

              {/* Decorative Border Highlight */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/5 group-hover:border-white/15 transition-colors pointer-events-none" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

