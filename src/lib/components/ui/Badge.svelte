<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '', raised = false, hoverable = false } = $props<{
		children: Snippet;
		class?: string;
		raised?: boolean;
		hoverable?: boolean;
	}>();

    let depthClass = $derived(raised ? 'shadow-neo-extruded-small' : 'shadow-neo-inset-small');
    let hoverClasses = $derived(hoverable ? 'hover:shadow-neo-extruded-small hover:-translate-y-0.5 hover:text-neo-accent cursor-default' : '');
</script>

<div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 {depthClass} {hoverClasses} text-neo-muted bg-neo-bg {className}">
	{@render children()}
</div>
