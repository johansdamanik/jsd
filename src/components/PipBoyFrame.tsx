import React, { useEffect, useRef, useState } from 'react';
import { PipBoyTheme } from '../types';
import { playPipboyClick } from '../utils/audio';
import { Palette } from 'lucide-react';

interface PipBoyFrameProps {
  children: React.ReactNode;
  crtEffect: boolean;
  theme: PipBoyTheme;
  onChangeTheme: (theme: PipBoyTheme) => void;
}

const PALETTE_OPTIONS: { id: PipBoyTheme; label: string; color: string }[] = [
  { id: 'green', label: 'GREEN', color: '#1aff80' },
  { id: 'amber', label: 'AMBER', color: '#ffb642' },
  { id: 'cyan', label: 'CYAN', color: '#38fdfd' },
  { id: 'white', label: 'WHITE', color: '#e6ffff' },
];

export const PipBoyFrame: React.FC<PipBoyFrameProps> = ({
  children,
  crtEffect,
  theme,
  onChangeTheme,
}) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteButtonRef = useRef<HTMLButtonElement>(null);
  const paletteMenuRef = useRef<HTMLDivElement>(null);
  const paletteItemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!isPaletteOpen) return;

    const selectedIndex = Math.max(0, PALETTE_OPTIONS.findIndex((option) => option.id === theme));
    const animationFrame = window.requestAnimationFrame(() => paletteItemRefs.current[selectedIndex]?.focus());
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!paletteMenuRef.current?.contains(target) && !paletteButtonRef.current?.contains(target)) {
        setIsPaletteOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
    };
  }, [isPaletteOpen, theme]);

  const closePaletteMenu = (restoreFocus = false) => {
    setIsPaletteOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => paletteButtonRef.current?.focus());
  };

  const handlePaletteMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = paletteItemRefs.current.findIndex((item) => item === document.activeElement);
    let nextIndex: number | undefined;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % PALETTE_OPTIONS.length;
    if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + PALETTE_OPTIONS.length) % PALETTE_OPTIONS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = PALETTE_OPTIONS.length - 1;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePaletteMenu(true);
      return;
    }
    if (event.key === 'Tab') {
      setIsPaletteOpen(false);
      return;
    }
    if (nextIndex !== undefined) {
      event.preventDefault();
      paletteItemRefs.current[nextIndex]?.focus();
    }
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
      className="w-screen h-[100dvh] min-h-0 bg-[#030604] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden select-none font-mono"
    >
      {/* Outer Pip-Boy 3000 Chassis Frame */}
      <div
        className="w-full max-w-7xl h-full max-h-[920px] rounded-2xl sm:rounded-3xl bg-[#09100a] border-2 sm:border-4 shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.8)] relative flex flex-col p-2 sm:p-4 md:p-5 overflow-hidden transition-colors duration-300"
        style={{ borderColor: palette.borderChassis }}
      >
        {/* Four Corner Screws / Rivets */}
        <div className="absolute top-1 left-1 sm:top-3 sm:left-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform rotate-45" />
        </div>
        <div className="absolute top-1 right-1 sm:top-3 sm:right-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform -rotate-45" />
        </div>
        <div className="absolute bottom-1 left-1 sm:bottom-3 sm:left-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform -rotate-12" />
        </div>
        <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 w-3 h-3 rounded-full bg-[#1c2e22] border border-[#2b4433] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-[1px] bg-[#0c1710] transform rotate-30" />
        </div>

        {/* Top Hardware Bezel Header */}
        <div
          className="flex items-center justify-between gap-1 px-1.5 sm:px-3 pb-1 text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-widest font-mono border-b transition-colors duration-300 relative z-30"
          style={{
            color: palette.primary,
            borderColor: palette.dim,
          }}
        >
          <div className="min-w-0 flex items-center gap-1.5 opacity-80">
            <span
              className="inline-block w-2 h-2 rounded-full transition-colors duration-300 animate-pulse"
              style={{ backgroundColor: palette.primary }}
            />
            <span>ROBCO MODEL 3000 Mk IV // PERSONAL INFORMATION PROCESSOR</span>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 sm:gap-3">
            <h1 className="sr-only">Johan Simeon Damanik — Full-Stack Developer</h1>
            <button
              id="theme-picker-btn"
              ref={paletteButtonRef}
              onClick={() => {
                playPipboyClick(1200, 0.05);
                setIsPaletteOpen((isOpen) => !isOpen);
              }}
              aria-label={`Choose Pip-Boy phosphor color palette (Current: ${theme})`}
              aria-expanded={isPaletteOpen}
              aria-haspopup="menu"
              style={{
                borderColor: palette.dim,
                backgroundColor: palette.dim,
                color: palette.primary,
              }}
              className="flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 border rounded-xs transition-all cursor-pointer font-bold hover:brightness-125 select-none text-[8px] sm:text-[10px] tracking-wider uppercase hover:bg-white/10"
              title="Choose Pip-Boy phosphor color palette"
            >
              <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              <span>{theme}</span>
            </button>
            {isPaletteOpen && (
              <div
                ref={paletteMenuRef}
                className="absolute right-0 top-full mt-1 z-50 flex min-w-24 flex-col gap-1 border border-[#1aff80]/50 bg-[#020a04] p-1.5 shadow-[0_0_12px_rgba(26,255,128,0.25)]"
                role="menu"
                aria-label="Pip-Boy phosphor color palette"
                onKeyDown={handlePaletteMenuKeyDown}
              >
                {PALETTE_OPTIONS.map((option, index) => (
                  <button
                    key={option.id}
                    ref={(element) => { paletteItemRefs.current[index] = element; }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={theme === option.id}
                    aria-label={`Use ${option.label.toLowerCase()} palette`}
                    title={option.label}
                    onClick={() => {
                      playPipboyClick(1200, 0.05);
                      onChangeTheme(option.id);
                      closePaletteMenu(true);
                    }}
                    className={`flex items-center gap-2 border px-2 py-1 text-left text-[9px] tracking-wider transition-colors hover:bg-white/10 ${
                      theme === option.id ? 'border-white' : 'border-white/20'
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: option.color, boxShadow: `0 0 6px ${option.color}` }}
                    />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inner CRT Screen Area */}
        <main
          id="main-pipboy-screen"
            className="w-full flex-1 min-h-0 rounded-2xl border-2 relative overflow-hidden flex flex-col transition-all duration-300"
          style={{
            backgroundColor: palette.bgDark,
            borderColor: palette.dim,
            boxShadow: `inset 0 0 35px ${palette.dim}`,
            filter: palette.hueRotate !== 'none' ? palette.hueRotate : undefined,
          }}
        >
          {/* Main App Content */}
          <div
            className="relative z-10 flex-1 min-h-0 flex flex-col overflow-hidden transition-colors duration-300"
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
