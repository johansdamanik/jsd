<script lang="ts">
  interface SkillItem {
    name: string;
    icon: string;
    desc: string;
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  }

  interface SkillCategory {
    label: string;
    icon: string;
    items: SkillItem[];
  }

  const categories: SkillCategory[] = [
    {
      label: "Automation",
      icon: "🤖",
      items: [
        {
          name: "n8n",
          icon: "⚡",
          desc: "Open-source workflow automation tool for connecting apps and building complex integrations with a visual editor.",
          rarity: "epic",
        },
        {
          name: "OpenClaw",
          icon: "🦀",
          desc: "Automation tool for building intelligent workflow automations and streamlined integrations.",
          rarity: "rare",
        },
      ],
    },
    // {
    //   label: "Languages",
    //   icon: "📜",
    //   items: [
    //     {
    //       name: "JavaScript",
    //       icon: "🟨",
    //       desc: "Core scripting language for web development. Used across frontend and backend.",
    //       rarity: "legendary",
    //     },
    //     {
    //       name: "TypeScript",
    //       icon: "🔷",
    //       desc: "Typed superset of JavaScript. Enhances code reliability and maintainability.",
    //       rarity: "epic",
    //     },
    //     {
    //       name: "PHP",
    //       icon: "🐘",
    //       desc: "Server-side language powering Laravel backends and dynamic web applications.",
    //       rarity: "epic",
    //     },
    //   ],
    // },
    {
      label: "Frontend",
      icon: "🛡",
      items: [
        {
          name: "Vue.js",
          icon: "💚",
          desc: "Progressive framework for building user interfaces with reactive data binding.",
          rarity: "legendary",
        },
        {
          name: "Nuxt 4",
          icon: "💎",
          desc: "Vue meta-framework for SSR, SSG, and full-stack web applications.",
          rarity: "epic",
        },
        {
          name: "React.js",
          icon: "⚛",
          desc: "Component-based UI library for building interactive user interfaces.",
          rarity: "epic",
        },
        {
          name: "React Native",
          icon: "📱",
          desc: "Cross-platform mobile app development using React components.",
          rarity: "rare",
        },
        {
          name: "Next.js",
          icon: "▲",
          desc: "React framework for production-grade apps with SSR and static generation.",
          rarity: "rare",
        },
        {
          name: "Quasar",
          icon: "🔮",
          desc: "Vue framework for building responsive SPAs, SSR, and mobile apps.",
          rarity: "epic",
        },
        {
          name: "Redux",
          icon: "🔄",
          desc: "Predictable state container for JavaScript applications.",
          rarity: "uncommon",
        },
        {
          name: "Pinia",
          icon: "🍍",
          desc: "Intuitive store for Vue.js with type-safe composition API support.",
          rarity: "rare",
        },
        {
          name: "HTML",
          icon: "📄",
          desc: "Markup language for structuring web content and semantic layouts.",
          rarity: "common",
        },
        {
          name: "CSS",
          icon: "🎨",
          desc: "Styling language for visual presentation and responsive design.",
          rarity: "common",
        },
        {
          name: "Tailwind CSS",
          icon: "🌊",
          desc: "Utility-first CSS framework for rapid, consistent UI development.",
          rarity: "rare",
        },
        {
          name: "Bootstrap",
          icon: "🅱",
          desc: "Component library for responsive, mobile-first web projects.",
          rarity: "uncommon",
        },
        {
          name: "AJAX",
          icon: "⚡",
          desc: "Asynchronous data fetching for dynamic content updates without page reload.",
          rarity: "common",
        },
      ],
    },
    {
      label: "Backend",
      icon: "⚙",
      items: [
        {
          name: "Laravel",
          icon: "🔴",
          desc: "PHP framework for elegant backend development with MVC architecture.",
          rarity: "legendary",
        },
        {
          name: "Node.js",
          icon: "🟢",
          desc: "JavaScript runtime for building scalable server-side applications.",
          rarity: "epic",
        },
        {
          name: "Express.js",
          icon: "🚂",
          desc: "Minimal Node.js framework for REST APIs and web services.",
          rarity: "rare",
        },
        {
          name: "NestJS",
          icon: "🐈",
          desc: "Progressive Node.js framework for scalable server-side applications.",
          rarity: "epic",
        },
        {
          name: "Prisma",
          icon: "💠",
          desc: "Next-generation ORM for type-safe database queries in Node.js.",
          rarity: "rare",
        },
        {
          name: "Sequelize",
          icon: "📊",
          desc: "Promise-based ORM for SQL databases with migration support.",
          rarity: "uncommon",
        },
        {
          name: "REST API",
          icon: "🔗",
          desc: "API design pattern for stateless client-server communication.",
          rarity: "rare",
        },
        {
          name: "GraphQL",
          icon: "◈",
          desc: "Query language for APIs with flexible, efficient data fetching.",
          rarity: "rare",
        },
        {
          name: "Apollo Server",
          icon: "🚀",
          desc: "GraphQL server for building production-ready APIs.",
          rarity: "uncommon",
        },
        {
          name: "JWT Authentication",
          icon: "🔐",
          desc: "Token-based auth for secure, stateless user authentication.",
          rarity: "rare",
        },
        {
          name: "Multer / File Upload",
          icon: "📁",
          desc: "Middleware for handling multipart form data and file uploads.",
          rarity: "uncommon",
        },
        {
          name: "Firebase",
          icon: "🔥",
          desc: "Platform for real-time databases, auth, hosting, and cloud functions.",
          rarity: "epic",
        },
      ],
    },
    {
      label: "DB & Infra",
      icon: "🏗",
      items: [
        {
          name: "PostgreSQL",
          icon: "🐘",
          desc: "Advanced open-source relational database with robust SQL support.",
          rarity: "epic",
        },
        {
          name: "MySQL",
          icon: "🐬",
          desc: "Popular relational database for structured data storage.",
          rarity: "rare",
        },
        {
          name: "MongoDB",
          icon: "🍃",
          desc: "NoSQL document database for flexible, schema-less data models.",
          rarity: "rare",
        },
        {
          name: "Redis",
          icon: "🔴",
          desc: "In-memory data store for caching, sessions, and real-time data.",
          rarity: "uncommon",
        },
        {
          name: "Docker",
          icon: "🐳",
          desc: "Containerization platform for consistent development and deployment.",
          rarity: "rare",
        },
        {
          name: "AWS",
          icon: "☁",
          desc: "Cloud infrastructure for scalable hosting, storage, and compute services.",
          rarity: "epic",
        },
      ],
    },
  ];

  const rarityColors: Record<string, string> = {
    common: "#9a9a8a",
    uncommon: "#4a8a4a",
    rare: "#2e86c1",
    epic: "#8e44ad",
    legendary: "#c9a84c",
  };

  const rarityLabels: Record<string, string> = {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  };

  let activeCategory = $state(0);
  let selectedSkill = $state<SkillItem | null>(null);

  function selectCategory(index: number) {
    activeCategory = index;
    selectedSkill = null;
  }

  function selectSkill(skill: SkillItem) {
    selectedSkill = selectedSkill?.name === skill.name ? null : skill;
  }
