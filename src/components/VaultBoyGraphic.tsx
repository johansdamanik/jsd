import React from 'react';
import { motion } from 'motion/react';

export type VaultBoyVariant =
  | 'developer'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'integrations'
  | 'softskills'
  | 'devops'
  | 'ai'
  | 'collaboration'
  | 'problemsolving'
  | 'strength'
  | 'perception'
  | 'endurance'
  | 'charisma'
  | 'intelligence'
  | 'agility'
  | 'luck'
  | 'perk'
  | 'quest';

interface VaultBoyGraphicProps {
  variant: VaultBoyVariant;
  className?: string;
  size?: number;
  alt?: string;
}

const VAULT_BOY_IMAGES: Record<VaultBoyVariant, string> = {
  developer: '/images/simeon-char.webp',
  frontend: '/images/front-end.webp',
  backend: '/images/back-end.webp',
  database: '/images/database.webp',
  integrations: '/images/payment-and-api.webp',
  softskills: '/images/soft-skills.webp',
  devops: '/images/ci-cd.webp',
  ai: '/images/ai-development.webp',
  collaboration: '/images/collaboration.webp',
  problemsolving: '/images/problem-solving.webp',
  strength: '/images/front-end.webp',
  perception: '/images/ai-development.webp',
  endurance: '/images/back-end.webp',
  charisma: '/images/soft-skills.webp',
  intelligence: '/images/database.webp',
  agility: '/images/payment-and-api.webp',
  luck: '/images/ci-cd.webp',
  perk: '/images/soft-skills.webp',
  quest: '/images/problem-solving.webp',
};

export const VaultBoyGraphic: React.FC<VaultBoyGraphicProps> = ({ variant, className = '', size = 200, alt = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background glowing radar circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div
          className="rounded-full border border-[#1aff80] animate-pulse"
          style={{ width: size * 0.86, height: size * 0.86 }}
        />
        <div
          className="absolute rounded-full border border-[#1aff80]/40"
          style={{ width: size * 1.05, height: size * 1.05 }}
        />
        <div
          className="absolute rounded-full border border-dashed border-[#1aff80]/20"
          style={{ width: size * 1.24, height: size * 1.24 }}
        />
      </div>

      <motion.img
        src={VAULT_BOY_IMAGES[variant]}
        alt={alt}
        width={size}
        height={size}
        loading={variant === 'developer' ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={variant === 'developer' ? 'high' : 'auto'}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="object-contain filter drop-shadow-[0_0_8px_rgba(26,255,128,0.7)]"
      />
    </div>
  );
};

// Pip-Boy-inspired developer with wrist computer
const DeveloperVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.15">
    {/* Head, ears, and classic swept hair */}
    <circle cx="120" cy="72" r="29" />
    <path d="M 94 65 Q 101 39 126 43 Q 148 43 151 61 Q 140 56 130 59 Q 116 53 102 68 Z" fill="#1aff80" fillOpacity="0.55" />
    <path d="M 91 69 Q 85 70 88 80 Q 91 87 97 83" fill="none" />
    <path d="M 149 69 Q 155 70 152 80 Q 149 87 143 83" fill="none" />
    {/* Friendly Pip-Boy face */}
    <circle cx="110" cy="72" r="3" fill="#1aff80" />
    <circle cx="130" cy="72" r="3" fill="#1aff80" />
    <path d="M 108 88 Q 120 99 132 88" fill="none" strokeWidth="3" />

    {/* Vault jumpsuit torso and collar */}
    <path d="M 101 102 L 139 102 L 153 158 L 87 158 Z" />
    <path d="M 108 101 L 120 116 L 132 101" fill="none" strokeWidth="3" />
    <line x1="120" y1="116" x2="120" y2="158" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M 91 148 L 149 148" fill="none" strokeWidth="2" />
    <text x="111" y="143" fill="#1aff80" stroke="none" fontSize="9" fontFamily="monospace">13</text>

    {/* Left arm displaying the Pip-Boy wrist computer */}
    <path d="M 101 111 L 79 139 L 91 151 L 111 129" fill="none" strokeWidth="3" />
    <path d="M 82 136 L 104 151" fill="none" strokeWidth="5" />
    <rect x="76" y="128" width="31" height="24" rx="4" fill="#001a08" stroke="#1aff80" strokeWidth="2.5" transform="rotate(-22 76 128)" />
    <rect x="82" y="133" width="17" height="10" fill="#1aff80" fillOpacity="0.35" stroke="#1aff80" strokeWidth="1.5" transform="rotate(-22 82 133)" />
    <line x1="85" y1="138" x2="96" y2="134" strokeWidth="1.5" />
    <circle cx="103" cy="139" r="2" fill="#1aff80" />

    {/* Right arm and raised thumb */}
    <path d="M 139 111 L 160 137 L 151 151 L 130 129" fill="none" strokeWidth="3" />
    <path d="M 157 137 Q 166 128 169 135 Q 170 140 164 143 L 153 151" fill="#1aff80" fillOpacity="0.3" />

    {/* Legs and heavy boots */}
    <path d="M 101 158 L 96 204 L 112 204 L 119 161" />
    <path d="M 139 158 L 144 204 L 128 204 L 121 161" />
    <path d="M 90 204 L 114 204 Q 116 214 101 214 L 87 211 Z" fill="#1aff80" />
    <path d="M 126 204 L 150 204 L 153 211 Q 139 214 124 214 Z" fill="#1aff80" />
  </g>
);

