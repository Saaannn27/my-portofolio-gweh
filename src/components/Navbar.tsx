import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSkills: () => void;
  onOpenContact: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  inProjectView: boolean;
  onBackToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSkills,
  onOpenContact,
  isDark,
  onToggleTheme,
  inProjectView,
  onBackToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    if (section === 'skills') {
      onOpenSkills();
    } else if (section === 'contact') {
      onOpenContact();
    } else if (inProjectView) {
      onBackToHome();
      setTimeout(() => {
        onNavigate(section);
      }, 100);
    } else {
      onNavigate(section);
    }
  };

  const handleLogoClick = () => {
    if (inProjectView) {
      onBackToHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0a0b0d]/90 dark:bg-[#0a0b0d]/90 light-theme:bg-[#f8f9fa]/90 border-b border-[#22252a]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.button
          id="nav-brand-logo"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="font-extended text-2xl sm:text-3xl tracking-tight text-white dark:text-white light-theme:text-neutral-900 focus:outline-none"
          style={{ letterSpacing: '0.04em' }}
        >
          {PERSONAL_INFO.brandName}
        </motion.button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && !inProjectView && (item.id === 'work' || item.id === 'about');
            return (
              <motion.button
                key={item.id}
                id={`nav-${item.id}-link`}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative font-mono-tech text-xs tracking-widest uppercase transition-colors py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Dark / Light Toggle */}
          <motion.button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: -30 }}
            aria-label="Toggle Theme"
            className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50 focus:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-4">
          <motion.button
            id="mobile-theme-toggle-btn"
            onClick={onToggleTheme}
            whileTap={{ rotate: 180 }}
            aria-label="Toggle Theme"
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>
          <motion.button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0e0f13] border-b border-[#22252a] px-6 py-6 space-y-3 overflow-hidden"
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.05 }}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left font-mono-tech text-sm tracking-widest text-neutral-300 hover:text-white py-2 border-b border-neutral-850/50"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

