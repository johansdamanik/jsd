export type TabType = 'STAT' | 'DATA' | 'INV' | 'MAP' | 'RADIO';

export type StatSubTab = 'STATUS' | 'SPECIAL' | 'PERKS';
export type DataSubTab = 'QUESTS' | 'EDUCATION' | 'TERMINAL';
export type InvSubTab = 'WEAPONS' | 'APPAREL' | 'AID' | 'MISC';

export type PipBoyTheme = 'green' | 'amber' | 'cyan' | 'white';

export interface SpecialStat {
  id: string;
  name: string;
  shortCode: string;
  score: number;
  category: string;
  iconName: string;
  tagline: string;
  description: string;
  keySkills: string[];
}

export interface Perk {
  id: string;
  title: string;
  issuer: string;
  date: string;
  rank: number;
  maxRank: number;
  badge: string;
  description: string;
  benefits: string[];
  link?: string;
}

export interface Quest {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'ACTIVE';
  type: 'MAIN QUEST' | 'SIDE QUEST';
  summary: string;
  objectives: string[];
  achievements: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  xpReward: number;
}

export interface Education {
  id: string;
  institution: string;
  program: string;
  period: string;
  location: string;
  score: string;
  highlight: string;
  modules: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: InvSubTab;
  weight: number;
  value: number;
  condition: number; // 0 - 100%
  description: string;
  effect: string;
  techType?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  description: string;
  genre: string;
  isPlaying: boolean;
}
