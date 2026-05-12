<script lang="ts">
	import './layout.css';
	import '@viamrobotics/tailwind-config/fonts';

	import { page } from '$app/state';
	import { base } from '$app/paths';

	const { children } = $props();

	const components = [
		{ name: 'Icon', href: '/icon' },
		{ name: 'Input', href: '/input' },
		{ name: 'Label', href: '/label' }
	];

	const currentPath = $derived(page.url.pathname.replace(base, '') || '/');
</script>

<div class="flex min-h-screen text-default">
	<aside class="border-light w-56 shrink-0 border-r bg-light">
		<div class="border-light border-b p-4">
			<a href={base || '/'} class="font-semibold tracking-tight no-underline">prime-ui</a>
			<p class="text-subtle-1 text-xs">dev sandbox</p>
		</div>
		<nav class="flex flex-col p-2">
			{#each components as { name, href } (href)}
				<a
					href={`${base}${href}`}
					class={[
						'rounded px-3 py-1.5 text-sm no-underline hover:bg-white',
						currentPath === href && 'bg-white font-medium'
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
