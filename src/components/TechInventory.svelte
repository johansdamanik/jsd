<script lang="ts">
  import Panel from './ui/Panel.svelte';

  const inventory = [
    {
      category: "⚔ Frontend Gear",
      color: "text-retro-blue",
      items: ["Vue.js", "Nuxt", "React", "Next.js", "Quasar", "Tailwind"]
    },
    {
      category: "⚙ Backend Engine",
      color: "text-retro-green",
      items: ["Laravel", "Node.js", "NestJS", "Express", "Prisma"]
    },
    {
      category: "🧠 Databases",
      color: "text-retro-purple",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    {
      category: "☁ Infrastructure",
      color: "text-retro-yellow",
      items: ["Docker", "AWS", "Firebase"]
    }
  ];
</script>

<Panel title="Tech Inventory" class="mb-8" borderColor="border-retro-purple">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 font-pixel">
    {#each inventory as slot}
      <div class="pixel-border bg-retro-bg p-4 flex flex-col h-full group">
        <h3 class={`text-xs md:text-sm font-press-start mb-4 border-b-2 border-slate-700 pb-2 ${slot.color}`}>
          {slot.category}
        </h3>
        
        <div class="flex flex-wrap gap-2 mt-auto">
          {#each slot.items as item}
            <div class="pixel-border cursor-default bg-slate-800 px-3 py-1.5 text-xs text-gray-400 group-hover:text-retro-text hover:bg-slate-700 transition-colors">
              [ {item} ]
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Panel>
