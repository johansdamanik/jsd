<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		hover = false,
		padding = 'p-8'
	} = $props<{
		children: Snippet;
		class?: string;
		hover?: boolean;
		padding?: string;
	}>();

	const baseClasses = 'bg-neo-bg rounded-[32px] shadow-neo-extruded border border-transparent';
	let hoverClasses = $derived(hover ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-neo-extruded-hover' : '');
</script>

<div class="{baseClasses} {hoverClasses} {padding} {className}">
	{@render children()}
</div>
