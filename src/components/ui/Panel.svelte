<script lang="ts">
  import { type Snippet } from 'svelte';
  
  let { 
    children, 
    title = '', 
    class: className = '',
    borderColor = 'border-retro-text'
  } = $props<{
    children: Snippet;
    title?: string;
    class?: string;
    borderColor?: string;
  }>();
</script>

<div class={`relative bg-retro-panel pixel-border p-4 md:p-6 ${borderColor} ${className}`}>
  {#if title}
    <div class="absolute -top-3 left-4 bg-retro-bg px-2 font-press-start text-[10px] sm:text-xs text-retro-yellow border border-retro-text uppercase">
      {title}
    </div>
  {/if}
  
  <div class="h-full">
    {@render children()}
  </div>
</div>
