<section id="contact" class="contact-section">
  <div class="contact-container">
    <div class="rpg-panel contact-panel">
      <div class="rpg-header">✉ Let's Build Something</div>
      <div class="rpg-body">
        <div class="contact-content">
          <p class="contact-text">
            Looking for a developer who can build reliable full-stack systems for real products? Let's connect.
          </p>

          <div class="rpg-divider">◆ ◆ ◆</div>

          <div class="contact-links">
            <a href="mailto:johansdamanik@gmail.com" class="contact-link">
              <span class="link-icon">📧</span>
              <div class="link-info">
                <span class="link-label">Email</span>
                <span class="link-value">johansdamanik@gmail.com</span>
              </div>
            </a>

            <a href="https://github.com/johansdamanik" target="_blank" rel="noopener" class="contact-link">
              <span class="link-icon">🐙</span>
              <div class="link-info">
                <span class="link-label">GitHub</span>
                <span class="link-value">github.com/johansdamanik</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/" target="_blank" rel="noopener" class="contact-link">
              <span class="link-icon">💼</span>
              <div class="link-info">
                <span class="link-label">LinkedIn</span>
                <span class="link-value">linkedin.com/in/johan-simeon-damanik</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <span class="footer-text">◆ Simeon — Full-Stack Developer ◆</span>
      <div class="footer-links">
        <a href="mailto:johansdamanik@gmail.com">📧</a>
        <a href="https://github.com/johansdamanik" target="_blank" rel="noopener">🐙</a>
        <a href="https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/" target="_blank" rel="noopener">💼</a>
      </div>
      <span class="footer-sub">Built with ⚔ and code</span>
    </div>
  </div>
</section>

<style>
  .contact-section {
    padding: 0 20px 40px;
    display: flex;
    justify-content: center;
  }

  .contact-container {
    max-width: 600px;
    width: 100%;
  }

  .contact-panel {
    width: 100%;
  }

  .contact-content {
    text-align: center;
  }

  .contact-text {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--color-text-brown);
    margin-bottom: 8px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .contact-link:hover {
    border-color: var(--color-gold);
    background: var(--color-parchment);
    box-shadow: 0 0 12px rgba(201, 168, 76, 0.2);
    transform: translateX(4px);
  }

  .link-icon {
    font-size: 1.6rem;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-dungeon-surface);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    flex-shrink: 0;
  }

  .link-info {
    display: flex;
    flex-direction: column;
  }

  .link-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .link-value {
    font-size: 0.95rem;
    color: var(--color-text-dark);
    font-weight: 600;
  }

  .footer {
    text-align: center;
    padding: 32px 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .footer-text {
    font-size: 0.85rem;
    color: var(--color-gold-dark);
    font-weight: 600;
  }

  .footer-links {
    display: flex;
    gap: 16px;
  }

  .footer-links a {
    font-size: 1.2rem;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.2s ease;
  }

  .footer-links a:hover {
    opacity: 1;
  }

  .footer-sub {
    font-size: 0.7rem;
    color: rgba(240, 230, 208, 0.3);
  }
</style>
