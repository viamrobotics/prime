<script lang="ts">
	import './layout.css';
	import '@viamrobotics/tailwind-config/fonts';
	import { ThemeUtils } from 'svelte-tweakpane-ui';
	import { primeTheme } from '../lib/index.js';

	// $effect runs only on the client, dodging window access during prerender.
	$effect(() => {
		ThemeUtils.setGlobalDefaultTheme(primeTheme);
	});

	const { children } = $props();
</script>

{@render children()}
