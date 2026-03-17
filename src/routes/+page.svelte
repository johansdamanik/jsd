<script lang="ts">
  import Navbar from '$lib/components/sections/Navbar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Philosophy from '$lib/components/sections/Philosophy.svelte';
  import SelectedWork from '$lib/components/sections/SelectedWork.svelte';
  import Capabilities from '$lib/components/sections/Capabilities.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';
  import SectionDivider from '$lib/components/ui/SectionDivider.svelte';
</script>

<Navbar />

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <Hero />
  <SectionDivider />
  <Philosophy />
  <SectionDivider />
  <SelectedWork />
  <SectionDivider />
  <Capabilities />
  <SectionDivider />
  <Contact />
</main>
