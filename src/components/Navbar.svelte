<script lang="ts">
  let activeSection = $state("profile");

  const menuItems = [
    { id: "profile", label: "⚔ Profile", href: "#profile" },
    { id: "skills", label: "🎒 Inventory", href: "#skills" },
    { id: "main-mission", label: "⭐ Main Quest", href: "#main-mission" },
    { id: "missions", label: "📜 Missions", href: "#missions" },
    { id: "terminal", label: "💻 Terminal", href: "#terminal" },
    { id: "experience", label: "📖 Log", href: "#experience" },
    { id: "contact", label: "✉ Contact", href: "#contact" },
  ];

  let mobileMenuOpen = $state(false);

  function handleClick(id: string) {
    activeSection = id;
    mobileMenuOpen = false;
  }

  function handleScroll() {
    const sections = menuItems.map((item) => document.getElementById(item.id));
    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPos) {
        activeSection = menuItems[i].id;
        break;
      }
    }
  }
</script>

<svelte:window onscroll={handleScroll} />

<nav class="navbar" aria-label="Main navigation">
  <div class="navbar-inner">
    <a
      href="#profile"
      class="navbar-brand"
      onclick={() => handleClick("profile")}
    >
      <span class="brand-icon"><img src="/icon.png" alt="Simeon" /></span>
      <span class="brand-text">Simeon</span>
      <span class="brand-class">DEV</span>
    </a>

    <button
      class="mobile-toggle"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileMenuOpen}
    >
      {mobileMenuOpen ? "✕" : "☰"}
    </button>

    <div class="navbar-menu" class:open={mobileMenuOpen}>
      {#each menuItems as item}
        <a
          href={item.href}
          class="navbar-item"
          class:active={activeSection === item.id}
          onclick={() => handleClick(item.id)}
        >
          {item.label}
        </a>
      {/each}
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: linear-gradient(180deg, #1a1831 0%, #12101f 100%);
    border-bottom: 3px solid var(--color-border-bronze);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  }

  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 4px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--color-text-cream);
    font-weight: 700;
    font-size: 1.2rem;
  }

  .brand-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .brand-icon img {
    display: block;
    width: 56px;
    height: auto;
    image-rendering: pixelated;
  }

  .brand-text {
    color: var(--color-gold);
  }

  .brand-class {
    font-size: 0.65rem;
    color: var(--color-header-green-light);
    background: rgba(58, 110, 58, 0.2);
    border: 1px solid rgba(58, 110, 58, 0.4);
    padding: 2px 6px;
    border-radius: 2px;
    letter-spacing: 1px;
  }

  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .navbar-item {
    padding: 8px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-cream);
    text-decoration: none;
    border-radius: 3px;
    transition: all 0.15s ease;
    white-space: nowrap;
    opacity: 0.7;
  }

  .navbar-item:hover {
    opacity: 1;
    background: rgba(201, 168, 76, 0.1);
    color: var(--color-gold);
  }

  .navbar-item.active {
    opacity: 1;
    color: var(--color-gold);
    background: rgba(201, 168, 76, 0.15);
    border-bottom: 2px solid var(--color-gold);
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: 2px solid var(--color-border-bronze);
    color: var(--color-gold);
    font-size: 1.2rem;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 3px;
    font-family: var(--font-pixel);
  }

  @media (max-width: 900px) {
    .mobile-toggle {
      display: block;
    }

    .navbar-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1a1831;
      border-bottom: 3px solid var(--color-border-bronze);
      flex-direction: column;
      padding: 8px;
      gap: 2px;
    }

    .navbar-menu.open {
      display: flex;
    }

    .navbar-item {
      padding: 12px 16px;
      width: 100%;
      text-align: left;
    }

    .brand-icon img {
      width: 48px;
    }
  }
</style>
