<script lang="ts">
  import Navbar from './components/Navbar.svelte';
  import HeroProfile from './components/HeroProfile.svelte';
  import AboutSection from './components/AboutSection.svelte';
  import SkillTree from './components/SkillTree.svelte';
  import MainMission from './components/MainMission.svelte';
  import OtherMissions from './components/OtherMissions.svelte';
  import DevTerminal from './components/DevTerminal.svelte';
  import ExperienceTimeline from './components/ExperienceTimeline.svelte';
  import ContactPanel from './components/ContactPanel.svelte';
</script>

<Navbar />

<main class="main-content">
  <HeroProfile />

  <div class="rpg-separator">◆</div>

  <AboutSection />
  <SkillTree />

  <div class="rpg-separator">⚔</div>

  <MainMission />
  <OtherMissions />

  <div class="rpg-separator">◆</div>

  <DevTerminal />
  <ExperienceTimeline />

  <div class="rpg-separator">✦</div>

  <ContactPanel />
</main>

<style>
  .main-content {
    position: relative;
    z-index: 1;
  }
</style>
