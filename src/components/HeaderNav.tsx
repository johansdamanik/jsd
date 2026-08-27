import React from 'react';
import { motion } from 'motion/react';
import { TabType, StatSubTab, DataSubTab, InvSubTab } from '../types';
import { playTabSound, playPipboyClick } from '../utils/audio';

interface HeaderNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  statSubTab: StatSubTab;
  onSelectStatSubTab: (sub: StatSubTab) => void;
  dataSubTab: DataSubTab;
  onSelectDataSubTab: (sub: DataSubTab) => void;
  invSubTab: InvSubTab;
  onSelectInvSubTab: (sub: InvSubTab) => void;
}

const MAIN_TABS: { id: TabType; label: string }[] = [
  { id: 'STAT', label: 'STAT' },
  { id: 'DATA', label: 'DATA' },
  { id: 'INV', label: 'INV' },
  { id: 'MAP', label: 'MAP' },
  { id: 'RADIO', label: 'RADIO' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onSelectTab,
  statSubTab,
  onSelectStatSubTab,
  dataSubTab,
  onSelectDataSubTab,
  invSubTab,
  onSelectInvSubTab,
}) => {
  const handleTabClick = (tab: TabType) => {
    if (tab !== activeTab) {
      playTabSound();
      onSelectTab(tab);
    }
  };

  const handleSubTabClick = (callback: () => void) => {
    playPipboyClick(1100, 0.03);
    callback();
  };

  return (
    <header className="w-full flex flex-col pt-1.5 sm:pt-3 pb-1.5 sm:pb-2 px-2 sm:px-4 md:px-8 border-b border-[#1aff80]/30 select-none">
      {/* Top Header Bar with Tabs & Model Badge */}
      <div className="flex justify-between items-center relative">
        {/* Left main tabs */}
        <nav aria-label="Pip-Boy Main Categories" className="flex items-center justify-between w-full gap-1 sm:w-auto sm:justify-start sm:gap-8 md:gap-10 relative z-10" role="tablist">
          {MAIN_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id.toLowerCase()}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="main-pipboy-screen"
                aria-label={`Switch to ${tab.label} category`}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-0.5 sm:px-1 py-0.5 sm:py-1 text-xs sm:text-base md:text-lg tracking-[0.12em] sm:tracking-widest font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#50ff9c] filter drop-shadow-[0_0_8px_rgba(26,255,128,0.9)]'
                    : 'text-[#1aff80]/60 hover:text-[#1aff80]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-main-tab-indicator"
                    className="absolute -bottom-[9px] left-0 right-0 h-[3px] bg-[#1aff80] shadow-[0_0_10px_#1aff80] z-20"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side Model ID */}
        <div className="hidden sm:flex flex-col items-end text-right text-[11px] md:text-xs text-[#1aff80]/80 tracking-wider">
          <span className="font-bold">PIP-BOY 3000 Mk IV</span>
          <span className="text-[10px] text-[#1aff80]/50">ROBCO OS // REV 2077.4</span>
        </div>
      </div>

      {/* The Continuous Glowing Horizontal Pip-Boy Line */}
      <div className="relative w-full h-px bg-[#1aff80]/30 mt-1 sm:mt-2 mb-1.5 sm:mb-2.5" />

      {/* Sub-Tabs Row */}
      <nav aria-label="Sub-category navigation" role="tablist" className="flex items-center gap-3 sm:gap-8 text-[10px] sm:text-sm tracking-wider mt-0.5 overflow-x-auto">
        {activeTab === 'STAT' && (
          <>
            {(['STATUS', 'SPECIAL', 'PERKS'] as StatSubTab[]).map((sub) => {
              const isSubActive = statSubTab === sub;
              return (
                <button
                  key={sub}
                  id={`subtab-${sub.toLowerCase()}`}
                  role="tab"
                  aria-selected={isSubActive}
                  aria-label={`Stat subcategory: ${sub}`}
                  onClick={() => handleSubTabClick(() => onSelectStatSubTab(sub))}
                  className={`relative py-1 font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    isSubActive
                      ? 'text-[#50ff9c] filter drop-shadow-[0_0_6px_rgba(26,255,128,0.8)]'
                      : 'text-[#1aff80]/60 hover:text-[#1aff80]'
                  }`}
                >
                  <span>{sub}</span>
                  {isSubActive && (
                    <motion.div
                      layoutId="active-subtab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1aff80] shadow-[0_0_8px_#1aff80]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </>
        )}

        {activeTab === 'DATA' && (
          <>
            {(['QUESTS', 'EDUCATION', 'TERMINAL'] as DataSubTab[]).map((sub) => {
              const isSubActive = dataSubTab === sub;
              return (
                <button
                  key={sub}
                  id={`subtab-${sub.toLowerCase()}`}
                  role="tab"
                  aria-selected={isSubActive}
                  aria-label={`Data subcategory: ${sub}`}
                  onClick={() => handleSubTabClick(() => onSelectDataSubTab(sub))}
                  className={`relative py-1 font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    isSubActive
                      ? 'text-[#50ff9c] filter drop-shadow-[0_0_6px_rgba(26,255,128,0.8)]'
                      : 'text-[#1aff80]/60 hover:text-[#1aff80]'
                  }`}
                >
                  <span>{sub}</span>
                  {isSubActive && (
                    <motion.div
                      layoutId="active-subtab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1aff80] shadow-[0_0_8px_#1aff80]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </>
        )}

        {activeTab === 'INV' && (
          <>
            {(['WEAPONS', 'APPAREL', 'AID', 'MISC'] as InvSubTab[]).map((sub) => {
              const isSubActive = invSubTab === sub;
              return (
                <button
                  key={sub}
                  id={`subtab-${sub.toLowerCase()}`}
                  role="tab"
                  aria-selected={isSubActive}
                  aria-label={`Inventory subcategory: ${sub}`}
                  onClick={() => handleSubTabClick(() => onSelectInvSubTab(sub))}
                  className={`relative py-1 font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    isSubActive
                      ? 'text-[#50ff9c] filter drop-shadow-[0_0_6px_rgba(26,255,128,0.8)]'
                      : 'text-[#1aff80]/60 hover:text-[#1aff80]'
                  }`}
                >
                  <span>{sub}</span>
                  {isSubActive && (
                    <motion.div
                      layoutId="active-subtab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1aff80] shadow-[0_0_8px_#1aff80]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </>
        )}

        {activeTab === 'MAP' && (
          <div className="text-xs text-[#1aff80]/80 tracking-widest">
            LOCAL WASTELAND RADAR: INDONESIA ARCHIPELAGO // REGION 06-JKT
          </div>
        )}

        {activeTab === 'RADIO' && (
          <div className="text-xs text-[#1aff80]/80 tracking-widest">
            PIP-BOY FREQUENCY TUNER // BROADCAST CHANNELS
          </div>
        )}

      </nav>
    </header>
  );
};
