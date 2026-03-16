<script lang="ts">
  interface MapNode {
    name: string;
    icon: string;
    projects: string[];
  }

  const regions: MapNode[] = [
    { name: 'E-commerce', icon: '🏰', projects: ['KartelDaun'] },
    { name: 'POS / Operations', icon: '⚒', projects: ['Kasira POS', 'Vehicheck'] },
    { name: 'Media Platforms', icon: '📡', projects: ['Rice Media', 'Dzmanga'] },
    { name: 'Mobile Apps', icon: '📱', projects: ['Restaurant App'] },
    { name: 'Community Apps', icon: '🌍', projects: ['Pokédex'] },
  ];

  let activeRegion = $state<MapNode | null>(null);
</script>

<section id="map" class="map-section">
  <div class="map-container">
    <div class="rpg-panel map-panel">
      <div class="rpg-header">🗺 Project Map</div>
      <div class="rpg-body">
        <div class="map-layout">
          <!-- Map Grid -->
          <div class="map-grid">
            {#each regions as region}
              <button
                class="map-node"
                class:active={activeRegion?.name === region.name}
                onclick={() => activeRegion = region}
              >
                <span class="node-icon">{region.icon}</span>
                <span class="node-name">{region.name}</span>
                <span class="node-count">{region.projects.length} quest{region.projects.length > 1 ? 's' : ''}</span>
              </button>
            {/each}

            <!-- Connecting lines (decorative) -->
            <svg class="map-lines" viewBox="0 0 500 200" preserveAspectRatio="none">
              <line x1="100" y1="50" x2="250" y2="50" stroke="#6b4c2a" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>
              <line x1="250" y1="50" x2="400" y2="50" stroke="#6b4c2a" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>
              <line x1="100" y1="150" x2="250" y2="150" stroke="#6b4c2a" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>
              <line x1="250" y1="50" x2="250" y2="150" stroke="#6b4c2a" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>
            </svg>
          </div>

          <!-- Region Detail -->
          {#if activeRegion}
            <div class="region-detail">
              <div class="region-header">
                <span class="region-icon">{activeRegion.icon}</span>
                <h3>{activeRegion.name}</h3>
              </div>
              <div class="rpg-divider">◆</div>
              <div class="region-quests">
                {#each activeRegion.projects as project}
                  <div class="quest-entry">
                    <span class="quest-marker">▸</span>
                    {project}
                  </div>
                {/each}
              </div>
            </div>
          {:else}
            <div class="region-detail empty">
              <span class="empty-icon">🗺</span>
              <p>Select a region to explore</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .map-section {
    padding: 0 20px 60px;
    display: flex;
    justify-content: center;
  }

  .map-container {
    max-width: 900px;
    width: 100%;
  }

  .map-panel {
    width: 100%;
  }

  .map-layout {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 20px;
    min-height: 280px;
  }

  .map-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    align-content: start;
    position: relative;
  }

  .map-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .map-node {
    position: relative;
    z-index: 1;
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    padding: 16px 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-family: var(--font-pixel);
  }

  .map-node:hover {
    border-color: var(--color-gold);
    background: var(--color-parchment);
    box-shadow: 0 0 12px rgba(201, 168, 76, 0.3);
    transform: translateY(-2px);
  }

  .map-node.active {
    border-color: var(--color-gold);
    background: linear-gradient(180deg, var(--color-parchment), var(--color-parchment-dark));
    box-shadow:
      0 0 16px rgba(201, 168, 76, 0.4),
      inset 0 0 0 1px var(--color-gold-dark);
  }

  .node-icon {
    font-size: 2rem;
  }

  .node-name {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-text-dark);
  }

  .node-count {
    font-size: 0.7rem;
    color: var(--color-text-muted);
  }

  .region-detail {
    background: var(--color-parchment-dark);
    border: 2px solid var(--color-border-bronze);
    border-radius: 4px;
    padding: 20px;
    box-shadow: inset 0 0 15px rgba(42, 31, 14, 0.08);
  }

  .region-detail.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }

  .empty-icon {
    font-size: 2.5rem;
    opacity: 0.5;
    margin-bottom: 8px;
  }

  .region-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .region-icon {
    font-size: 1.8rem;
  }

  .region-header h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text-dark);
  }

  .region-quests {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .quest-entry {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--color-text-brown);
    padding: 8px 10px;
    background: rgba(58, 110, 58, 0.05);
    border-left: 3px solid var(--color-header-green);
    border-radius: 2px;
  }

  .quest-marker {
    color: var(--color-gold);
    font-weight: 700;
  }

  @media (max-width: 700px) {
    .map-layout {
      grid-template-columns: 1fr;
    }

    .map-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
