import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Send, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'General Inquiry',
      message: '',
    });
    onClose();
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

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0e0f13] border border-neutral-800 rounded-none shadow-2xl p-6 sm:p-10 text-white z-10 overflow-hidden"
          >
            {/* Close button */}
            <motion.button
              id="close-contact-modal-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close Contact Dialog"
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Header */}
            <div className="mb-8">
              <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-extended text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                LET'S TALK
              </h2>
              <p className="text-neutral-400 text-sm mt-2">
                Available for full-time architecture, consulting, and selected contract builds.
              </p>
            </div>

            {/* Direct Email Pill */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 bg-neutral-900/90 border border-neutral-800 mb-8 group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-mono-tech text-xs sm:text-sm text-neutral-200 truncate">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <motion.button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono-tech tracking-wider uppercase transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400"
                  >
                    <Check className="w-7 h-7" />
                  </motion.div>
                  <h3 className="font-extended text-xl sm:text-2xl font-bold uppercase text-white">
                    MESSAGE RECEIVED
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name}. Ihsan will reply to your email shortly.
                  </p>
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-2.5 bg-white text-black font-mono-tech text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors"
                  >
                    DONE
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-tech text-xs tracking-wider text-neutral-400 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Chen"
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-tech text-xs tracking-wider text-neutral-400 uppercase mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-tech text-xs tracking-wider text-neutral-400 uppercase mb-1">
                      Topic / Project Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Desktop Application">Desktop Application Architecture</option>
                      <option value="Mobile & Flutter App">Mobile & Flutter Engineering</option>
                      <option value="Web & Full-Stack Development">Web & Full-Stack Development</option>
                      <option value="Data Pipeline & ML">Data Pipeline & Machine Learning</option>
                      <option value="General Inquiry">General Inquiry / Coffee Chat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono-tech text-xs tracking-wider text-neutral-400 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your timeline, vision, or architectural requirements..."
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-neutral-400">
                      <motion.a
                        whileHover={{ scale: 1.2, color: '#fff' }}
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, color: '#fff' }}
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, color: '#fff' }}
                        href={PERSONAL_INFO.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono-tech text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