// 1. Front-End: Vault Boy painting a UI wireframe browser window with paintbrush and palette
const FrontendVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Browser / Canvas Window on right */}
    <rect x="110" y="32" width="115" height="105" rx="6" fill="#001807" stroke="#1aff80" strokeWidth="2.5" />
    {/* Window header dots */}
    <circle cx="120" cy="40" r="2" fill="#1aff80" />
    <circle cx="128" cy="40" r="2" fill="#1aff80" />
    <circle cx="136" cy="40" r="2" fill="#1aff80" />
    <line x1="110" y1="46" x2="225" y2="46" stroke="#1aff80" strokeWidth="1.5" />
    {/* Browser mockup controls */}
    <rect x="120" y="52" width="30" height="8" rx="1" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="1" />
    <rect x="175" y="52" width="18" height="6" rx="1" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="1" />
    <rect x="198" y="52" width="18" height="6" rx="1" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="1" />
    {/* Wireframe Hero box being painted */}
    <rect x="120" y="66" width="95" height="22" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="1.5" />
    {/* Content lines */}
    <line x1="120" y1="94" x2="165" y2="94" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="120" y1="100" x2="165" y2="100" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="120" y1="106" x2="165" y2="106" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="120" y1="112" x2="165" y2="112" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="120" y1="118" x2="165" y2="118" stroke="#1aff80" strokeWidth="1.5" />
    {/* Image wireframe box with X */}
    <rect x="175" y="93" width="38" height="36" fill="none" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="175" y1="93" x2="213" y2="129" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="213" y1="93" x2="175" y2="129" stroke="#1aff80" strokeWidth="1.5" />

    {/* Vault Boy Head & Classic Hair */}
    <circle cx="68" cy="65" r="24" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 48 50 Q 68 32 88 42 Q 95 55 86 62 Q 68 50 48 50 Z" fill="#1aff80" />
    {/* Smile & Eyes */}
    <circle cx="60" cy="62" r="2.5" fill="#1aff80" />
    <circle cx="76" cy="62" r="2.5" fill="#1aff80" />
    <path d="M 60 74 Q 68 82 76 74" fill="none" strokeWidth="2.5" />

    {/* Right Arm extended painting */}
    <path d="M 86 96 L 125 82 L 138 82" strokeWidth="3.5" fill="none" />
    {/* Paintbrush */}
    <line x1="105" y1="84" x2="155" y2="78" stroke="#1aff80" strokeWidth="3" />
    <path d="M 152 75 Q 165 77 155 82 Q 148 84 152 75 Z" fill="#1aff80" />

    {/* Torso & Vault Suit */}
    <path d="M 52 90 L 88 90 L 82 145 L 48 145 Z" fill="#1aff80" fillOpacity="0.3" />
    <line x1="68" y1="90" x2="68" y2="145" strokeWidth="2" strokeDasharray="3 3" />

    {/* Left Arm holding Artist Palette */}
    <path d="M 50 96 L 36 122 L 52 130" strokeWidth="3" fill="none" />
    {/* Artist Palette */}
    <path d="M 20 135 C 10 115 50 105 68 122 C 78 132 72 152 56 154 C 42 156 30 162 20 135 Z" fill="#1aff80" fillOpacity="0.45" stroke="#1aff80" strokeWidth="2" />
    <circle cx="34" cy="125" r="3.5" fill="#001807" stroke="#1aff80" strokeWidth="1.5" />
    <circle cx="48" cy="123" r="3.5" fill="#1aff80" />
    <circle cx="58" cy="133" r="3.5" fill="#1aff80" />
    <circle cx="46" cy="142" r="3.5" fill="#1aff80" />
    <circle cx="30" cy="137" r="3.5" fill="#1aff80" />

    {/* Legs & Shoes */}
    <path d="M 52 145 L 48 200 L 62 200 L 66 150" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 76 145 L 88 200 L 74 200 L 68 150" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 40 200 L 64 200 Q 66 210 44 208 Z" fill="#1aff80" />
    <path d="M 70 200 L 94 200 Q 96 210 74 208 Z" fill="#1aff80" />
  </g>
);

