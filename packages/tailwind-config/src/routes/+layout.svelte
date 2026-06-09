<script lang="ts">
	import './layout.css';
	import '../../fonts.js';
	import { onMount } from 'svelte';

	const { children } = $props();

	let mode = $state<'light' | 'dark'>('light');

	// Seed from the OS preference on first client load; the toggle takes over after.
	onMount(() => {
		mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	});

	// Drive the theme by toggling the class the dark config keys off of.
	// $effect runs only on the client, dodging document access during prerender.
	$effect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', mode === 'dark');
		root.classList.toggle('light', mode === 'light');
	});
</script>

<button
	type="button"
	aria-pressed={mode === 'dark'}
	onclick={() => (mode = mode === 'dark' ? 'light' : 'dark')}
	class="border-medium bg-light text-default hover:bg-medium fixed top-4 right-4 z-max flex items-center gap-2 rounded border px-3 py-1.5 text-sm font-medium shadow-sm"
>
	{mode === 'dark' ? 'Switch to light' : 'Switch to dark'}
</button>

{@render children()}
