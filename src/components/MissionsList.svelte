<script lang="ts">
  import ProjectQuest from './ProjectQuest.svelte';

  const flagshipMission = {
    title: "KartelDaun",
    description: [
      "KartelDaun is an international e-commerce platform for exotic plants, designed to support global customers purchasing rare plants with worldwide shipping.",
      "The platform supports product browsing, purchasing flows, operational management, and reliable backend services for handling product data and transactions."
    ],
    tech: ["PHP Laravel", "Vue", "Quasar", "Firebase", "MySQL", "Pinia", "Axios", "Tailwind CSS"],
    role: "Full-Stack Engineer",
    isFlagship: true
  };

  const otherMissions = [
    {
      title: "Kasira POS",
      description: "A specialized Point of Sale (POS) system designed for food and beverage businesses, focusing on operational speed, structured ordering, and robust payment flows. Built to streamline restaurant and cafe management.",
      tech: ["Vue / Nuxt 3", "Tailwind CSS", "TypeScript", "Node.js"],
      role: "System Engineer"
    },
    {
      title: "Pokédex",
      description: "Interactive Pokédex application presenting complex game data through a clean, intuitive, and responsive retro-inspired interface.",
      tech: ["Vue 3", "Tailwind CSS", "PokéAPI", "TypeScript"],
      role: "Frontend Developer"
    },
    {
      title: "Vehicheck",
      description: "Vehicle inspection and tracking system. Built to digitize physical checking workflows and maintain accurate operational records.",
      tech: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
      role: "Full-Stack Developer"
    },
    {
      title: "Rice Media",
      description: "Digital media platform focusing on high-performance content delivery and modern editorial layouts.",
      tech: ["Nuxt 3", "Vue.js", "Tailwind CSS", "Headless CMS"],
      role: "Frontend Engineer"
    },
    {
      title: "Dzmanga",
      description: "Manga reading application with a focus on seamless image loading, state management for user progress, and clean reading interfaces.",
      tech: ["React Native", "Redux", "Node.js", "MongoDB"],
      role: "Mobile Developer"
    },
    {
      title: "Restaurant App",
      description: "Customer-facing digital ordering and menu application for restaurants, optimized for mobile usage without app installation.",
      tech: ["Next.js", "React", "PostgreSQL", "Prisma"],
      role: "Full-Stack Engineer"
    }
  ];
</script>

<div class="mb-12" id="missions">
  <div class="mb-8">
    <h2 class="text-xl md:text-3xl font-press-start text-retro-text mb-2 flex items-center gap-4">
      <span class="text-retro-green animate-pulse">&gt;</span> 
      ACTIVE MISSIONS
    </h2>
    <div class="w-full h-1 bg-retro-panel mb-1"></div>
    <div class="w-[70%] h-1 bg-retro-green"></div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <!-- Flagship mission spans full width or at least larger area -->
    <div class="lg:col-span-2">
      <ProjectQuest {...flagshipMission} />
    </div>

    {#each otherMissions as mission}
      <div class="col-span-1">
        <ProjectQuest {...mission} />
      </div>
    {/each}
  </div>
</div>