</script>

<section id="skills" class="skills-section">
  <div class="skills-container">
    <div class="rpg-panel skills-panel">
      <div class="rpg-header">
        Skills Inventory
        <span class="header-count"
          >{categories[activeCategory].items.length} items</span
        >
      </div>

      <!-- Category Tabs — Scrollable on mobile -->
      <div class="tab-bar">
        <div class="tab-scroll">
          {#each categories as cat, i}
            <button
              class="rpg-tab"
              class:active={activeCategory === i}
              onclick={() => selectCategory(i)}
            >
              <span class="tab-icon">{cat.icon}</span>
              <span class="tab-label">{cat.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <div class="rpg-body skills-body">
        <div class="skills-layout">
          <!-- Item Grid -->
          <div class="item-grid">
            {#each categories[activeCategory].items as skill (skill.name)}
              <button
                class="rpg-item"
                class:selected={selectedSkill?.name === skill.name}
                onclick={() => selectSkill(skill)}
                style="--rarity-color: {rarityColors[skill.rarity]}"
              >
                <div class="item-rarity-bar"></div>
                <span class="item-icon">{skill.icon}</span>
                <span class="item-name">{skill.name}</span>
                <span class="item-rarity-dot" title={rarityLabels[skill.rarity]}
                ></span>
              </button>
            {/each}
          </div>

          <!-- Detail Panel -->
          <div class="detail-panel" class:has-content={selectedSkill !== null}>
            {#if selectedSkill}
              <div class="detail-content">
                <div class="detail-frame">
                  <div
                    class="detail-icon-frame"
                    style="--rarity-color: {rarityColors[selectedSkill.rarity]}"
                  >
                    <span class="detail-icon">{selectedSkill.icon}</span>
                  </div>
                </div>
                <h3 class="detail-name">{selectedSkill.name}</h3>
                <span
                  class="detail-rarity-label"
                  style="color: {rarityColors[selectedSkill.rarity]}"
                >
                  ★ {rarityLabels[selectedSkill.rarity]}
                </span>
                <div class="rpg-divider">◆</div>
                <p class="detail-desc">{selectedSkill.desc}</p>
                <div class="detail-meta">
                  <span class="rpg-badge">
                    {categories[activeCategory].icon}
                    {categories[activeCategory].label}
                  </span>
                  <span class="detail-equipped">✦ Equipped</span>
                </div>
              </div>
            {:else}
              <div class="detail-empty">
                <span class="empty-icon">🎒</span>
                <p>Select a skill to inspect</p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Mobile detail overlay -->
        {#if selectedSkill}
          <div class="mobile-detail">
            <div class="mobile-detail-inner">
              <div class="mobile-detail-header">
                <span class="detail-icon" style="font-size: 1.8rem;"
                  >{selectedSkill.icon}</span
                >
                <div>
                  <h3 class="detail-name" style="margin-bottom: 0;">
                    {selectedSkill.name}
                  </h3>
                  <span
                    class="detail-rarity-label"
                    style="color: {rarityColors[
                      selectedSkill.rarity
                    ]};font-size:0.75rem;"
                  >
                    ★ {rarityLabels[selectedSkill.rarity]}
                  </span>
                </div>
                <button
                  class="mobile-close"
                  onclick={() => (selectedSkill = null)}>✕</button
                >
              </div>
              <p class="detail-desc" style="margin-bottom:8px;">
                {selectedSkill.desc}
              </p>
              <div
                style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"
              >
                <span class="rpg-badge"
                  >{categories[activeCategory].icon}
                  {categories[activeCategory].label}</span
                >
                <span class="detail-equipped">✦ Equipped</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .skills-container {
    max-width: 920px;
    width: 100%;
  }

  .skills-panel {
    width: 100%;
  }

  .header-count {
    margin-left: auto;
    font-size: 0.7rem;
    font-weight: 500;
    opacity: 0.7;
    letter-spacing: 0;
  }

  /* ---- Tab Bar — Scrollable ---- */
  .tab-bar {
    background: var(--color-parchment-dark);
    border-bottom: 2px solid var(--color-border-bronze);
    position: relative;
  }

  .tab-scroll {
    display: flex;
    gap: 2px;
    padding: 0 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tab-scroll::-webkit-scrollbar {
    display: none;
  }

  .rpg-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tab-icon {
    font-size: 1rem;
  }

  .tab-label {
    font-size: inherit;
  }

  /* ---- Skills Layout ---- */
  .skills-body {
    padding: 20px;
    position: relative;
  }

  .skills-layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 20px;
    min-height: 300px;
  }

  /* ---- Item Grid ---- */
  .item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 8px;
    align-content: start;
  }

  .rpg-item {
    position: relative;
    overflow: hidden;
  }

  .rpg-item .item-rarity-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--rarity-color, #9a9a8a);
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  .rpg-item:hover .item-rarity-bar,
  .rpg-item.selected .item-rarity-bar {
    opacity: 1;
  }

  .rpg-item .item-icon {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 4px;
    margin-top: 4px;
  }

  .rpg-item .item-name {
    display: block;
    font-size: 0.72rem;
    line-height: 1.2;
  }

  .rpg-item .item-rarity-dot {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--rarity-color, #9a9a8a);
    box-shadow: 0 0 4px var(--rarity-color, transparent);
  }

  .rpg-item.selected .item-rarity-dot {
    box-shadow: 0 0 8px var(--rarity-color, transparent);
  }

  /* ---- Detail Panel (Desktop) ---- */
  .detail-panel {
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    padding: 20px;
    box-shadow: inset 0 0 15px rgba(42, 31, 14, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s ease;
  }

  .detail-panel.has-content {
    border-color: var(--color-gold-dark);
  }

  .detail-content {
    text-align: center;
    width: 100%;
  }

  .detail-frame {
    margin-bottom: 8px;
  }

  .detail-icon-frame {
    width: 64px;
    height: 64px;
    margin: 0 auto;
    border: 3px solid var(--rarity-color, var(--color-border-bronze));
    border-radius: 6px;
    background: var(--color-dungeon-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 12px
        color-mix(in srgb, var(--rarity-color, transparent) 30%, transparent),
      inset 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .detail-icon {
    font-size: 2.2rem;
  }

  .detail-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 2px;
  }

  .detail-rarity-label {
    font-size: 0.8rem;
    font-weight: 700;
    display: block;
    margin-bottom: 4px;
  }

  .detail-desc {
    font-size: 0.82rem;
    color: var(--color-text-brown);
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .detail-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .detail-equipped {
    font-size: 0.75rem;
    color: var(--color-gold);
    font-weight: 600;
  }

  .detail-empty {
    text-align: center;
    color: var(--color-text-muted);
  }

  .empty-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .detail-empty p {
    font-size: 0.9rem;
  }

  /* ---- Mobile Detail (visible only on mobile) ---- */
  .mobile-detail {
    display: none;
  }

  /* ---- Responsive ---- */
  @media (max-width: 700px) {
    .skills-layout {
      grid-template-columns: 1fr;
    }

    /* Hide desktop detail panel on mobile */
    .detail-panel {
      display: none;
    }

    /* Show mobile detail instead */
    .mobile-detail {
      display: block;
      margin-top: 16px;
    }

    .mobile-detail-inner {
      background: var(--color-parchment-dark);
      border: 2px solid var(--color-gold-dark);
      border-radius: 4px;
      padding: 14px;
      box-shadow: 0 0 12px rgba(201, 168, 76, 0.15);
    }

    .mobile-detail-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .mobile-close {
      margin-left: auto;
      background: none;
      border: 2px solid var(--color-border-bronze);
      color: var(--color-text-brown);
      font-size: 0.9rem;
      padding: 4px 8px;
      border-radius: 3px;
      cursor: pointer;
      font-family: var(--font-pixel);
    }

    .item-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .rpg-item .item-icon {
      font-size: 1.3rem;
    }

    .rpg-item .item-name {
      font-size: 0.65rem;
    }

    .tab-scroll {
      padding: 0 8px;
    }

    .rpg-tab {
      font-size: 0.78rem;
      padding: 8px 12px;
    }

    .skills-body {
      padding: 14px;
    }
  }

  @media (max-width: 420px) {
    .item-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .rpg-tab {
      font-size: 0.72rem;
      padding: 6px 10px;
    }

    .tab-icon {
      font-size: 0.85rem;
    }
  }
</style>
