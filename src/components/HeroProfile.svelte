<script lang="ts">
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<section id="profile" class="hero-section" aria-label="Developer profile">
  <div class="hero-container">
    <!-- Character Status Panel -->
    <div class="rpg-panel hero-panel animate-panel-open">
      <div class="rpg-header">Character Status</div>
      <div class="rpg-body">
        <div class="hero-content">
          <!-- Character Avatar Area -->
          <div class="avatar-area">
            <div class="avatar-frame">
              <div class="avatar-inner">
                <span class="avatar-icon">⚔️</span>
              </div>
            </div>
            <div class="level-badge">Lv. 99</div>
          </div>

          <!-- Character Info -->
          <div class="hero-info">
            <h1 class="hero-name">Simeon</h1>
            <div class="hero-class">
              <span class="class-icon">◆</span>
              Full-Stack Developer
            </div>

            <!-- Stat Bars -->
            <div class="stat-bars">
              <div class="stat-row">
                <span class="stat-label">HP</span>
                <div class="rpg-stat-bar">
                  <div
                    class="rpg-stat-fill"
                    style="width: 95%; background: linear-gradient(90deg, #c0392b, #e74c3c);"
                  ></div>
                </div>
                <span class="stat-value">950/1000</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">MP</span>
                <div class="rpg-stat-bar">
                  <div
                    class="rpg-stat-fill"
                    style="width: 80%; background: linear-gradient(90deg, #2e86c1, #5dade2);"
                  ></div>
                </div>
                <span class="stat-value">800/1000</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">EXP</span>
                <div class="rpg-stat-bar">
                  <div
                    class="rpg-stat-fill"
                    style="width: 72%; background: linear-gradient(90deg, #27ae60, #52be80);"
                  ></div>
                </div>
                <span class="stat-value">7200/10000</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Headline -->
        <div class="rpg-divider">◆ ◆ ◆</div>

        <p class="hero-headline">I build reliable systems for real products.</p>
        <p class="hero-subline">
          I help businesses turn operational complexity into maintainable
          full-stack software.
        </p>

        <!-- Spec Labels -->
        <div class="spec-tags">
          <span class="rpg-badge">🌐 Web Applications</span>
          <span class="rpg-badge">⚙ Internal Systems</span>
          <span class="rpg-badge">🛒 E-commerce Platforms</span>
          <span class="rpg-badge">🔧 Operational Tools</span>
          <span class="rpg-badge">🤖 AI Automation</span>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <button
            class="rpg-btn rpg-btn-primary"
            onclick={() => scrollTo("main-mission")}
          >
            ⚔ View Missions
          </button>
          <button
            class="rpg-btn rpg-btn-gold"
            onclick={() => scrollTo("terminal")}
          >
            💻 Open Terminal
          </button>
        </div>

        <!-- Quick Links -->
        <div class="hero-links">
          <a
            href="https://github.com/johansdamanik"
            target="_blank"
            rel="noopener"
            class="hero-link"
            title="GitHub">🐙</a
          >
          <a
            href="https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/"
            target="_blank"
            rel="noopener"
            class="hero-link"
            title="LinkedIn">💼</a
          >
          <a
            href="mailto:johansdamanik@gmail.com"
            class="hero-link"
            title="Email">📧</a
          >
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px 60px;
    position: relative;
  }

  .hero-container {
    max-width: 720px;
    width: 100%;
  }

  .hero-panel {
    width: 100%;
  }

  .hero-content {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .avatar-area {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .avatar-frame {
    width: 100px;
    height: 100px;
    border: 3px solid var(--color-border-bronze);
    border-radius: 4px;
    background: var(--color-dungeon-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 0 0 20px rgba(0, 0, 0, 0.4),
      0 0 0 1px var(--color-border-light);
  }

  .avatar-inner {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #1a1831, #221f3a);
    border: 1px solid var(--color-border-bronze);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .level-badge {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-gold);
    background: var(--color-dungeon-surface);
    border: 2px solid var(--color-gold-dark);
    padding: 2px 12px;
    border-radius: 3px;
    text-shadow: 0 0 6px rgba(201, 168, 76, 0.4);
  }

  .hero-info {
    flex: 1;
  }

  .hero-name {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 2px;
    line-height: 1.1;
  }

  .hero-class {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-header-green);
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;
  }

  .class-icon {
    color: var(--color-gold);
    font-size: 0.7em;
  }

  .stat-bars {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stat-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 700;
    width: 30px;
    color: var(--color-text-brown);
  }

  .stat-row .rpg-stat-bar {
    flex: 1;
  }

  .stat-value {
    font-size: 0.65rem;
    color: var(--color-text-muted);
    min-width: 70px;
    text-align: right;
  }

  .hero-headline {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 6px;
  }

  .hero-subline {
    font-size: 0.95rem;
    color: var(--color-text-brown);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .spec-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .hero-links {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border-bronze);
  }

  .hero-link {
    font-size: 1.3rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .hero-link:hover {
    border-color: var(--color-gold);
    background: var(--color-parchment);
    box-shadow: 0 0 10px rgba(201, 168, 76, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .hero-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .hero-name {
      font-size: 1.8rem;
    }

    .hero-class {
      justify-content: center;
    }

    .hero-headline {
      font-size: 1.1rem;
    }

    .spec-tags {
      justify-content: center;
    }

    .hero-actions {
      justify-content: center;
    }

    .hero-links {
      justify-content: center;
    }
  }
</style>
