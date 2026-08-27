import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playTypewriterClick, playFanfare } from '../utils/audio';

interface TypewriterBootProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM',
  'COPYRIGHT 2075-2077 ROBCO INDUSTRIES',
  '-SERVER 6- JAKARTA PRIMARY NODE',
  '----------------------------------------',
  'INITIALIZING PIP-BOY 3000 Mk IV INTERFACE...',
  'CHECKING BASE MEMORY: 640 KB OK',
  'EXTENDED MEMORY VIRTUALIZATION: ENABLED',
  'CALIBRATING CRT PHOSPHOR GRID [GREEN 520nm]...',
  'MOUNTING HOLOTAPE: RESUME_JOHAN_SIMEON_DAMANIK.DAT',
  'READING PROFILE: FULL-STACK DEVELOPER (LEVEL 28)',
  'VERIFYING S.P.E.C.I.A.L. SKILLS & QUEST LOGS...',
  'AUTHENTICATION STATUS: AUTHORIZED VAULT-TEC OPERATOR',
  'ALL SYSTEMS NOMINAL. READY FOR OPERATOR INTERACTION.',
];

export const TypewriterBoot: React.FC<TypewriterBootProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isBootFinished, setIsBootFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= BOOT_LOGS.length) {
      setIsBootFinished(true);
      playFanfare();
      return;
    }

    const targetLine = BOOT_LOGS[currentLineIndex];

    if (charIndex < targetLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + targetLine[charIndex]);
        setCharIndex(prev => prev + 1);
        playTypewriterClick();
      }, 14); // Fast typewriter speed
      return () => clearTimeout(timeout);
    } else {
      // Completed line, move to next
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, targetLine]);
        setDisplayedText('');
        setCharIndex(0);
        setCurrentLineIndex(prev => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, charIndex]);

  // Handle keyboard press to skip or enter
  useEffect(() => {
    const handleKeyDown = () => {
      handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSkip = () => {
    playFanfare();
    onComplete();
  };

  return (
    <div
      id="pipboy-boot-screen"
      onClick={handleSkip}
      className="fixed inset-0 bg-[#030a05] text-[#1aff80] z-50 flex flex-col justify-between p-6 md:p-12 font-mono select-none cursor-pointer overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-[#1aff80]/40 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-[#1aff80] animate-ping" />
          <span className="font-bold tracking-widest text-sm md:text-base">ROBCO INDUSTRIES V2.0.77</span>
        </div>
        <div className="text-xs md:text-sm text-[#1aff80]/70 tracking-widest">
          SYS_BOOT // JOHAN_DAMANIK
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="my-auto max-w-4xl w-full mx-auto space-y-1.5 text-xs sm:text-sm md:text-base tracking-wide">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-start">
            <span className="text-[#1aff80]/50 mr-3">&gt;</span>
            <span className={idx === 0 || idx === 1 ? 'font-bold text-[#50ff9c]' : 'text-[#1aff80]'}>
              {line}
            </span>
          </div>
        ))}

        {currentLineIndex < BOOT_LOGS.length && (
          <div className="flex items-start">
            <span className="text-[#1aff80]/50 mr-3">&gt;</span>
            <span>{displayedText}</span>
            <span className="inline-block w-2.5 h-4 bg-[#1aff80] ml-1 animate-pulse" />
          </div>
        )}

        {isBootFinished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
            className="pt-6 text-center text-sm md:text-lg font-bold text-[#50ff9c] tracking-widest"
          >
            &gt;&gt;&gt; [ CLICK ANYWHERE OR PRESS ANY KEY TO ENTER PIP-BOY ] &lt;&lt;&lt;
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Controls */}
      <div className="flex justify-between items-center border-t border-[#1aff80]/40 pt-4 text-xs md:text-sm text-[#1aff80]/80">
        <div className="flex items-center gap-4">
          <span className="bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40 text-[#1aff80]">TAP SCREEN TO SKIP</span>
          <span className="hidden sm:inline">VAULT-TEC HOLOTAPE INTERFACE</span>
        </div>
        <button
          id="skip-boot-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="bg-[#1aff80] text-black font-bold px-4 py-1.5 tracking-wider hover:bg-white transition-colors cursor-pointer"
        >
          INITIALIZE PIP-BOY 3000 &gt;&gt;
        </button>
      </div>
    </div>
  );
};
