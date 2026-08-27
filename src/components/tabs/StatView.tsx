import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatSubTab, SpecialStat, Perk } from '../../types';
import { PROFILE, SPECIAL_STATS, PERKS_DATA } from '../../data/portfolioData';
import { VaultBoyGraphic, VaultBoyVariant } from '../VaultBoyGraphic';
import { playPipboyClick, playFanfare } from '../../utils/audio';
import { Layout, Code, Server, Database, Zap, Users, Cpu, ExternalLink, FolderGit2, Award, MapPin, Phone, Mail, Github, Linkedin, Globe, CheckCircle2, X, ChevronRight } from 'lucide-react';

interface StatViewProps {
  subTab: StatSubTab;
}

export const StatView: React.FC<StatViewProps> = ({ subTab }) => {
  const [selectedSpecialId, setSelectedSpecialId] = useState<string>(SPECIAL_STATS[0].id);
  const [selectedPerkId, setSelectedPerkId] = useState<string>(PERKS_DATA[0].id);
  const [mobileSpecialModalOpen, setMobileSpecialModalOpen] = useState(false);
  const [mobilePerkModalOpen, setMobilePerkModalOpen] = useState(false);

  const selectedSpecial = SPECIAL_STATS.find(s => s.id === selectedSpecialId) || SPECIAL_STATS[0];
  const selectedPerk = PERKS_DATA.find(p => p.id === selectedPerkId) || PERKS_DATA[0];

  const getVaultBoyVariant = (statId: string): VaultBoyVariant => {
    switch (statId) {
      case 'frontend': return 'frontend';
      case 'backend': return 'backend';
      case 'database': return 'database';
      case 'integrations': return 'integrations';
      case 'softskills': return 'softskills';
      case 'devops_ai': return 'devops';
      case 'collaboration': return 'collaboration';
      case 'problemsolving': return 'problemsolving';
      case 'ai': return 'ai';
      default: return 'developer';
    }
  };

  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        {/* SUBTAB: STATUS */}
        {subTab === 'STATUS' && (
          <motion.div
            key="status-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-2 sm:gap-4 min-h-full max-w-4xl mx-auto py-1 sm:py-2"
          >
            {/* Top Title */}
            <div className="text-center">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#50ff9c] filter drop-shadow-[0_0_8px_rgba(26,255,128,0.8)]">
                {PROFILE.title.toUpperCase()}
              </h2>
              <p className="text-[10px] sm:text-sm text-[#1aff80]/70 tracking-[0.12em] sm:tracking-widest mt-0.5">
                VAULT-111 CERTIFIED OPERATOR // ID: JSD-2026
              </p>
            </div>

            {/* Central Animated Vault Boy with Laptop & Radar circles */}
            <div className="my-1 sm:my-6 relative flex flex-col items-center justify-center">
              <VaultBoyGraphic
                variant="developer"
                size={160}
                alt="Johan Simeon Damanik building web applications"
              />
            </div>

            {/* Tagline Quote & Name */}
            <div className="text-center max-w-2xl px-1 sm:px-4 space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm md:text-base italic text-[#1aff80]/90 leading-relaxed font-mono">
                &ldquo;{PROFILE.tagline}&rdquo;
              </p>

              <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-[0.18em] sm:tracking-[0.25em] text-[#50ff9c] filter drop-shadow-[0_0_12px_rgba(26,255,128,0.9)]">
                {PROFILE.name.toUpperCase()}
              </h2>

              {/* Direct Info Badges */}
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-4 pt-1 sm:pt-2 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1 bg-[#1aff80]/10 border border-[#1aff80]/30 px-1.5 sm:px-2.5 py-0.5 sm:py-1">
                  <MapPin className="w-3.5 h-3.5 text-[#50ff9c]" />
                  {PROFILE.location}
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-1 bg-[#1aff80]/10 border border-[#1aff80]/30 px-1.5 sm:px-2.5 py-0.5 sm:py-1 hover:bg-[#1aff80]/30 hover:border-[#1aff80] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#50ff9c]" />
                  {PROFILE.email}
                </a>
                <a
                  href="https://wa.me/6281222234454"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 bg-[#1aff80]/10 border border-[#1aff80]/30 px-1.5 sm:px-2.5 py-0.5 sm:py-1 hover:bg-[#1aff80]/30 hover:border-[#1aff80] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#50ff9c]" />
                  {PROFILE.phone}
                </a>
                <a
                  href="/cv-johan-simeon-damanik.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 border border-[#1aff80]/30 bg-[#1aff80]/10 px-1.5 py-0.5 transition-colors hover:border-[#1aff80] hover:bg-[#1aff80]/30 sm:px-2.5 sm:py-1"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#50ff9c]" aria-hidden="true" />
                  RESUME
                </a>
              </div>

              {/* Summary text */}
              <div className="mt-2 sm:mt-4 p-2 sm:p-3 bg-[#011406]/70 border border-[#1aff80]/30 text-left text-[10px] sm:text-sm leading-relaxed text-[#1aff80]/80 font-mono">
                <span className="text-[#50ff9c] font-bold">[OPERATOR DOSSIER]:</span> {PROFILE.summary}
              </div>

              <a
                href="/projects/"
                className="mx-auto mt-2 inline-flex items-center gap-1 border border-[#1aff80] bg-[#1aff80] px-2.5 py-1 text-[10px] font-bold tracking-wider text-black transition-colors hover:bg-[#50ff9c] sm:mt-3 sm:text-xs"
              >
                <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
                VIEW PROJECT
              </a>
            </div>
          </motion.div>
        )}

        {/* SUBTAB: SPECIAL */}
        {subTab === 'SPECIAL' && (
          <motion.div
            key="special-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-5xl mx-auto items-start"
          >
            {/* Left Column: SPECIAL Stats List */}
            <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
              <div className="text-xs font-bold text-[#1aff80]/70 tracking-widest pb-1 border-b border-[#1aff80]/20 flex justify-between">
                <span>ATTRIBUTE</span>
                <span className="flex items-center gap-2">
                  <span className="lg:hidden text-[10px] text-[#50ff9c]/70">[TAP FOR DETAILS]</span>
                  <span>LEVEL</span>
                </span>
              </div>

              {SPECIAL_STATS.map((stat) => {
                const isSelected = stat.id === selectedSpecialId;
                return (
                  <button
                    key={stat.id}
                    id={`stat-row-${stat.id}`}
                    onClick={() => {
                      playPipboyClick(950, 0.04);
                      setSelectedSpecialId(stat.id);
                      setMobileSpecialModalOpen(true);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left font-mono text-sm sm:text-base font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1aff80] text-black shadow-[0_0_12px_#1aff80]'
                        : 'text-[#1aff80] hover:bg-[#1aff80]/15 border border-transparent hover:border-[#1aff80]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 lg:hidden opacity-60" />
                      <span className="tracking-wider">{stat.name}</span>
                    </div>
                    <span className="text-base sm:text-lg font-black">{stat.score}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Column (Desktop inline): Icon / Vault Boy + Detailed Description */}
            <div className="hidden lg:flex lg:col-span-7 flex-col items-center justify-between border border-[#1aff80]/30 p-5 bg-[#011406]/50 min-h-[360px]">
              {/* Central Glowing Icon / Vault Boy */}
              <div className="my-2">
                <VaultBoyGraphic variant={getVaultBoyVariant(selectedSpecial.id)} size={180} />
              </div>

              {/* Description Panel */}
              <div className="w-full text-left mt-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base sm:text-lg font-bold text-[#50ff9c] tracking-widest">
                    {selectedSpecial.name}
                  </h3>
                  <span className="text-xs text-[#1aff80]/70 tracking-wider">
                    {selectedSpecial.category}
                  </span>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-2" />

                <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono">
                  {selectedSpecial.description}
                </p>

                {/* Key Skills Tags */}
                <div className="mt-4 pt-3 border-t border-[#1aff80]/20">
                  <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider mb-2">
                    REINFORCED TECHNICAL ABILITIES:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSpecial.keySkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#1aff80]/15 border border-[#1aff80]/40 px-2 py-0.5 text-[#50ff9c]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBTAB: PERKS */}
        {subTab === 'PERKS' && (
          <motion.div
            key="perks-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-5xl mx-auto items-start"
          >
            {/* Left Column: Perks List */}
            <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
              <div className="text-xs font-bold text-[#1aff80]/70 tracking-widest pb-1 border-b border-[#1aff80]/20 flex justify-between">
                <span>ACCREDITED PERK</span>
                <span className="flex items-center gap-2">
                  <span className="lg:hidden text-[10px] text-[#50ff9c]/70">[TAP FOR DETAILS]</span>
                  <span>RANK</span>
                </span>
              </div>

              {PERKS_DATA.map((perk) => {
                const isSelected = perk.id === selectedPerkId;
                return (
                  <button
                    key={perk.id}
                    id={`perk-row-${perk.id}`}
                    onClick={() => {
                      playPipboyClick(1000, 0.04);
                      setSelectedPerkId(perk.id);
                      setMobilePerkModalOpen(true);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1aff80] text-black shadow-[0_0_12px_#1aff80]'
                        : 'text-[#1aff80] hover:bg-[#1aff80]/15 border border-transparent hover:border-[#1aff80]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{perk.badge}</span>
                      <span className="tracking-wider">{perk.title}</span>
                    </div>
                    <span className="text-xs font-mono font-bold">
                      {perk.rank}/{perk.maxRank} ★
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column (Desktop inline): Perk Badge & Benefits */}
            <div className="hidden lg:flex lg:col-span-7 flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#50ff9c] tracking-widest flex items-center gap-2">
                    <span>{selectedPerk.badge}</span>
                    <span>{selectedPerk.title}</span>
                  </h3>
                  <div className="text-xs text-[#1aff80]/70 tracking-wider mt-0.5">
                    ISSUED BY: {selectedPerk.issuer.toUpperCase()} ({selectedPerk.date})
                  </div>
                </div>

                <div className="text-sm font-bold text-[#50ff9c] bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40">
                  RANK {selectedPerk.rank}/{selectedPerk.maxRank}
                </div>
              </div>

              <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

              <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mb-4">
                {selectedPerk.description}
              </p>

              <div className="space-y-2 border-t border-[#1aff80]/20 pt-3">
                <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider">
                  PERK ATTRIBUTES & BONUSES:
                </div>
                {selectedPerk.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#50ff9c] mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {selectedPerk.link && (
                <div className="mt-5 pt-3 border-t border-[#1aff80]/20 flex justify-end">
                  <a
                    href={selectedPerk.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify credential for ${selectedPerk.title}`}
                    onClick={() => playFanfare()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MODAL: SPECIAL DETAILS */}
      <AnimatePresence>
        {mobileSpecialModalOpen && subTab === 'SPECIAL' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none lg:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              className="w-full max-w-md max-h-[90vh] flex flex-col bg-[#011406] border-2 border-[#1aff80] p-5 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1aff80]/40 shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#50ff9c] tracking-widest">
                  <span className="w-2 h-2 bg-[#1aff80] animate-pulse" />
                  <span>S.P.E.C.I.A.L. ATTRIBUTE DOSSIER</span>
                </div>
                <button
                  id="close-special-modal"
                  onClick={() => {
                    playPipboyClick();
                    setMobileSpecialModalOpen(false);
                  }}
                  className="p-1 text-[#1aff80]/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center py-2 shrink-0">
                <VaultBoyGraphic variant={getVaultBoyVariant(selectedSpecial.id)} size={120} />
              </div>

              {/* Modal Scrollable Content */}
              <div className="overflow-y-auto py-3 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-[#50ff9c] tracking-wider">
                      {selectedSpecial.name}
                    </h3>
                    <div className="text-xs text-[#1aff80]/70 mt-0.5">
                      {selectedSpecial.category}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#50ff9c] bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40">
                    LVL {selectedSpecial.score}
                  </div>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80]" />

                <div className="text-xs text-[#50ff9c] italic font-mono">
                  &ldquo;{selectedSpecial.tagline}&rdquo;
                </div>

                <p className="text-xs text-[#1aff80]/90 leading-relaxed font-mono">
                  {selectedSpecial.description}
                </p>

                <div className="space-y-2 border-t border-[#1aff80]/20 pt-2.5">
                  <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider">
                    REINFORCED TECHNICAL ABILITIES:
                  </div>
                  {selectedSpecial.keySkills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#50ff9c] mt-0.5 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-[#1aff80]/40 flex justify-end shrink-0">
                <button
                  id="close-special-modal-btn"
                  onClick={() => {
                    playPipboyClick();
                    setMobileSpecialModalOpen(false);
                  }}
                  className="w-full py-2 bg-[#1aff80] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO ATTRIBUTES LIST
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE MODAL: PERK DETAILS */}
      <AnimatePresence>
        {mobilePerkModalOpen && subTab === 'PERKS' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none lg:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              className="w-full max-w-md max-h-[90vh] flex flex-col bg-[#011406] border-2 border-[#1aff80] p-5 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1aff80]/40 shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#50ff9c] tracking-widest">
                  <span>{selectedPerk.badge}</span>
                  <span>PERK ACCREDITATION DOSSIER</span>
                </div>
                <button
                  id="close-perk-modal"
                  onClick={() => {
                    playPipboyClick();
                    setMobilePerkModalOpen(false);
                  }}
                  className="p-1 text-[#1aff80]/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="overflow-y-auto py-3 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-[#50ff9c] tracking-wider">
                      {selectedPerk.title}
                    </h3>
                    <div className="text-xs text-[#1aff80]/70 mt-0.5">
                      ISSUED BY: {selectedPerk.issuer.toUpperCase()} ({selectedPerk.date})
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#50ff9c] bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40">
                    RANK {selectedPerk.rank}/{selectedPerk.maxRank}
                  </div>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80]" />

                <p className="text-xs text-[#1aff80]/90 leading-relaxed font-mono">
                  {selectedPerk.description}
                </p>

                <div className="space-y-2 border-t border-[#1aff80]/20 pt-2.5">
                  <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider">
                    PERK ATTRIBUTES & BONUSES:
                  </div>
                  {selectedPerk.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#50ff9c] mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {selectedPerk.link && (
                  <div className="pt-2">
                    <a
                      href={selectedPerk.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify credential for ${selectedPerk.title}`}
                      onClick={() => playFanfare()}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1aff80]/20 border border-[#1aff80] text-[#50ff9c] font-bold text-xs tracking-wider hover:bg-[#1aff80] hover:text-black transition-colors"
                    >
                      <span>VERIFY CREDENTIAL LINK</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-[#1aff80]/40 flex justify-end shrink-0">
                <button
                  id="close-perk-modal-btn"
                  onClick={() => {
                    playPipboyClick();
                    setMobilePerkModalOpen(false);
                  }}
                  className="w-full py-2 bg-[#1aff80] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO PERKS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
