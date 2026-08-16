import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ContactModal } from './components/ContactModal';
import { SkillsModal } from './components/SkillsModal';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import { Footer } from './components/Footer';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('work');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState<boolean>(false);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-theme');
    }
  }, [isDark]);

  const handleNavigate = (sectionId: string) => {
    if (selectedProject) {
      setSelectedProject(null);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPillar = (pillarId: string) => {
    setSelectedPillar(pillarId);
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0b0d] text-neutral-100 flex flex-col font-sans transition-colors duration-300 ${!isDark ? 'light-theme' : ''}`}>
      {/* Top Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSkills={() => setIsSkillsOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        inProjectView={Boolean(selectedProject)}
        onBackToHome={() => setSelectedProject(null)}
      />

      {/* Main View Area with AnimatePresence */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectDetailView
              key={`project-${selectedProject.id}`}
              project={selectedProject}
              onBack={() => {
                setSelectedProject(null);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onOpenContact={() => setIsContactOpen(true)}
              onLaunchDemo={() => setIsDemoOpen(true)}
            />
          ) : (
            <motion.div
              key="home-sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HeroSection
                onViewProjects={() => handleNavigate('work')}
                onContactMe={() => setIsContactOpen(true)}
              />

              <AboutSection
                onSelectPillar={handleSelectPillar}
                selectedPillar={selectedPillar}
              />

              <SelectedWorkSection
                onSelectProject={(project) => setSelectedProject(project)}
                selectedPillar={selectedPillar}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateHome={() => {
          setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Dialogs */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <SkillsModal
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
      />

      <InteractiveDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

