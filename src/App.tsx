/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, StatSubTab, DataSubTab, InvSubTab, PipBoyTheme } from './types';
import { TypewriterBoot } from './components/TypewriterBoot';
import { PipBoyFrame } from './components/PipBoyFrame';
import { HeaderNav } from './components/HeaderNav';
import { FooterStatusBar } from './components/FooterStatusBar';
import { StatView } from './components/tabs/StatView';
import { DataView } from './components/tabs/DataView';
import { InvView } from './components/tabs/InvView';
import { MapView } from './components/tabs/MapView';
import { RadioView } from './components/tabs/RadioView';
import { ContactModal } from './components/ContactModal';
import { QUESTS_DATA } from './data/portfolioData';
import { toggleAudioMute, isAudioMuted } from './utils/audio';

const getInitialProjectView = () => {
  if (typeof window === 'undefined') return { activeTab: 'STAT' as TabType };

  const match = window.location.pathname.match(/^\/projects(?:\/([^/]+))?\/?$/);
  if (!match) return { activeTab: 'STAT' as TabType };
  if (!match[1]) return { activeTab: 'DATA' as TabType };

  const quest = QUESTS_DATA.find(({ slug }) => slug === match[1]);
  return quest
    ? { activeTab: 'DATA' as TabType, projectSlug: quest.slug }
    : { activeTab: 'STAT' as TabType };
};

const isDirectContentRoute = (pathname: string) =>
  pathname === '/about' || pathname === '/about/' || pathname === '/projects' || pathname.startsWith('/projects/');

export default function App() {
  const [initialView] = useState(getInitialProjectView);
  const [isBooting, setIsBooting] = useState(() =>
    typeof window === 'undefined' || !isDirectContentRoute(window.location.pathname),
  );
  const [activeTab, setActiveTab] = useState<TabType>(initialView.activeTab);
  const [statSubTab, setStatSubTab] = useState<StatSubTab>('STATUS');
  const [dataSubTab, setDataSubTab] = useState<DataSubTab>('QUESTS');
  const [invSubTab, setInvSubTab] = useState<InvSubTab>('WEAPONS');
  const [theme, setTheme] = useState<PipBoyTheme>('green');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [crtEffect, setCrtEffect] = useState<boolean>(true);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    const updated = toggleAudioMute();
    setSoundEnabled(updated);
  };

  const handleToggleCrt = () => {
    setCrtEffect(!crtEffect);
  };

  return (
    <>
      <div inert={isBooting} aria-hidden={isBooting ? true : undefined}>
        <PipBoyFrame
          theme={theme}
          onChangeTheme={setTheme}
          crtEffect={crtEffect}
        >
          {/* Top Header Navigation Tabs & Sub-Tabs */}
          <HeaderNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            statSubTab={statSubTab}
            onSelectStatSubTab={setStatSubTab}
            dataSubTab={dataSubTab}
            onSelectDataSubTab={setDataSubTab}
            invSubTab={invSubTab}
            onSelectInvSubTab={setInvSubTab}
          />

          {/* Main Tab Screen Content */}
          <div className="flex-1 min-h-0 overflow-hidden relative">
            {activeTab === 'STAT' && <StatView subTab={statSubTab} />}
            {activeTab === 'DATA' && <DataView subTab={dataSubTab} initialQuestSlug={initialView.projectSlug} />}
            {activeTab === 'INV' && <InvView subTab={invSubTab} />}
            {activeTab === 'MAP' && <MapView />}
            {activeTab === 'RADIO' && <RadioView soundEnabled={soundEnabled} />}
          </div>

          {/* Bottom Footer Status Bar */}
          <FooterStatusBar
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            crtEffect={crtEffect}
            onToggleCrt={handleToggleCrt}
            onOpenQuickContact={() => setIsContactOpen(true)}
          />

          {/* Contact & Transmission Modal */}
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </PipBoyFrame>
      </div>

      {/* Boot sequence overlays the rendered app so its content remains in the DOM. */}
      {isBooting && <TypewriterBoot onComplete={() => setIsBooting(false)} />}
    </>
  );
}
