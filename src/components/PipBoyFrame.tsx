import React from 'react';
import { PipBoyTheme } from '../types';
import { playPipboyClick } from '../utils/audio';
import { Palette } from 'lucide-react';

interface PipBoyFrameProps {
  children: React.ReactNode;
  crtEffect: boolean;
  theme: PipBoyTheme;
  onChangeTheme: (theme: PipBoyTheme) => void;
}

export const PipBoyFrame: React.FC<PipBoyFrameProps> = ({
  children,
  crtEffect,
  theme,
  onChangeTheme,
}) => {
  const THEME_CYCLE: readonly PipBoyTheme[] = ['green', 'amber', 'cyan', 'white'] as const;

  const cycleTheme = () => {
    playPipboyClick(1200, 0.05);
    const currentIndex = (THEME_CYCLE as readonly string[]).indexOf(theme);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % THEME_CYCLE.length;
    const nextTheme = THEME_CYCLE[nextIndex];
    onChangeTheme(nextTheme);
  };

  const getThemePalette = (t: PipBoyTheme) => {
    switch (t) {
      case 'amber':
        return {
          primary: '#ffb642',
          bright: '#ffd285',
          glow: 'rgba(255, 182, 66, 0.55)',
          dim: 'rgba(255, 182, 66, 0.15)',
          bgDark: '#1a1000',
          bgCard: '#241703',
          borderChassis: '#382305',
          hueRotate: 'hue-rotate(245deg)',
        };
      case 'cyan':
        return {
          primary: '#38fdfd',
          bright: '#a0ffff',
          glow: 'rgba(56, 253, 253, 0.55)',
          dim: 'rgba(56, 253, 253, 0.15)',
          bgDark: '#001418',
          bgCard: '#021e24',
          borderChassis: '#07323b',
          hueRotate: 'hue-rotate(40deg)',
        };
      case 'white':
        return {
          primary: '#e6ffff',
          bright: '#ffffff',
          glow: 'rgba(230, 255, 255, 0.55)',
          dim: 'rgba(230, 255, 255, 0.15)',
          bgDark: '#0c1214',
          bgCard: '#131c1f',
          borderChassis: '#223035',
          hueRotate: 'saturate(0.2) brightness(1.2)',
        };
      case 'green':
      default:
        return {
          primary: '#1aff80',
          bright: '#50ff9c',
          glow: 'rgba(26, 255, 128, 0.45)',
          dim: 'rgba(26, 255, 128, 0.15)',
          bgDark: '#001a08',
          bgCard: '#011406',
          borderChassis: '#0e1f13',
          hueRotate: 'none',
        };
    }
  };

  const palette = getThemePalette(theme);

  return (
    <div
      id="pipboy-root-chassis"
      style={{
        ['--pip-primary' as string]: palette.primary,
        ['--pip-bright' as string]: palette.bright,
        ['--pip-glow' as string]: palette.glow,
        ['--pip-dim' as string]: palette.dim,
        ['--pip-bg-dark' as string]: palette.bgDark,
        ['--pip-bg-card' as string]: palette.bgCard,
      }}
      className="w-screen h-screen bg-[#030604] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden select-none font-mono"
    >
      {/* Outer Pip-Boy 3000 Chassis Frame */}
      <div
        className="w-full max-w-7xl h-full max-h-[920px] rounded-3xl bg-[#09100a] border-4 shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.8)] relative flex flex-col p-2 sm:p-4 md:p-5 overflow-hidden transition-colors duration-300"
        style={{ borderColor: palette.borderChassis }}
      >
        {/* Four Corner Screws / Rivets */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform -rotate-45" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform -rotate-12" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform rotate-30" />
        </div>

        {/* Top Hardware Bezel Header */}
        <div
          className="flex items-center justify-between px-3 pb-1 text-[10px] tracking-widest font-mono border-b transition-colors duration-300 relative z-30"
          style={{
            color: palette.primary,
            borderColor: palette.dim,
          }}
        >
          <div className="flex items-center gap-2 opacity-80">
            <span
              className="inline-block w-2 h-2 rounded-full transition-colors duration-300 animate-pulse"
              style={{ backgroundColor: palette.primary }}
            />
            <span>ROBCO MODEL 3000 Mk IV // PERSONAL INFORMATION PROCESSOR</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="sr-only">Johan Simeon Damanik — Full-Stack Developer</h1>
            <button
              id="cycle-theme-top-btn"
              onClick={cycleTheme}
              aria-label={`Cycle Pip-Boy phosphor color palette (Current: ${theme})`}
              style={{
                borderColor: palette.dim,
                backgroundColor: palette.dim,
                color: palette.primary,
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 border rounded-xs transition-all cursor-pointer font-bold hover:brightness-125 select-none text-[10px] tracking-wider uppercase hover:bg-white/10"
              title="Click to cycle Pip-Boy phosphor color palette"
            >
              <Palette className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{theme}</span>
            </button>
          </div>
        </div>

        {/* Inner CRT Screen Area */}
        <main
          id="main-pipboy-screen"
          className="w-full flex-1 rounded-2xl border-2 relative overflow-hidden flex flex-col transition-all duration-300"
          style={{
            backgroundColor: palette.bgDark,
            borderColor: palette.dim,
            boxShadow: `inset 0 0 35px ${palette.dim}`,
            filter: palette.hueRotate !== 'none' ? palette.hueRotate : undefined,
          }}
        >
          {/* Main App Content */}
          <div
            className="relative z-10 flex-1 flex flex-col overflow-hidden transition-colors duration-300"
            style={{ color: palette.primary }}
          >
            {children}
          </div>

          {/* CRT Screen Scanlines & Glare Effects (Toggled) */}
          {crtEffect && (
            <>
              <div className="absolute inset-0 crt-scanlines z-20 pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 crt-vignette z-20 pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 crt-scan-bar z-20 pointer-events-none" aria-hidden="true" />
            </>
          )}
        </main>
      </div>
    </div>
  );
};
