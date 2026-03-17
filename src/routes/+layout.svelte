<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.css';

	let { children } = $props();

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
</script>

<div class="min-h-screen text-neo-fg selection:bg-neo-accent selection:text-white pb-32 flex flex-col">
	<!-- Navbar could go here if extracted later -->
	{@render children()}
</div>