// 2. Back-End: Vault Boy fixing / wiring up a large Server Rack Tower with soldering tool & cables
const BackendVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Giant Server Rack on the right */}
    <rect x="122" y="30" width="96" height="175" rx="4" fill="#001a08" stroke="#1aff80" strokeWidth="3" />
    {/* Server rack vents & slots */}
    <rect x="130" y="38" width="80" height="20" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="1.5" />
    <circle cx="138" cy="48" r="2.5" fill="#1aff80" />
    <circle cx="146" cy="48" r="2.5" fill="#1aff80" />
    <line x1="158" y1="45" x2="202" y2="45" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="158" y1="51" x2="202" y2="51" stroke="#1aff80" strokeWidth="1.5" />

    <rect x="130" y="62" width="80" height="20" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="1.5" />
    <circle cx="138" cy="72" r="2.5" fill="#1aff80" />
    <circle cx="146" cy="72" r="2.5" fill="#1aff80" />
    <line x1="158" y1="69" x2="202" y2="69" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="158" y1="75" x2="202" y2="75" stroke="#1aff80" strokeWidth="1.5" />

    {/* Open motherboard / wiring panel */}
    <rect x="130" y="86" width="40" height="42" fill="#002b0e" stroke="#1aff80" strokeWidth="2" />
    {/* Motherboard glow & trace lines */}
    <path d="M 136 100 Q 146 92 152 104 T 164 96" fill="none" stroke="#50ff9c" strokeWidth="2" />
    <path d="M 138 116 Q 148 110 156 120" fill="none" stroke="#50ff9c" strokeWidth="2" />

    {/* Side status LED stack */}
    <rect x="174" y="88" width="36" height="38" fill="#1aff80" fillOpacity="0.2" stroke="#1aff80" strokeWidth="1.5" />
    <circle cx="182" cy="95" r="2" fill="#1aff80" />
    <circle cx="192" cy="95" r="2" fill="#1aff80" />
    <circle cx="182" cy="105" r="2" fill="#1aff80" />
    <circle cx="192" cy="105" r="2" fill="#1aff80" />
    <circle cx="182" cy="115" r="2" fill="#1aff80" />
    <circle cx="192" cy="115" r="2" fill="#1aff80" />

    {/* Lower server rack drawers */}
    <rect x="130" y="132" width="80" height="20" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="1.5" />
    <rect x="130" y="156" width="80" height="20" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="1.5" />
    <rect x="130" y="180" width="80" height="18" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="1.5" />

    {/* Vault Boy Head & Focused expression */}
    <circle cx="68" cy="72" r="22" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 50 56 Q 70 38 88 48 Q 94 60 84 66 Q 68 56 50 56 Z" fill="#1aff80" />
    {/* Determined Eyebrows & Eyes */}
    <path d="M 58 66 L 66 69" strokeWidth="2.5" />
    <path d="M 80 66 L 72 69" strokeWidth="2.5" />
    <circle cx="62" cy="73" r="2" fill="#1aff80" />
    <circle cx="76" cy="73" r="2" fill="#1aff80" />
    <path d="M 62 82 Q 70 86 78 82" fill="none" strokeWidth="2.5" />

    {/* Vault Suit Torso */}
    <path d="M 54 94 L 88 94 L 82 152 L 48 152 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Left Arm holding wiring */}
    <path d="M 54 100 L 76 122 L 96 112" strokeWidth="3.5" fill="none" />
    {/* Right Arm holding Soldering/Cabling Probe */}
    <path d="M 86 98 L 115 95 L 126 102" strokeWidth="3.5" fill="none" />
    {/* Probe Tool */}
    <polygon points="126,102 144,98 128,107" fill="#1aff80" />

    {/* Cables hanging down from server to floor */}
    <path d="M 132 108 C 110 125 100 180 30 195" fill="none" stroke="#1aff80" strokeWidth="3" />
    <path d="M 136 116 C 118 135 115 190 20 205" fill="none" stroke="#1aff80" strokeWidth="2.5" />
    <path d="M 140 120 C 125 150 120 200 45 208" fill="none" stroke="#1aff80" strokeWidth="2" />

    {/* Legs */}
    <path d="M 52 152 L 40 205 L 56 205 L 66 155" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 76 152 L 90 205 L 75 205 L 68 155" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 32 205 L 58 205 Q 60 214 36 212 Z" fill="#1aff80" />
    <path d="M 72 205 L 98 205 Q 100 214 76 212 Z" fill="#1aff80" />
  </g>
);

