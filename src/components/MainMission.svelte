<section id="main-mission" class="mission-section" aria-label="Featured project KartelDaun">
  <div class="mission-container">
    <div class="rpg-panel mission-panel">
      <div class="rpg-header">⭐ Main Mission</div>
      <div class="rpg-body">
        <div class="quest-banner">
          <div class="quest-rank">★★★ LEGENDARY QUEST ★★★</div>
          <h2 class="quest-title">KartelDaun</h2>
          <div class="quest-type">E-Commerce Platform — Exotic Plants</div>
        </div>

        <div class="rpg-divider">◆ ◆ ◆</div>

        <div class="quest-description">
          <p>
            Built and maintained an e-commerce platform for exotic plants serving international customers. The platform supports product discovery, operational workflows, and scalable web functionality for a specialized online business.
          </p>
        </div>

        <div class="quest-objectives">
          <h3 class="obj-title">◆ Mission Objectives</h3>
          <ul class="obj-list">
            <li><span class="obj-check">✓</span> Full-stack development of production platform</li>
            <li><span class="obj-check">✓</span> E-commerce platform architecture & product browsing</li>
            <li><span class="obj-check">✓</span> Operational business workflow support</li>
            <li><span class="obj-check">✓</span> Scalable, maintainable implementation</li>
            <li><span class="obj-check">✓</span> International customer support with worldwide shipping</li>
          </ul>
        </div>

        <div class="rpg-divider">◆</div>

        <div class="quest-tech">
          <h3 class="tech-title">⚙ Equipment Used</h3>
          <div class="tech-tags">
            <span class="rpg-badge">PHP Laravel</span>
            <span class="rpg-badge">Vue</span>
            <span class="rpg-badge">Quasar</span>
            <span class="rpg-badge">Firebase</span>
            <span class="rpg-badge">MySQL</span>
            <span class="rpg-badge">Pinia</span>
            <span class="rpg-badge">Axios</span>
            <span class="rpg-badge">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .mission-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .mission-container {
    max-width: 800px;
    width: 100%;
  }

  .mission-panel {
    width: 100%;
  }

  .quest-banner {
    text-align: center;
    padding: 20px 0 16px;
  }

  .quest-rank {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-gold);
    letter-spacing: 2px;
    margin-bottom: 8px;
    text-shadow: 0 0 8px rgba(201, 168, 76, 0.3);
  }

  .quest-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 4px;
    line-height: 1.1;
  }

  .quest-type {
    font-size: 0.95rem;
    color: var(--color-header-green);
    font-weight: 600;
  }

  .quest-description p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-brown);
  }

  .quest-objectives {
    margin: 16px 0;
  }

  .obj-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 10px;
  }

  .obj-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
  }

  .obj-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--color-text-brown);
    padding: 6px 12px;
    background: rgba(58, 110, 58, 0.05);
    border-left: 3px solid var(--color-header-green);
    border-radius: 2px;
  }

  .obj-check {
    color: var(--color-header-green);
    font-weight: 700;
    font-size: 1rem;
  }

  .quest-tech {
    margin-top: 8px;
  }

  .tech-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 10px;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 600px) {
    .quest-title {
      font-size: 1.8rem;
    }
  }
</style>
