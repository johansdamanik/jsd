<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type ButtonProps = {
		variant?: 'primary' | 'secondary';
		href?: string;
		class?: string;
		children: Snippet;
	} & (HTMLButtonAttributes | HTMLAnchorAttributes);

	let { variant = 'secondary', href, class: className = '', children, ...rest }: ButtonProps = $props();

	const baseClasses =
		'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg active:translate-y-0.5 active:scale-[0.98] min-h-12 min-w-12 px-6 py-3';

	const variants: Record<string, string> = {
		primary:
			'bg-neo-accent text-white shadow-[6px_6px_12px_rgba(79,70,229,0.3),-6px_-6px_12px_rgba(255,255,255,0.4)] hover:-translate-y-px hover:shadow-[8px_8px_16px_rgba(79,70,229,0.4),-8px_-8px_16px_rgba(255,255,255,0.5)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]',
		secondary:
			'bg-neo-bg text-neo-fg shadow-neo-extruded hover:-translate-y-px hover:shadow-neo-extruded-hover hover:text-neo-accent active:shadow-neo-inset-small'
	};
</script>

{#if href}
	<a {href} class="{baseClasses} {variants[variant]} {className}" {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button class="{baseClasses} {variants[variant]} {className}" {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
