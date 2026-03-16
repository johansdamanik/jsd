<script lang="ts">
  const missions = [
    {
      name: 'Kasira POS',
      desc: 'Built a point-of-sale system supporting order management, menu engineering analytics, and operational workflows for F&B businesses.',
      tech: ['Vue.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      icon: '🏪',
      rank: 'A'
    },
    {
      name: 'Pokédex',
      desc: 'Developed an interactive Pokédex app with real-time data fetching, search, and filtering — built for clean UI and fast navigation.',
      tech: ['React.js', 'REST API', 'CSS'],
      icon: '📖',
      rank: 'B'
    },
    {
      name: 'Vehicheck',
      desc: 'Created a vehicle inspection and tracking system to streamline fleet management and compliance workflows.',
      tech: ['Vue.js', 'Laravel', 'MySQL'],
      icon: '🚗',
      rank: 'A'
    },
    {
      name: 'Rice Media',
      desc: 'Built a content management and media platform for publishing articles, managing editorial workflows, and audience engagement.',
      tech: ['Next.js', 'Node.js', 'MongoDB'],
      icon: '📰',
      rank: 'B'
    },
    {
      name: 'Dzmanga',
      desc: 'Developed a manga reader platform with chapter navigation, favorites system, and optimized image loading for seamless reading.',
      tech: ['Nuxt 3', 'Node.js', 'MongoDB'],
      icon: '📚',
      rank: 'B'
    },
    {
      name: 'Restaurant App',
      desc: 'Built a customer-facing restaurant mobile app with menu browsing, table reservations, and order tracking functionality.',
      tech: ['React Native', 'Firebase', 'Redux'],
      icon: '🍽',
      rank: 'A'
    },
  ];
</script>

<section id="missions" class="missions-section" aria-label="Other projects">
  <div class="missions-container">
    <div class="rpg-panel missions-panel">
      <div class="rpg-header">📜 Other Missions</div>
      <div class="rpg-body">
        <div class="missions-grid">
          {#each missions as mission}
            <div class="mission-card">
              <div class="card-header">
                <span class="card-icon">{mission.icon}</span>
                <div>
                  <h3 class="card-name">{mission.name}</h3>
                  <span class="card-rank">Rank {mission.rank}</span>
                </div>
              </div>
              <p class="card-desc">{mission.desc}</p>
              <div class="card-tech">
                {#each mission.tech as t}
                  <span class="rpg-badge">{t}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .missions-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .missions-container {
    max-width: 900px;
    width: 100%;
  }

  .missions-panel {
    width: 100%;
  }

  .missions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .mission-card {
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    padding: 16px;
    transition: all 0.2s ease;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .mission-card:hover {
    border-color: var(--color-gold);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.2),
      0 0 12px rgba(201, 168, 76, 0.2);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .card-icon {
    font-size: 2rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-dungeon-surface);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    flex-shrink: 0;
  }

  .card-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text-dark);
    line-height: 1.2;
  }

  .card-rank {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-gold);
  }

  .card-desc {
    font-size: 0.85rem;
    color: var(--color-text-brown);
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  @media (max-width: 600px) {
    .missions-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
