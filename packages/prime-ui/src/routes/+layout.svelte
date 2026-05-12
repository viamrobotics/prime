<script lang="ts">
	import './layout.css';
	import '@viamrobotics/tailwind-config/fonts';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { children } = $props();

	const components = [
		{ name: 'Icon', href: '/icon' },
		{ name: 'Input', href: '/input' },
		{ name: 'Label', href: '/label' }
	] as const;

	const currentRoute = $derived(page.route.id ?? '/');
</script>

<div class="flex min-h-screen text-default">
	<aside class="w-56 shrink-0 border-r border-light bg-light">
		<div class="border-b border-light p-4">
			<a href={resolve('/')} class="font-semibold tracking-tight no-underline">prime-ui</a>
			<p class="text-xs text-subtle-1">dev sandbox</p>
		</div>
		<nav class="flex flex-col p-2">
			{#each components as { name, href } (href)}
				<a
					href={resolve(href)}
					class={[
						'rounded px-3 py-1.5 text-sm no-underline hover:bg-white',
						currentRoute === href && 'bg-white font-medium'
					]}
				>
					{name}
				</a>
			{/each}
		</nav>
	</aside>
	<main class="flex-1 overflow-x-auto p-8">
		{@render children()}
	</main>
</div>