// 3. Database: Vault Boy searching and organizing Punchcards in a tall File Cabinet
const DatabaseVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Tall Vault-Tec 3-Drawer File Cabinet on the left */}
    <rect x="22" y="44" width="94" height="162" rx="4" fill="#001a08" stroke="#1aff80" strokeWidth="3" />
    {/* Top Drawer */}
    <rect x="30" y="52" width="78" height="42" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="2" />
    <rect x="52" y="60" width="34" height="12" rx="2" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="56" y1="80" x2="82" y2="80" stroke="#1aff80" strokeWidth="3" />

    {/* Open Middle Drawer (with files and punchcards) */}
    <polygon points="26,100 114,100 134,136 46,136" fill="#002e10" stroke="#1aff80" strokeWidth="2" />
    <rect x="46" y="112" width="80" height="46" fill="#001807" stroke="#1aff80" strokeWidth="2" />
    <rect x="70" y="122" width="32" height="12" rx="2" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="72" y1="146" x2="100" y2="146" stroke="#1aff80" strokeWidth="3" />

    {/* Folders inside drawer */}
    <line x1="52" y1="110" x2="52" y2="132" stroke="#1aff80" strokeWidth="2" />
    <line x1="58" y1="108" x2="58" y2="132" stroke="#1aff80" strokeWidth="2" />
    <line x1="64" y1="106" x2="64" y2="132" stroke="#1aff80" strokeWidth="2" />

    {/* Bottom Drawer */}
    <rect x="30" y="162" width="78" height="40" fill="#1aff80" fillOpacity="0.15" stroke="#1aff80" strokeWidth="2" />
    <line x1="56" y1="184" x2="82" y2="184" stroke="#1aff80" strokeWidth="3" />

    {/* Vault Boy on the right reaching into cabinet */}
    <circle cx="168" cy="65" r="24" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 148 50 Q 168 32 188 42 Q 195 55 186 62 Q 168 50 148 50 Z" fill="#1aff80" />
    <circle cx="160" cy="62" r="2.5" fill="#1aff80" />
    <circle cx="176" cy="62" r="2.5" fill="#1aff80" />
    <path d="M 160 74 Q 168 82 176 74" fill="none" strokeWidth="2.5" />

    {/* Left Arm reaching into drawer */}
    <path d="M 152 92 L 108 108 L 92 118" strokeWidth="3.5" fill="none" />
    {/* Right Arm holding Punchcards */}
    <path d="M 184 92 L 175 125 L 160 132" strokeWidth="3.5" fill="none" />

    {/* Punchcards fan in right hand */}
    <rect x="135" y="105" width="22" height="34" rx="2" transform="rotate(-15 135 105)" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="1.5" />
    <rect x="145" y="106" width="22" height="34" rx="2" transform="rotate(10 145 106)" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="1.5" />
    {/* Punchcard dots */}
    <circle cx="140" cy="115" r="1" fill="#001a08" />
    <circle cx="143" cy="120" r="1" fill="#001a08" />
    <circle cx="146" cy="115" r="1" fill="#001a08" />
    <circle cx="152" cy="115" r="1" fill="#001a08" />
    <circle cx="156" cy="120" r="1" fill="#001a08" />

    {/* Torso */}
    <path d="M 152 90 L 188 90 L 182 150 L 148 150 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Legs */}
    <path d="M 152 150 L 142 205 L 158 205 L 166 155" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 176 150 L 195 205 L 180 205 L 168 155" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 134 205 L 160 205 Q 162 214 138 212 Z" fill="#1aff80" />
    <path d="M 174 205 L 200 205 Q 202 214 178 212 Z" fill="#1aff80" />
  </g>
);

// 4. Integrations & Payments: Vault Boy plugging a money bag directly into a retro computer terminal
const IntegrationsVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Retro Computer Terminal on right */}
    <path d="M 148 100 L 215 100 L 225 155 L 138 155 Z" fill="#001a08" stroke="#1aff80" strokeWidth="2.5" />
    {/* Terminal CRT Screen */}
    <rect x="154" y="106" width="55" height="38" rx="4" fill="#002b0f" stroke="#1aff80" strokeWidth="2" />
    <path d="M 158 114 Q 182 110 204 114" fill="none" stroke="#50ff9c" strokeWidth="1.5" />
    <circle cx="162" cy="125" r="2" fill="#50ff9c" />
    <line x1="168" y1="125" x2="198" y2="125" stroke="#50ff9c" strokeWidth="1.5" />
    {/* Terminal Keyboard Base */}
    <polygon points="132,155 230,155 220,192 122,192" fill="#001506" stroke="#1aff80" strokeWidth="2.5" />
    {/* Keyboard key grid */}
    <line x1="138" y1="164" x2="218" y2="164" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="134" y1="172" x2="214" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="130" y1="180" x2="210" y2="180" stroke="#1aff80" strokeWidth="1.5" />

    {/* Money Bag ($) on left */}
    <path d="M 28 178 C 18 160 30 135 48 135 C 54 125 68 125 74 135 C 92 135 104 160 94 178 C 88 194 34 194 28 178 Z" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="2.5" />
    {/* Tied bag top */}
    <polygon points="50,135 72,135 78,122 44,122" fill="#1aff80" stroke="#1aff80" strokeWidth="2" />
    {/* Big Dollar Sign on bag */}
    <text x="52" y="172" fill="#001807" stroke="#1aff80" strokeWidth="1" fontSize="24" fontWeight="bold" fontFamily="monospace">$</text>

    {/* Vault Boy in center connecting cable from Money Bag to Terminal */}
    <circle cx="95" cy="64" r="23" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 75 50 Q 95 32 115 42 Q 122 55 113 62 Q 95 50 75 50 Z" fill="#1aff80" />
    <circle cx="88" cy="62" r="2.5" fill="#1aff80" />
    <circle cx="104" cy="62" r="2.5" fill="#1aff80" />
    <path d="M 88 74 Q 96 82 104 74" fill="none" strokeWidth="2.5" />

    {/* Torso */}
    <path d="M 80 88 L 116 88 L 110 142 L 76 142 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Arms holding power/API cable */}
    <path d="M 80 94 L 62 120 L 74 124" strokeWidth="3.5" fill="none" />
    <path d="M 112 94 L 126 118 L 118 124" strokeWidth="3.5" fill="none" />

    {/* Cable connecting money bag and plug in hands to terminal */}
    <path d="M 60 148 C 65 170 70 145 74 124" fill="none" stroke="#1aff80" strokeWidth="3.5" />
    <path d="M 118 124 C 135 140 145 175 160 145" fill="none" stroke="#1aff80" strokeWidth="3.5" />
    {/* Electric Plug connectors joining in hands */}
    <rect x="74" y="118" width="10" height="8" rx="1" fill="#1aff80" />
    <rect x="110" y="118" width="10" height="8" rx="1" fill="#1aff80" />
    <line x1="84" y1="122" x2="110" y2="122" stroke="#50ff9c" strokeWidth="2.5" strokeDasharray="2 2" />

    {/* Legs */}
    <path d="M 80 142 L 72 195 L 86 195 L 94 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 104 142 L 118 195 L 105 195 L 96 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 64 195 L 88 195 Q 90 204 68 202 Z" fill="#1aff80" />
    <path d="M 100 195 L 124 195 Q 126 204 104 202 Z" fill="#1aff80" />
  </g>
);

