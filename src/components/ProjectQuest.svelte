<script lang="ts">
  import Panel from './ui/Panel.svelte';

  interface Props {
    title: string;
    description: string | string[];
    tech: string[];
    role: string;
    isFlagship?: boolean;
  }

  let { 
    title, 
    description, 
    tech, 
    role, 
    isFlagship = false 
  }: Props = $props();

  let borderColor = $derived(isFlagship ? 'border-retro-yellow' : 'border-retro-purple');
  let tagColor = $derived(isFlagship ? 'text-retro-yellow' : 'text-retro-purple');
  let bgClass = $derived(isFlagship ? 'bg-slate-800' : 'bg-retro-panel');
</script>

<Panel title={isFlagship ? '★ MAIN MISSION ★' : 'SIDE QUEST'} {borderColor} class={`h-full flex flex-col ${bgClass}`}>
  <div class="mb-4">
    <h3 class={`text-xl md:text-3xl font-press-start mb-3 ${isFlagship ? 'text-retro-yellow' : 'text-white'}`}>
      {title}
    </h3>
    <div class="text-xs md:text-sm font-pixel text-retro-green bg-retro-bg inline-block px-2 py-1 pixel-border">
      Role: {role}
    </div>
  </div>

  <div class="space-y-4 mb-6 font-pixel text-sm md:text-base text-gray-300 flex-grow leading-relaxed md:leading-loose">
    {#if Array.isArray(description)}
      {#each description as paragraph}
        <p>{paragraph}</p>
      {/each}
    {:else}
      <p>{description}</p>
    {/if}
  </div>

  <div class="mt-auto">
    <div class={`text-[10px] md:text-xs font-press-start mb-3 ${tagColor}`}>Required Gear:</div>
    <div class="flex flex-wrap gap-2 font-pixel">
      {#each tech as t}
        <span class="pixel-border px-2 py-1 text-xs bg-retro-bg text-gray-400">
          {t}
        </span>
      {/each}
    </div>
  </div>
</Panel>
