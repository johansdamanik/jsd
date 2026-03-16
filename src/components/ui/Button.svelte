<script lang="ts">
  import { type Snippet } from 'svelte';
  
  interface Props {
    children: Snippet;
    onclick?: (e: MouseEvent) => void;
    class?: string;
    variant?: 'default' | 'primary' | 'ghost';
    href?: string;
  }

  let { 
    children, 
    onclick, 
    class: className = '',
    variant = 'default',
    href = undefined
  }: Props = $props();

  const variantClasses: Record<'default' | 'primary' | 'ghost', string> = {
    default: 'bg-retro-panel text-retro-text hover:bg-slate-700',
    primary: 'bg-retro-green text-retro-bg border-retro-green hover:bg-green-400',
    ghost: 'bg-transparent border-transparent hover:border-retro-text text-retro-text shadow-none hover:shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.5)]'
  };
</script>

{#if href}
  <a 
    {href}
    class={`inline-block font-press-start text-[10px] md:text-xs px-4 py-3 cursor-pointer select-none pixel-border-interactive ${variantClasses[variant]} ${className}`}
  >
    {@render children()}
  </a>
{:else}
  <button 
    {onclick}
    class={`font-press-start text-[10px] md:text-xs px-4 py-3 cursor-pointer select-none pixel-border-interactive ${variantClasses[variant]} ${className}`}
  >
    {@render children()}
  </button>
{/if}