// 5. Soft Skills / Charisma: Two Vault Boys shaking hands happily in collaboration
const SoftSkillsVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Left Vault Boy */}
    <circle cx="68" cy="62" r="22" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 50 48 Q 68 32 86 42 Q 92 54 84 60 Q 68 50 50 48 Z" fill="#1aff80" />
    {/* Wink / Happy eye */}
    <path d="M 58 60 Q 62 56 66 60" fill="none" strokeWidth="2.5" />
    <circle cx="76" cy="60" r="2.5" fill="#1aff80" />
    <path d="M 60 72 Q 68 80 76 72" fill="none" strokeWidth="2.5" />

    {/* Left Boy Torso */}
    <path d="M 52 86 L 86 86 L 80 142 L 48 142 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Right Vault Boy */}
    <circle cx="168" cy="62" r="22" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 150 48 Q 168 32 186 42 Q 192 54 184 60 Q 168 50 150 48 Z" fill="#1aff80" />
    <circle cx="160" cy="60" r="2.5" fill="#1aff80" />
    <circle cx="176" cy="60" r="2.5" fill="#1aff80" />
    <path d="M 160 72 Q 168 80 176 72" fill="none" strokeWidth="2.5" />

    {/* Right Boy Torso */}
    <path d="M 152 86 L 186 86 L 180 142 L 148 142 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Left Boy reaching right arm to handshake */}
    <path d="M 84 92 L 115 110" strokeWidth="4" fill="none" />
    {/* Right Boy reaching left arm to handshake */}
    <path d="M 150 92 L 120 110" strokeWidth="4" fill="none" />

    {/* Handshake Clasp Glow */}
    <circle cx="118" cy="110" r="10" fill="#1aff80" fillOpacity="0.6" stroke="#50ff9c" strokeWidth="2" />
    <path d="M 112 110 Q 118 104 124 110" fill="none" stroke="#001807" strokeWidth="2.5" />

    {/* Left Boy arm on Right Boy shoulder */}
    <path d="M 52 90 Q 90 70 148 88" strokeWidth="3" fill="none" />

    {/* Right Boy welcoming arm */}
    <path d="M 186 90 L 210 108 L 222 102" strokeWidth="3" fill="none" />
    <path d="M 220 98 Q 228 104 220 110" fill="#1aff80" />

    {/* Left Boy Legs */}
    <path d="M 52 142 L 44 198 L 58 198 L 66 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 74 142 L 84 198 L 70 198 L 66 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 38 198 L 60 198 Q 62 206 40 204 Z" fill="#1aff80" />
    <path d="M 68 198 L 90 198 Q 92 206 70 204 Z" fill="#1aff80" />

    {/* Right Boy Legs */}
    <path d="M 150 142 L 140 198 L 154 198 L 162 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 174 142 L 186 198 L 172 198 L 164 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 134 198 L 156 198 Q 158 206 136 204 Z" fill="#1aff80" />
    <path d="M 166 198 L 188 198 Q 190 206 168 204 Z" fill="#1aff80" />
  </g>
);

