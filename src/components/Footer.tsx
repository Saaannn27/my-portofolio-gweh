import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onNavigateHome }) => {
  return (
    <footer className="w-full bg-[#0a0b0d] border-t border-[#22252a]/80 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Logo */}
          <button
            id="footer-brand-logo"
            onClick={onNavigateHome}
            className="font-extended text-2xl sm:text-3xl tracking-tight text-white hover:opacity-80 transition-opacity"
            style={{ letterSpacing: '0.04em' }}
          >
            {PERSONAL_INFO.brandName}
          </button>

          {/* Social / External Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono-tech text-xs tracking-widest uppercase">
            <a
              id="footer-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a
              id="footer-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <a
              id="footer-twitter-link"
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              TWITTER
            </a>
            <button
              id="footer-email-link"
              onClick={onOpenContact}
              className="text-neutral-400 hover:text-white transition-colors uppercase font-mono-tech"
            >
              EMAIL
            </button>
          </div>

          {/* Copyright Tagline */}
          <div className="font-mono-tech text-[11px] tracking-wider text-neutral-400 uppercase text-center md:text-right">
            © {PERSONAL_INFO.copyrightYear} {PERSONAL_INFO.name}. BUILT WITH PRECISION.
          </div>
        </div>
      </div>
    </footer>
  );
};
