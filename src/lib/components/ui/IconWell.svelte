<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		size = 'md',
		deep = true,
		raised = false,
		rounded = 'full'
	} = $props<{
		children: Snippet;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		deep?: boolean;
		raised?: boolean;
		rounded?: 'full' | 'xl' | '2xl';
	}>();

	const sizeClasses: Record<string, string> = {
		sm: 'w-10 h-10',
		md: 'w-14 h-14',
		lg: 'w-20 h-20'
	};

	const roundedClasses: Record<string, string> = {
		full: 'rounded-full',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl'
	};

	let depthClass = $derived(raised ? 'shadow-neo-extruded-small' : (deep ? 'shadow-neo-inset-deep' : 'shadow-neo-inset'));
</script>

<div class="flex items-center justify-center bg-neo-bg {sizeClasses[size]} {roundedClasses[rounded]} {depthClass} {className}">
	<div class="text-neo-accent">
		{@render children()}
	</div>
</div>
