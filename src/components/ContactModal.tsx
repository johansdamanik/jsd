import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { playPipboyClick, playFanfare } from '../utils/audio';
import { X, Mail, Phone, MapPin, Copy, Check, ExternalLink, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    playPipboyClick();
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playFanfare();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-[#011406] border-2 border-[#1aff80] p-6 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[#1aff80]/40">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#50ff9c] tracking-widest" id="contact-modal-title">
            <span className="w-2.5 h-2.5 bg-[#1aff80] animate-ping" aria-hidden="true" />
            <span>TRANSMIT VAULT-TEC COMMS RELAY</span>
          </div>
          <button
            id="close-contact-modal"
            aria-label="Close Contact Dialog"
            onClick={() => {
              playPipboyClick();
              onClose();
            }}
            className="text-[#1aff80]/70 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {isSent ? (
          <div className="py-12 text-center space-y-3" role="status" aria-live="polite">
            <div className="w-12 h-12 rounded-full border-2 border-[#1aff80] flex items-center justify-center mx-auto bg-[#1aff80]/20 text-[#50ff9c]">
              <Check className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="text-base font-bold text-[#50ff9c] tracking-widest">
              TRANSMISSION BROADCAST SUCCESSFUL
            </div>
            <div className="text-xs text-[#1aff80]/70">
              Message dispatched to operator terminal: {PROFILE.email}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="copy-email-btn"
                aria-label={`Copy email address: ${PROFILE.email}`}
                onClick={handleCopyEmail}
                className="flex items-center justify-between p-2.5 border border-[#1aff80]/40 bg-[#1aff80]/10 hover:bg-[#1aff80]/25 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-[#50ff9c]" aria-hidden="true" />
                  <span className="truncate text-xs">{PROFILE.email}</span>
                </div>
                {copied ? <Check className="w-3.5 h-3.5 text-[#50ff9c]" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>

              <a
                href="https://wa.me/6281222234454"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open WhatsApp transmission with ${PROFILE.phone}`}
                onClick={() => playFanfare()}
                className="flex items-center justify-between p-2.5 border border-[#1aff80]/40 bg-[#1aff80]/10 hover:bg-[#1aff80]/25 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <Phone className="w-4 h-4 text-[#50ff9c]" aria-hidden="true" />
                  <span className="truncate text-xs">{PROFILE.phone}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Direct Form Dispatch */}
            <form onSubmit={handleSendMessage} className="space-y-3 pt-2">
              <div>
                <label htmlFor="contact-name" className="block text-[11px] font-bold text-[#1aff80]/70 mb-1">
                  CALLSIGN / NAME:
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={msgName}
                  onChange={(e) => setMsgName(e.target.value)}
                  placeholder="e.g. Vault Overseer / Tech Recruiter"
                  className="w-full bg-[#000a04] border border-[#1aff80]/40 px-3 py-1.5 text-xs text-[#1aff80] focus:border-[#1aff80] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[11px] font-bold text-[#1aff80]/70 mb-1">
                  RETURN FREQUENCY / EMAIL:
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={msgEmail}
                  onChange={(e) => setMsgEmail(e.target.value)}
                  placeholder="e.g. recruiter@company.com"
                  className="w-full bg-[#000a04] border border-[#1aff80]/40 px-3 py-1.5 text-xs text-[#1aff80] focus:border-[#1aff80] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-bold text-[#1aff80]/70 mb-1">
                  COMMUNICATION MESSAGE:
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  placeholder="Enter project inquiry, contract opportunity, or collaboration details..."
                  className="w-full bg-[#000a04] border border-[#1aff80]/40 px-3 py-1.5 text-xs text-[#1aff80] focus:border-[#1aff80] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-[#1aff80]/30 text-xs hover:bg-[#1aff80]/15 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  aria-label="Transmit contact message"
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1aff80] text-black font-bold text-xs hover:bg-white transition-colors cursor-pointer shadow-[0_0_10px_#1aff80]"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
