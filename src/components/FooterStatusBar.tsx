import React from 'react';
import { Volume2, VolumeX, Terminal, Mail, Sparkles, Monitor } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { playPipboyClick } from '../utils/audio';

interface FooterStatusBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEffect: boolean;
  onToggleCrt: () => void;
  onOpenQuickContact: () => void;
}

export const FooterStatusBar: React.FC<FooterStatusBarProps> = ({
  soundEnabled,
  onToggleSound,
  crtEffect,
  onToggleCrt,
  onOpenQuickContact,
}) => {

  return (
    <footer className="w-full border-t border-[#1aff80]/30 pt-1 pb-1.5 sm:pt-2 sm:pb-3 px-2 sm:px-4 md:px-8 bg-[#020a04]/90 select-none flex flex-col gap-1 sm:gap-2">
      {/* Top row: HP, Level, XP Bar, AP */}
      <div className="flex items-center justify-between gap-1 sm:gap-6 text-[10px] sm:text-sm font-bold tracking-[0.08em] sm:tracking-widest">
        {/* HP Bar */}
        <div className="flex items-center gap-2" title={`Hit Points: ${PROFILE.hp}`}>
          <span className="text-[#1aff80]/80">HP</span>
          <div className="w-12 sm:w-28 h-3 bg-[#00220d] border border-[#1aff80]/50 p-0.5 flex" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} aria-label="Hit Points">
            <div className="h-full bg-[#1aff80] shadow-[0_0_6px_#1aff80] w-[95%]" />
          </div>
          <span className="text-xs">{PROFILE.hp}</span>
        </div>

        {/* Level & XP Center Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md flex items-center justify-center gap-1 sm:gap-2" title={`Level ${PROFILE.level} - 78% Experience`}>
          <span className="text-xs sm:text-sm whitespace-nowrap text-[#50ff9c]">
            LEVEL {PROFILE.level}
          </span>
            <div className="flex-1 h-3 bg-[#00220d] border border-[#1aff80]/50 p-0.5 relative overflow-hidden" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} aria-label="Experience Points">
            <div
              className="h-full bg-[#1aff80] shadow-[0_0_6px_#1aff80] transition-all duration-500"
              style={{ width: '78%' }}
            />
            {/* Tick marks */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-40">
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
            </div>
          </div>
        </div>

        {/* AP Bar */}
        <div className="flex items-center gap-2" title={`Action Points: ${PROFILE.ap}`}>
          <span className="text-[#1aff80]/80">AP</span>
          <div className="w-12 sm:w-28 h-3 bg-[#00220d] border border-[#1aff80]/50 p-0.5 flex" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} aria-label="Action Points">
            <div className="h-full bg-[#1aff80] shadow-[0_0_6px_#1aff80] w-full" />
          </div>
          <span className="text-xs">{PROFILE.ap}</span>
        </div>
      </div>

      {/* Bottom utility status icons & quick actions */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#1aff80]/70 pt-1 border-t border-[#1aff80]/15">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#1aff80] animate-pulse" aria-hidden="true" />
            STATUS: NOMINAL
          </span>
          <span className="hidden md:inline text-[#1aff80]/40">|</span>
          <span className="hidden md:inline">RADS: 0</span>
          <span className="hidden md:inline text-[#1aff80]/40">|</span>
          <span className="hidden md:inline">STIMPACKS: 12</span>
          <span className="hidden sm:inline text-[#1aff80]/40">|</span>
          <span className="hidden sm:inline">CAPS: {PROFILE.caps}</span>
        </div>

        {/* Control Toggles: Sound, CRT Scanlines, Quick Contact */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            id="toggle-crt-btn"
            aria-label={`Toggle CRT Screen Scanlines (Currently ${crtEffect ? 'ON' : 'OFF'})`}
            onClick={() => {
              playPipboyClick();
              onToggleCrt();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 border text-[10px] tracking-wider transition-colors cursor-pointer ${
              crtEffect
                ? 'border-[#1aff80] bg-[#1aff80]/20 text-[#50ff9c]'
                : 'border-[#1aff80]/30 text-[#1aff80]/50 hover:text-[#1aff80]'
            }`}
            title="Toggle CRT Screen Scanlines"
          >
            <Monitor className="w-3 h-3" aria-hidden="true" />
            <span className="hidden sm:inline">CRT {crtEffect ? 'ON' : 'OFF'}</span>
          </button>

          <button
            id="toggle-sound-btn"
            aria-label={`Toggle Sound Effects & Radio (Currently ${soundEnabled ? 'ON' : 'MUTED'})`}
            onClick={() => {
              playPipboyClick();
              onToggleSound();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 border text-[10px] tracking-wider transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-[#1aff80] bg-[#1aff80]/20 text-[#50ff9c]'
                : 'border-[#1aff80]/30 text-[#1aff80]/50 hover:text-[#1aff80]'
            }`}
            title="Toggle Sound Effects & Radio"
          >
            {soundEnabled ? <Volume2 className="w-3 h-3" aria-hidden="true" /> : <VolumeX className="w-3 h-3" aria-hidden="true" />}
            <span className="hidden sm:inline">AUDIO {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>

          <button
            id="quick-contact-btn"
            aria-label="Open Transmit Vault-Tec Comms Relay Contact Terminal"
            onClick={() => {
              playPipboyClick();
              onOpenQuickContact();
            }}
            className="flex items-center gap-1 px-2.5 py-0.5 border border-[#1aff80] bg-[#1aff80] text-black font-bold hover:bg-[#50ff9c] text-[10px] tracking-wider transition-colors cursor-pointer"
          >
            <Mail className="w-3 h-3" aria-hidden="true" />
            <span>CONTACT</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