// 6. CI/CD & AI Deployment: Vault Boy running on a factory conveyor belt beside a launched rocket
const DeploymentVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Conveyor Belt Base at bottom */}
    <rect x="18" y="162" width="204" height="24" rx="12" fill="#001807" stroke="#1aff80" strokeWidth="3" />
    {/* Conveyor belt wheels */}
    <circle cx="34" cy="174" r="8" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    <circle cx="76" cy="174" r="8" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    <circle cx="118" cy="174" r="8" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    <circle cx="160" cy="174" r="8" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    <circle cx="202" cy="174" r="8" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    {/* Conveyor belt slatted top track */}
    <line x1="38" y1="162" x2="48" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="68" y1="162" x2="78" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="98" y1="162" x2="108" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="128" y1="162" x2="138" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="158" y1="162" x2="168" y2="172" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="188" y1="162" x2="198" y2="172" stroke="#1aff80" strokeWidth="1.5" />

    {/* Deployed Rocket on conveyor */}
    <path d="M 182 62 Q 182 95 198 142 L 166 142 Q 182 95 182 62 Z" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="2.5" />
    {/* Rocket Nose Cone & Porthole */}
    <polygon points="182,50 174,68 190,68" fill="#1aff80" />
    <circle cx="182" cy="98" r="9" fill="#001807" stroke="#1aff80" strokeWidth="2" />
    {/* Rocket fins */}
    <path d="M 166 122 L 152 148 L 166 144" fill="#1aff80" />
    <path d="M 198 122 L 212 148 L 198 144" fill="#1aff80" />
    {/* Rocket thruster flame */}
    <polygon points="174,142 182,158 190,142" fill="#50ff9c" />

    {/* Running Vault Boy with Deployment Toolbox */}
    <circle cx="106" cy="48" r="22" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 88 36 Q 106 20 124 30 Q 130 42 122 48 Q 106 38 88 36 Z" fill="#1aff80" />
    <circle cx="100" cy="46" r="2.5" fill="#1aff80" />
    <circle cx="114" cy="46" r="2.5" fill="#1aff80" />
    <path d="M 100 58 Q 108 66 116 58" fill="none" strokeWidth="2.5" />

    {/* Running Torso */}
    <path d="M 94 72 L 126 76 L 118 126 L 86 122 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Running Arms */}
    {/* Left Arm carrying Toolbox */}
    <path d="M 92 76 L 62 98 L 48 94" strokeWidth="3.5" fill="none" />
    {/* Tool Box */}
    <rect x="24" y="90" width="46" height="32" rx="3" fill="#001a08" stroke="#1aff80" strokeWidth="2" />
    <rect x="42" y="84" width="12" height="6" rx="1" fill="none" stroke="#1aff80" strokeWidth="2" />
    <line x1="24" y1="102" x2="70" y2="102" stroke="#1aff80" strokeWidth="1.5" />
    <rect x="44" y="100" width="8" height="6" fill="#1aff80" />

    {/* Right Arm pumping forward in sprint */}
    <path d="M 124 78 L 148 90 L 140 102" strokeWidth="3.5" fill="none" />
    <circle cx="146" cy="92" r="5" fill="#1aff80" />

    {/* Running Legs */}
    <path d="M 86 122 L 64 148 L 76 160" strokeWidth="4" fill="none" />
    <path d="M 116 124 L 134 150 L 152 160" strokeWidth="4" fill="none" />
    <path d="M 68 160 L 90 160 Q 92 166 72 165 Z" fill="#1aff80" />
    <path d="M 144 160 L 166 160 Q 168 166 148 165 Z" fill="#1aff80" />
  </g>
);

// 7. AI & Problem Solving: Vault Boy with AI Brain blueprint & Speech Bubble
const AIDevelopmentVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Speech Bubble with AI Brain Head on top right */}
    <circle cx="175" cy="65" r="38" fill="#001f0a" stroke="#1aff80" strokeWidth="3" />
    <polygon points="144,78 128,84 146,92" fill="#001f0a" stroke="#1aff80" strokeWidth="2.5" />
    {/* AI Brain inside bubble */}
    <path d="M 160 52 C 160 40 185 40 190 52 C 195 56 195 68 188 72 C 182 76 168 76 162 70 Z" fill="#1aff80" fillOpacity="0.4" stroke="#1aff80" strokeWidth="1.5" />
    {/* Brain convolutions */}
    <path d="M 165 52 Q 175 60 170 66" fill="none" stroke="#50ff9c" strokeWidth="1.5" />
    <path d="M 180 50 Q 185 62 178 68" fill="none" stroke="#50ff9c" strokeWidth="1.5" />
    {/* Robot head profile */}
    <path d="M 152 58 L 156 50 L 170 50 L 170 78 L 160 78 L 160 72 L 152 70 Z" fill="none" stroke="#1aff80" strokeWidth="1.5" />

    {/* Vault Boy leaning over Drafting Blueprint Table */}
    <circle cx="86" cy="68" r="23" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 68 54 Q 86 38 104 48 Q 110 60 102 66 Q 86 56 68 54 Z" fill="#1aff80" />
    <circle cx="78" cy="66" r="2.5" fill="#1aff80" />
    <circle cx="94" cy="66" r="2.5" fill="#1aff80" />
    <path d="M 78 78 Q 86 86 94 78" fill="none" strokeWidth="2.5" />

    {/* Leaning Torso */}
    <path d="M 74 92 L 108 92 L 115 138 L 65 138 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Drafting Blueprint Table */}
    <polygon points="34,142 205,116 182,192 20,172" fill="#001807" stroke="#1aff80" strokeWidth="2.5" />
    {/* Rolled paper edges */}
    <path d="M 182 118 Q 212 110 205 138 L 185 145" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2" />
    {/* Blueprint AI Brain schematic on desk */}
    <ellipse cx="115" cy="148" rx="24" ry="14" fill="#1aff80" fillOpacity="0.3" stroke="#50ff9c" strokeWidth="1.5" />
    <line x1="115" y1="134" x2="115" y2="162" stroke="#50ff9c" strokeWidth="1.5" />
    <path d="M 102 144 Q 115 152 106 156" fill="none" stroke="#50ff9c" strokeWidth="1.5" />
    <path d="M 128 144 Q 115 152 124 156" fill="none" stroke="#50ff9c" strokeWidth="1.5" />

    {/* Vault Boy hands drafting on blueprint */}
    <path d="M 72 96 L 68 132 L 84 140" strokeWidth="3.5" fill="none" />
    <path d="M 104 96 L 115 125 L 102 138" strokeWidth="3.5" fill="none" />
    {/* Pencil */}
    <line x1="94" y1="130" x2="108" y2="148" stroke="#1aff80" strokeWidth="2.5" />

    {/* Legs */}
    <path d="M 70 138 L 62 195 L 76 195 L 82 142" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 96 138 L 108 195 L 94 195 L 86 142" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 54 195 L 78 195 Q 80 204 58 202 Z" fill="#1aff80" />
    <path d="M 90 195 L 114 195 Q 116 204 94 202 Z" fill="#1aff80" />
  </g>
);

