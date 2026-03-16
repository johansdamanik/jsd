<script lang="ts">
  interface TerminalLine {
    type: 'input' | 'output' | 'system';
    text: string;
  }

  let inputValue = $state('');
  let lines = $state<TerminalLine[]>([
    { type: 'system', text: '╔═════════════════════════════╗' },
    { type: 'system', text: '║   SIMEON\'S DEVELOPER TERMINAL v1.0                 ║' },
    { type: 'system', text: '║   Type "help" for available commands                ║' },
    { type: 'system', text: '╚═════════════════════════════╝' },
    { type: 'output', text: '' },
  ]);

  const commands: Record<string, string[]> = {
    help: [
      '📜 Available Commands:',
      '  help       — Show this message',
      '  whoami     — Developer profile',
      '  skills     — List skill categories',
      '  projects   — List completed missions',
      '  experience — Show experience log',
      '  contact    — Contact information',
      '  links      — Quick links',
      '  clear      — Clear terminal',
    ],
    whoami: [
      '⚔ Simeon — Full-Stack Developer',
      '  Class: Full-Stack Developer',
      '  Level: 99',
      '  Focus: Building reliable systems for real products',
      '  Specialties: Web Apps, Internal Systems, E-commerce, Operational Tools',
    ],
    skills: [
      '🎒 Skill Categories:',
      '  📜 Languages    — JavaScript, TypeScript, PHP',
      '  🛡 Frontend     — Vue.js, Nuxt 3, React.js, React Native, Next.js, Quasar',
      '                    Redux, Pinia, HTML, CSS, Tailwind CSS, Bootstrap, AJAX',
      '  ⚙ Backend      — Laravel, Node.js, Express.js, NestJS, Prisma, Sequelize',
      '                    REST API, GraphQL, Apollo Server, JWT, Firebase',
      '  🏗 Infra        — PostgreSQL, MySQL, MongoDB, Redis, Docker, AWS',
      '  🤖 Automation   — n8n, OpenClaw',
    ],
    projects: [
      '📋 Completed Missions:',
      '  ⭐ KartelDaun       — E-commerce platform for exotic plants [LEGENDARY]',
      '  🏪 Kasira POS       — Point-of-sale system for F&B businesses [RANK A]',
      '  📖 Pokédex          — Interactive Pokédex application [RANK B]',
      '  🚗 Vehicheck        — Vehicle inspection tracking system [RANK A]',
      '  📰 Rice Media       — Content management platform [RANK B]',
      '  📚 Dzmanga          — Manga reader platform [RANK B]',
      '  🍽 Restaurant App   — Customer-facing restaurant mobile app [RANK A]',
    ],
    experience: [
      '📖 Experience Log:',
      '  ▸ Full Stack Developer @ PT Kartel Daun International',
      '    — Built and maintained e-commerce platform, internal systems,',
      '      and operational tooling for international plant business',
      '  ▸ Front End Developer @ PT Kartel Daun International',
      '    — Developed responsive UIs and product browsing interfaces',
      '      for customer-facing e-commerce platform',
      '  ▸ Digital Products Seller — Self Employed on Shopee',
      '    — Managed digital product listings and customer workflows',
    ],
    contact: [
      '✉ Contact Information:',
      '  📧 Email    — johansdamanik@gmail.com',
      '  🐙 GitHub   — https://github.com/johansdamanik',
      '  💼 LinkedIn — https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/',
      '',
      '  "Looking for a developer who can build reliable',
      '   full-stack systems? Let\'s connect."',
    ],
    links: [
      '🔗 Quick Links:',
      '  📧 Email    — johansdamanik@gmail.com',
      '  🐙 GitHub   — https://github.com/johansdamanik',
      '  💼 LinkedIn — https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/',
    ],
  };

  function handleCommand() {
    const cmd = inputValue.trim().toLowerCase();
    inputValue = '';

    lines = [...lines, { type: 'input', text: `> ${cmd}` }];

    if (cmd === 'clear') {
      lines = [{ type: 'output', text: 'Terminal cleared.' }];
      return;
    }

    if (cmd === '') return;

    const response = commands[cmd];
    if (response) {
      for (const line of response) {
        lines = [...lines, { type: 'output', text: line }];
      }
    } else {
      lines = [...lines, { type: 'output', text: `Unknown command: "${cmd}". Type "help" for available commands.` }];
    }
    lines = [...lines, { type: 'output', text: '' }];

    // Scroll to bottom
    setTimeout(() => {
      const el = document.getElementById('terminal-output');
      if (el) el.scrollTop = el.scrollHeight;
    }, 10);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleCommand();
    }
  }
</script>

<section id="terminal" class="terminal-section">
  <div class="terminal-container">
    <div class="rpg-panel-dark terminal-panel">
      <div class="rpg-header terminal-header">
        💻 Developer Terminal
        <span class="terminal-status">● ONLINE</span>
      </div>
      <div class="terminal-body" id="terminal-output">
        {#each lines as line}
          <div class="terminal-line" class:input={line.type === 'input'} class:system={line.type === 'system'}>
            {line.text}
          </div>
        {/each}
      </div>
      <div class="terminal-input-area">
        <span class="terminal-prompt">❯</span>
        <input
          type="text"
          class="terminal-input"
          placeholder="Type a command..."
          bind:value={inputValue}
          onkeydown={handleKeydown}
        />
      </div>
    </div>
  </div>
</section>

<style>
  .terminal-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .terminal-container {
    max-width: 800px;
    width: 100%;
  }

  .terminal-panel {
    width: 100%;
  }

  .terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .terminal-status {
    font-size: 0.7rem;
    color: #52be80;
    font-weight: 600;
  }

  .terminal-body {
    padding: 20px;
    min-height: 300px;
    max-height: 400px;
    overflow-y: auto;
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--color-text-cream);
  }

  .terminal-line {
    white-space: pre-wrap;
    word-break: break-word;
    min-height: 1.2em;
  }

  .terminal-line.input {
    color: var(--color-gold);
    font-weight: 600;
  }

  .terminal-line.system {
    color: var(--color-header-green-light);
    opacity: 0.8;
  }

  .terminal-input-area {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-top: 2px solid var(--color-border-bronze);
    background: rgba(0,0,0,0.2);
  }

  .terminal-prompt {
    color: var(--color-gold);
    font-weight: 700;
    font-size: 1rem;
  }

  .terminal-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--color-text-cream);
    font-family: var(--font-pixel);
    font-size: 0.9rem;
    caret-color: var(--color-gold);
  }

  .terminal-input::placeholder {
    color: rgba(240, 230, 208, 0.3);
  }
</style>
