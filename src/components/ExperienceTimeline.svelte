<section id="experience" class="experience-section" aria-label="Work experience">
  <div class="experience-container">
    <div class="rpg-panel experience-panel">
      <div class="rpg-header">📖 Experience Log</div>
      <div class="rpg-body">
        <div class="log-entries">
          <!-- Entry 1 -->
          <div class="log-entry">
            <div class="entry-marker">
              <div class="marker-dot active"></div>
              <div class="marker-line"></div>
            </div>
            <div class="entry-content">
              <div class="entry-header">
                <h3 class="entry-title">Full Stack Developer</h3>
                <span class="entry-org">PT Kartel Daun International</span>
              </div>
              <div class="entry-status">
                <span class="rpg-badge">⚔ ACTIVE QUEST</span>
              </div>
              <ul class="entry-details">
                <li>Built and maintained full-stack e-commerce platform serving international customers</li>
                <li>Architected backend services, APIs, and database models for product and operational workflows</li>
                <li>Developed frontend interfaces for product discovery and admin management</li>
                <li>Implemented scalable infrastructure supporting business growth</li>
              </ul>
            </div>
          </div>

          <!-- Entry 2 -->
          <div class="log-entry">
            <div class="entry-marker">
              <div class="marker-dot completed"></div>
              <div class="marker-line"></div>
            </div>
            <div class="entry-content">
              <div class="entry-header">
                <h3 class="entry-title">Front End Developer</h3>
                <span class="entry-org">PT Kartel Daun International</span>
              </div>
              <div class="entry-status">
                <span class="rpg-badge">✓ COMPLETED</span>
              </div>
              <ul class="entry-details">
                <li>Developed responsive user interfaces for customer-facing e-commerce platform</li>
                <li>Built component-based frontend architecture for product browsing and discovery</li>
                <li>Optimized user experience and interface performance across devices</li>
              </ul>
            </div>
          </div>

          <!-- Entry 3 -->
          <div class="log-entry">
            <div class="entry-marker">
              <div class="marker-dot completed"></div>
            </div>
            <div class="entry-content">
              <div class="entry-header">
                <h3 class="entry-title">Digital Products Seller</h3>
                <span class="entry-org">Self Employed — Shopee</span>
              </div>
              <div class="entry-status">
                <span class="rpg-badge">✓ COMPLETED</span>
              </div>
              <ul class="entry-details">
                <li>Managed digital product listings and e-commerce storefront operations</li>
                <li>Handled customer workflows and order fulfillment processes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .experience-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .experience-container {
    max-width: 800px;
    width: 100%;
  }

  .experience-panel {
    width: 100%;
  }

  .log-entries {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .log-entry {
    display: flex;
    gap: 16px;
    padding-bottom: 24px;
  }

  .log-entry:last-child {
    padding-bottom: 0;
  }

  .entry-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 4px;
  }

  .marker-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid var(--color-border-bronze);
    flex-shrink: 0;
  }

  .marker-dot.active {
    background: var(--color-header-green);
    border-color: var(--color-header-green-dark);
    box-shadow: 0 0 8px rgba(58, 110, 58, 0.5);
  }

  .marker-dot.completed {
    background: var(--color-gold);
    border-color: var(--color-gold-dark);
  }

  .marker-line {
    width: 2px;
    flex: 1;
    background: var(--color-border-bronze);
    margin-top: 4px;
    opacity: 0.5;
  }

  .entry-content {
    flex: 1;
  }

  .entry-header {
    margin-bottom: 6px;
  }

  .entry-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text-dark);
    line-height: 1.2;
  }

  .entry-org {
    font-size: 0.85rem;
    color: var(--color-header-green);
    font-weight: 600;
  }

  .entry-status {
    margin-bottom: 10px;
  }

  .entry-details {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .entry-details li {
    font-size: 0.85rem;
    color: var(--color-text-brown);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
  }

  .entry-details li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--color-gold);
    font-weight: 700;
  }

  @media (max-width: 600px) {
    .entry-title {
      font-size: 1rem;
    }
  }
</style>