// 8. Collaboration / Team Presentation: Vault Boy presenting with a pointer at a whiteboard to his team
const CollaborationVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Whiteboard / Projector Screen in background */}
    <rect x="74" y="28" width="112" height="88" rx="4" fill="#001807" stroke="#1aff80" strokeWidth="3" />
    <line x1="74" y1="112" x2="186" y2="112" stroke="#1aff80" strokeWidth="3" />
    <rect x="135" y="106" width="16" height="6" rx="1" fill="#1aff80" />

    {/* Center Vault Boy (Presenter) */}
    <circle cx="96" cy="66" r="20" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 80 54 Q 96 40 112 48 Q 118 58 110 64 Q 96 54 80 54 Z" fill="#1aff80" />
    <circle cx="88" cy="64" r="2.5" fill="#1aff80" />
    <circle cx="104" cy="64" r="2.5" fill="#1aff80" />
    <path d="M 88 74 Q 96 82 104 74" fill="none" strokeWidth="2.5" />

    {/* Presenter Torso */}
    <path d="M 82 88 L 114 88 L 108 142 L 76 142 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Presenter Right Hand holding pointer stick to board */}
    <path d="M 112 90 L 132 82 L 130 94" strokeWidth="3.5" fill="none" />
    <line x1="126" y1="98" x2="148" y2="56" stroke="#1aff80" strokeWidth="2.5" />

    {/* Presenter Left Hand gesturing */}
    <path d="M 82 92 L 68 110 L 82 118" strokeWidth="3" fill="none" />

    {/* Presenter Legs */}
    <path d="M 80 142 L 72 195 L 86 195 L 94 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 104 142 L 115 195 L 102 195 L 95 146" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 64 195 L 88 195 Q 90 204 68 202 Z" fill="#1aff80" />
    <path d="M 98 195 L 120 195 Q 122 204 100 202 Z" fill="#1aff80" />

    {/* Left Teammate (Back turned, listening) */}
    <circle cx="42" cy="108" r="18" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 28 98 Q 42 86 54 94" fill="#1aff80" />
    <path d="M 22 126 C 22 126 30 195 56 195 C 64 195 68 126 68 126 Z" fill="#1aff80" fillOpacity="0.3" stroke="#1aff80" strokeWidth="2.5" />

    {/* Right Teammate (Standing, hands on hips, listening) */}
    <circle cx="185" cy="72" r="18" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 172 62 Q 185 52 198 58" fill="#1aff80" />
    <circle cx="178" cy="70" r="2" fill="#1aff80" />
    <circle cx="190" cy="70" r="2" fill="#1aff80" />
    <path d="M 178 78 Q 184 84 190 78" fill="none" strokeWidth="2" />
    {/* Body */}
    <path d="M 172 92 L 202 92 L 195 142 L 168 142 Z" fill="#1aff80" fillOpacity="0.3" />
    {/* Hands on hips */}
    <path d="M 172 95 L 158 114 L 170 125" strokeWidth="3" fill="none" />
    <path d="M 200 95 L 214 114 L 202 125" strokeWidth="3" fill="none" />
    {/* Legs */}
    <path d="M 170 142 L 162 195 L 176 195" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 190 142 L 198 195 L 184 195" fill="#1aff80" fillOpacity="0.3" />
  </g>
);

