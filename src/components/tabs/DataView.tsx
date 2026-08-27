import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DataSubTab, Quest, Education } from '../../types';
import { QUESTS_DATA, EDUCATION_DATA, PROFILE } from '../../data/portfolioData';
import { playPipboyClick, playFanfare } from '../../utils/audio';
import { CheckSquare, Square, ExternalLink, Github, Award, MapPin, Calendar, Terminal as TerminalIcon, Sparkles, FolderGit2, X, ChevronRight } from 'lucide-react';

interface DataViewProps {
  subTab: DataSubTab;
}

export const DataView: React.FC<DataViewProps> = ({ subTab }) => {
  const [selectedQuestId, setSelectedQuestId] = useState<string>(QUESTS_DATA[0].id);
  const [selectedEduId, setSelectedEduId] = useState<string>(EDUCATION_DATA[0].id);
  const [filterType, setFilterType] = useState<'ALL' | 'MAIN' | 'SIDE'>('ALL');
  const [mobileQuestModalOpen, setMobileQuestModalOpen] = useState(false);
  const [mobileEduModalOpen, setMobileEduModalOpen] = useState(false);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'init',
      output: 'RobCo Unified Operating System v2.0.77 - Welcome, Operator Johan Simeon Damanik. Type "help" for valid terminal instructions.',
    },
  ]);

  const selectedQuest = QUESTS_DATA.find(q => q.id === selectedQuestId) || QUESTS_DATA[0];
  const selectedEdu = EDUCATION_DATA.find(e => e.id === selectedEduId) || EDUCATION_DATA[0];

  const filteredQuests = QUESTS_DATA.filter(q => {
    if (filterType === 'MAIN') return q.type === 'MAIN QUEST';
    if (filterType === 'SIDE') return q.type === 'SIDE QUEST';
    return true;
  });

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    playPipboyClick(1200, 0.03);
    const cmd = terminalInput.trim().toLowerCase();
    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = 'AVAILABLE COMMANDS: whoami, skills, quests, education, holotape, cv, contact, cat resume.txt, clear, caps, date';
        break;
      case 'whoami':
        response = `OPERATOR: ${PROFILE.name} // TITLE: ${PROFILE.title} // LOCATION: ${PROFILE.location}`;
        break;
      case 'skills':
        response = 'CORE PROFICIENCIES: Vue.js, Nuxt.js, React, Next.js, TypeScript, Node.js, NestJS, Laravel, PostgreSQL, MySQL, Prisma, Tailwind CSS, PayPal, Xendit, Docker.';
        break;
      case 'quests':
        response = `ACTIVE QUESTS // MAIN: Kartel Daun (Botanical Emporium), PlantEx (Global Flora Exporter) | SIDES: Kasira (POS), Levelup (RPG), SisiKita, YT Tools.`;
        break;
      case 'education':
        response = 'ACADEMICS: Hacktiv8 (Full Stack JS Distinction 96.7/100), Universitas Kristen Duta Wacana (B.Sc. Theology GPA 3.25/4.00)';
        break;
      case 'contact':
        response = `EMAIL: ${PROFILE.email} | PHONE/WA: ${PROFILE.phone} | LOCATION: ${PROFILE.location}`;
        break;
      case 'holotape':
      case 'cv':
        response = `OFFICIAL CV DOSSIER / HOLOTAPE (PDF): https://simeon.id/cv-johan-simeon-damanik.pdf`;
        break;
      case 'caps':
        response = `CURRENT BOTTLE CAPS IN VAULT: ${PROFILE.caps} CAPS.`;
        break;
      case 'date':
        response = `CURRENT WASTELAND STANDARD TIME: ${new Date().toLocaleDateString()} - ROBCO SYS ONLINE`;
        break;
      case 'cat resume.txt':
      case 'resume':
        response = PROFILE.summary;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = `COMMAND NOT RECOGNIZED: "${cmd}". Type "help" for a directory of operations.`;
    }

    setTerminalHistory(prev => [...prev, { command: terminalInput, output: response }]);
    setTerminalInput('');
  };

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        {/* QUESTS LOG: Experience & Projects Master-Detail View */}
        {subTab === 'QUESTS' && (
          <motion.div
            key="quests-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-6xl mx-auto items-start"
          >
            {/* Left Column: Quest Master List */}
            <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
              {/* Filter Row */}
              <div className="flex items-center justify-between pb-2 border-b border-[#1aff80]/20 text-xs">
                <span className="font-bold text-[#1aff80]/70 tracking-widest flex items-center gap-1.5">
                  <span>QUEST LOG</span>
                  <span className="lg:hidden text-[10px] text-[#50ff9c]/70">[TAP DETAILS]</span>
                </span>
                <div className="flex gap-2">
                  {(['ALL', 'MAIN', 'SIDE'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        playPipboyClick();
                        setFilterType(f);
                      }}
                      className={`px-1.5 py-0.5 text-[10px] font-bold tracking-wider cursor-pointer ${
                        filterType === f
                          ? 'bg-[#1aff80] text-black'
                          : 'text-[#1aff80]/60 hover:text-[#1aff80]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable list of Quests */}
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredQuests.map((quest) => {
                  const isSelected = quest.id === selectedQuestId;
                  const isComplete = quest.status === 'COMPLETED';

                  return (
                    <button
                      key={quest.id}
                      id={`quest-item-${quest.id}`}
                      onClick={() => {
                        playPipboyClick(900, 0.03);
                        setSelectedQuestId(quest.id);
                        setMobileQuestModalOpen(true);
                      }}
                      className={`w-full flex flex-col text-left p-2.5 font-mono transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#1aff80] text-black border-[#1aff80] shadow-[0_0_10px_#1aff80]'
                          : 'border-transparent hover:border-[#1aff80]/40 text-[#1aff80] hover:bg-[#1aff80]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-1.5 truncate">
                          {isComplete ? (
                            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span className="truncate">{quest.title}</span>
                        </div>
                        <span
                          className={`text-[9px] px-1 py-0.2 shrink-0 ${
                            isSelected ? 'bg-black text-[#50ff9c]' : 'bg-[#1aff80]/20 text-[#50ff9c]'
                          }`}
                        >
                          {quest.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] mt-1 opacity-80">
                        <span className="truncate">{quest.organization}</span>
                        <span className="shrink-0 font-mono">+{quest.xpReward} XP</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column (Desktop inline): Quest Detail & Expanded Achievements */}
            <div className="hidden lg:flex lg:col-span-7 flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
              {/* Header */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-[#50ff9c] bg-[#1aff80]/20 px-2 py-0.5 border border-[#1aff80]/30">
                    {selectedQuest.type} // {selectedQuest.status}
                  </span>
                  <span className="text-xs font-bold text-[#50ff9c] font-mono">
                    +{selectedQuest.xpReward} REWARD XP
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-bold text-[#50ff9c] tracking-wide mt-1">
                  {selectedQuest.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#1aff80]/80">
                  <span className="font-bold text-[#1aff80]">
                    {selectedQuest.role} @ {selectedQuest.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#50ff9c]" />
                    {selectedQuest.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#50ff9c]" />
                    {selectedQuest.location}
                  </span>
                </div>
              </div>

              <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

              {/* Summary */}
              <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mb-4">
                {selectedQuest.summary}
              </p>

              {/* Quest Objectives Section */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold text-[#50ff9c] tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>QUEST OBJECTIVES COMPLETED:</span>
                </div>
                <div className="space-y-1.5 pl-2 border-l border-[#1aff80]/30">
                  {selectedQuest.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]/90">
                      <span className="text-[#50ff9c]">[x]</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Achievements Section */}
              {selectedQuest.achievements.length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-bold text-[#50ff9c] tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>EXPANDED IMPACT & ACHIEVEMENTS:</span>
                  </div>
                  <div className="space-y-1.5 pl-2 border-l border-[#1aff80]/30">
                    {selectedQuest.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]/90">
                        <span className="text-[#50ff9c]">★</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Gained / Loot */}
              <div className="pt-3 border-t border-[#1aff80]/20">
                <div className="text-[11px] font-bold text-[#1aff80]/70 tracking-wider mb-2">
                  TECH STACK & DEPLOYMENT LOOT:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedQuest.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#1aff80]/15 border border-[#1aff80]/40 px-2 py-0.5 text-[#50ff9c]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons (Demo URL / GitHub) */}
              {(selectedQuest.demoUrl || selectedQuest.githubUrl) && (
                <div className="mt-4 pt-3 border-t border-[#1aff80]/20 flex flex-wrap gap-3 justify-end">
                  {selectedQuest.githubUrl && (
                    <a
                      href={selectedQuest.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Inspect source code for ${selectedQuest.title}`}
                      onClick={() => playFanfare()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1aff80] bg-[#1aff80]/15 text-[#1aff80] font-bold text-xs tracking-wider hover:bg-[#1aff80] hover:text-black transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>INSPECT SOURCE CODE</span>
                    </a>
                  )}
                  {selectedQuest.demoUrl && (
                    <a
                      href={selectedQuest.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Launch live platform for ${selectedQuest.title}`}
                      onClick={() => playFanfare()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors shadow-[0_0_8px_#1aff80]"
                    >
                      <span>LAUNCH LIVE PLATFORM</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* EDUCATION SUBTAB */}
        {subTab === 'EDUCATION' && (
          <motion.div
            key="education-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-5xl mx-auto items-start"
          >
            {/* Left list of Education */}
            <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
              <div className="text-xs font-bold text-[#1aff80]/70 tracking-widest pb-1 border-b border-[#1aff80]/20 flex justify-between">
                <span>ACADEMIC INSTITUTIONS</span>
                <span className="lg:hidden text-[10px] text-[#50ff9c]/70">[TAP DETAILS]</span>
              </div>

              {EDUCATION_DATA.map((edu) => {
                const isSelected = edu.id === selectedEduId;
                return (
                  <button
                    key={edu.id}
                    id={`edu-item-${edu.id}`}
                    onClick={() => {
                      playPipboyClick(1000, 0.04);
                      setSelectedEduId(edu.id);
                      setMobileEduModalOpen(true);
                    }}
                    className={`w-full flex flex-col text-left p-3 font-mono transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1aff80] text-black border-[#1aff80] shadow-[0_0_10px_#1aff80]'
                        : 'border-transparent hover:border-[#1aff80]/40 text-[#1aff80] hover:bg-[#1aff80]/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{edu.institution}</span>
                    <span className="text-[11px] opacity-80 mt-0.5">{edu.program}</span>
                    <span className="text-[10px] mt-1 font-mono font-semibold">{edu.score}</span>
                  </button>
                );
              })}
            </div>

            {/* Right details of Selected Education (Desktop inline) */}
            <div className="hidden lg:flex lg:col-span-7 flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-[#50ff9c] tracking-wide">
                    {selectedEdu.institution}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1aff80] mt-0.5 font-bold">
                    {selectedEdu.program}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#50ff9c] bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40">
                  {selectedEdu.score}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#1aff80]/70 mt-2">
                <span>{selectedEdu.period}</span>
                <span>•</span>
                <span>{selectedEdu.location}</span>
              </div>

              <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

              <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mb-4">
                {selectedEdu.highlight}
              </p>

              <div className="space-y-2 border-t border-[#1aff80]/20 pt-3">
                <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider">
                  CURRICULUM PHASES & SPECIALIZATIONS:
                </div>
                {selectedEdu.modules.map((mod, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]">
                    <span className="text-[#50ff9c] font-bold">&gt;&gt;</span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TERMINAL PROMPT SUBTAB */}
        {subTab === 'TERMINAL' && (
          <motion.div
            key="terminal-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-full max-w-4xl mx-auto border border-[#1aff80]/30 p-4 bg-[#011406]/80 font-mono text-xs sm:text-sm"
          >
            <div className="flex justify-between items-center pb-2 border-b border-[#1aff80]/20 text-[#1aff80]/70 text-xs">
              <span className="flex items-center gap-1.5 font-bold">
                <TerminalIcon className="w-3.5 h-3.5 text-[#50ff9c]" />
                ROBCO UNIFIED TERMINAL // COMMAND PROTOCOL
              </span>
              <span>TYPE &quot;HELP&quot;</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 py-3 max-h-[400px]">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-[#50ff9c]">
                    <span>&gt;</span>
                    <span className="font-bold">{item.command}</span>
                  </div>
                  <div className="text-[#1aff80]/90 pl-4 leading-relaxed whitespace-pre-wrap">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleTerminalSubmit} className="pt-2 border-t border-[#1aff80]/20 flex items-center gap-2">
              <span className="text-[#50ff9c] font-bold" aria-hidden="true">&gt;</span>
              <label htmlFor="pipboy-terminal-input" className="sr-only">
                Enter terminal command
              </label>
              <input
                id="pipboy-terminal-input"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Enter command (e.g. whoami, skills, quests, contact, clear)..."
                className="flex-1 bg-transparent text-[#1aff80] focus:outline-none placeholder-[#1aff80]/40 font-mono text-xs sm:text-sm"
              />
              <button
                type="submit"
                aria-label="Execute terminal command"
                className="px-3 py-1 bg-[#1aff80] text-black font-bold text-xs hover:bg-white transition-colors cursor-pointer"
              >
                EXECUTE
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MODAL: QUEST DETAILS */}
      <AnimatePresence>
        {mobileQuestModalOpen && subTab === 'QUESTS' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none lg:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              className="w-full max-w-lg max-h-[90vh] flex flex-col bg-[#011406] border-2 border-[#1aff80] p-5 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1aff80]/40 shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#50ff9c] tracking-widest">
                  <span className="w-2 h-2 bg-[#1aff80] animate-pulse" />
                  <span>MISSION DEPLOYMENT DOSSIER</span>
                </div>
                <button
                  id="close-quest-modal"
                  onClick={() => {
                    playPipboyClick();
                    setMobileQuestModalOpen(false);
                  }}
                  className="p-1 text-[#1aff80]/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto py-3 space-y-3.5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-[#50ff9c] bg-[#1aff80]/20 px-2 py-0.5 border border-[#1aff80]/30">
                    {selectedQuest.type} // {selectedQuest.status}
                  </span>
                  <span className="text-xs font-bold text-[#50ff9c] font-mono">
                    +{selectedQuest.xpReward} XP
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#50ff9c]">
                    {selectedQuest.title}
                  </h3>
                  <div className="text-xs text-[#1aff80]/80 mt-1 flex flex-wrap gap-2">
                    <span className="font-bold text-[#50ff9c]">{selectedQuest.role}</span>
                    <span>@ {selectedQuest.organization}</span>
                    <span>({selectedQuest.period})</span>
                  </div>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80]" />

                <p className="text-xs text-[#1aff80]/90 leading-relaxed">
                  {selectedQuest.summary}
                </p>

                {/* Objectives */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-[#50ff9c] flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>OBJECTIVES:</span>
                  </div>
                  <div className="space-y-1 pl-2 border-l border-[#1aff80]/30">
                    {selectedQuest.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-[#1aff80]">
                        <span className="text-[#50ff9c]">[x]</span>
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {selectedQuest.achievements.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-[#50ff9c] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>IMPACT & ACHIEVEMENTS:</span>
                    </div>
                    <div className="space-y-1 pl-2 border-l border-[#1aff80]/30">
                      {selectedQuest.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#1aff80]">
                          <span className="text-[#50ff9c]">★</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="pt-2 border-t border-[#1aff80]/20">
                  <div className="text-[10px] font-bold text-[#1aff80]/60 tracking-wider mb-1.5">
                    TECH STACK & LOOT:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedQuest.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#1aff80]/15 border border-[#1aff80]/40 px-2 py-0.5 text-[#50ff9c]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(selectedQuest.demoUrl || selectedQuest.githubUrl) && (
                  <div className="pt-2 flex flex-col gap-2">
                    {selectedQuest.demoUrl && (
                      <a
                        href={selectedQuest.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Launch live platform for ${selectedQuest.title}`}
                        onClick={() => playFanfare()}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors"
                      >
                        <span>LAUNCH LIVE PLATFORM</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {selectedQuest.githubUrl && (
                      <a
                        href={selectedQuest.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inspect source code for ${selectedQuest.title}`}
                        onClick={() => playFanfare()}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1aff80]/15 border border-[#1aff80] text-[#1aff80] font-bold text-xs tracking-wider hover:bg-[#1aff80] hover:text-black transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>INSPECT SOURCE CODE</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#1aff80]/40 flex justify-end shrink-0">
                <button
                  id="close-quest-modal-btn"
                  onClick={() => {
                    playPipboyClick();
                    setMobileQuestModalOpen(false);
                  }}
                  className="w-full py-2 bg-[#1aff80] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO QUEST LOG
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE MODAL: EDUCATION DETAILS */}
      <AnimatePresence>
        {mobileEduModalOpen && subTab === 'EDUCATION' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none lg:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              className="w-full max-w-md max-h-[90vh] flex flex-col bg-[#011406] border-2 border-[#1aff80] p-5 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1aff80]/40 shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#50ff9c] tracking-widest">
                  <Award className="w-4 h-4 text-[#50ff9c]" />
                  <span>ACADEMIC DOSSIER</span>
                </div>
                <button
                  id="close-edu-modal"
                  onClick={() => {
                    playPipboyClick();
                    setMobileEduModalOpen(false);
                  }}
                  className="p-1 text-[#1aff80]/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto py-3 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-[#50ff9c]">
                      {selectedEdu.institution}
                    </h3>
                    <div className="text-xs text-[#1aff80] font-bold mt-0.5">
                      {selectedEdu.program}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#50ff9c] bg-[#1aff80]/20 px-2 py-0.5 border border-[#1aff80]/40">
                    {selectedEdu.score}
                  </div>
                </div>

                <div className="text-xs text-[#1aff80]/70 flex items-center gap-2">
                  <span>{selectedEdu.period}</span>
                  <span>•</span>
                  <span>{selectedEdu.location}</span>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80]" />

                <p className="text-xs text-[#1aff80]/90 leading-relaxed font-mono">
                  {selectedEdu.highlight}
                </p>

                <div className="space-y-1.5 border-t border-[#1aff80]/20 pt-2.5">
                  <div className="text-[11px] font-bold text-[#1aff80]/60 tracking-wider">
                    CURRICULUM PHASES & SPECIALIZATIONS:
                  </div>
                  {selectedEdu.modules.map((mod, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1aff80]">
                      <span className="text-[#50ff9c] font-bold">&gt;&gt;</span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#1aff80]/40 flex justify-end shrink-0">
                <button
                  id="close-edu-modal-btn"
                  onClick={() => {
                    playPipboyClick();
                    setMobileEduModalOpen(false);
                  }}
                  className="w-full py-2 bg-[#1aff80] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO EDUCATION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