// 9. Problem Solving / Debugging: Vault Boy scratching head with giant magnifying glass over bug
const ProblemSolvingVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Vault Boy on left scratching his head */}
    <circle cx="92" cy="72" r="25" fill="#1aff80" fillOpacity="0.35" />
    <path d="M 72 56 Q 92 36 114 46 Q 120 58 110 66 Q 92 56 72 56 Z" fill="#1aff80" />
    {/* Puzzled expression */}
    <path d="M 80 66 L 88 64" strokeWidth="2.5" />
    <path d="M 98 64 L 106 67" strokeWidth="2.5" />
    <circle cx="84" cy="72" r="2.5" fill="#1aff80" />
    <circle cx="100" cy="72" r="2.5" fill="#1aff80" />
    <path d="M 84 85 Q 92 82 100 85" fill="none" strokeWidth="2.5" />

    {/* Left hand scratching head */}
    <path d="M 74 96 L 56 76 L 68 50 L 76 56" strokeWidth="3.5" fill="none" />

    {/* Torso */}
    <path d="M 78 98 L 116 98 L 108 152 L 72 152 Z" fill="#1aff80" fillOpacity="0.3" />

    {/* Right Hand holding giant Magnifying Glass */}
    <path d="M 112 100 L 126 130 L 118 146" strokeWidth="3.5" fill="none" />
    {/* Magnifying Glass handle */}
    <line x1="98" y1="165" x2="135" y2="135" stroke="#1aff80" strokeWidth="5" />
    {/* Magnifying Lens */}
    <circle cx="156" cy="118" r="28" fill="#002b0f" stroke="#1aff80" strokeWidth="3.5" />
    {/* Lens reflection shine */}
    <path d="M 142 98 Q 164 96 172 108" fill="none" stroke="#50ff9c" strokeWidth="2" />

    {/* Magnified Bug inside lens */}
    <ellipse cx="156" cy="118" rx="10" ry="14" fill="#001807" stroke="#1aff80" strokeWidth="2" />
    <line x1="144" y1="112" x2="168" y2="112" stroke="#1aff80" strokeWidth="2" />
    <line x1="142" y1="120" x2="170" y2="120" stroke="#1aff80" strokeWidth="2" />
    <line x1="145" y1="128" x2="167" y2="128" stroke="#1aff80" strokeWidth="2" />

    {/* Crawling Bug on floor */}
    <ellipse cx="180" cy="178" rx="14" ry="10" fill="#1aff80" fillOpacity="0.5" stroke="#1aff80" strokeWidth="2" />
    <circle cx="196" cy="178" r="4" fill="#1aff80" />
    {/* Bug antenna & legs */}
    <path d="M 198 175 Q 208 170 214 172" fill="none" stroke="#1aff80" strokeWidth="1.5" />
    <path d="M 198 181 Q 208 186 214 184" fill="none" stroke="#1aff80" strokeWidth="1.5" />
    <line x1="170" y1="170" x2="160" y2="164" stroke="#1aff80" strokeWidth="2" />
    <line x1="180" y1="168" x2="178" y2="160" stroke="#1aff80" strokeWidth="2" />
    <line x1="190" y1="170" x2="198" y2="164" stroke="#1aff80" strokeWidth="2" />
    <line x1="170" y1="186" x2="160" y2="192" stroke="#1aff80" strokeWidth="2" />
    <line x1="180" y1="188" x2="178" y2="196" stroke="#1aff80" strokeWidth="2" />
    <line x1="190" y1="186" x2="198" y2="192" stroke="#1aff80" strokeWidth="2" />

    {/* Legs */}
    <path d="M 76 152 L 64 205 L 80 205 L 88 156" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 104 152 L 118 205 L 104 205 L 94 156" fill="#1aff80" fillOpacity="0.3" />
    <path d="M 56 205 L 82 205 Q 84 214 60 212 Z" fill="#1aff80" />
    <path d="M 98 205 L 124 205 Q 126 214 102 212 Z" fill="#1aff80" />
  </g>
);

const PerkVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Vault Medallion */}
    <polygon points="120,30 195,75 195,165 120,210 45,165 45,75" fill="#1aff80" fillOpacity="0.1" strokeWidth="3" />
    <circle cx="120" cy="120" r="50" fill="#1aff80" fillOpacity="0.25" strokeWidth="2.5" />
    <path d="M 100 120 L 115 135 L 145 105" strokeWidth="6" stroke="#1aff80" fill="none" />
  </g>
);

const QuestVaultBoy = () => (
  <g stroke="#1aff80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1aff80" fillOpacity="0.2">
    {/* Holotape / Pip-Boy Quest Marker */}
    <polygon points="120,40 180,120 120,200 60,120" fill="#1aff80" fillOpacity="0.2" strokeWidth="3" />
    <circle cx="120" cy="120" r="24" fill="#001a08" stroke="#1aff80" strokeWidth="2.5" />
    <polygon points="120,105 132,130 108,130" fill="#1aff80" />
  </g>
);
