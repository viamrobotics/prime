<script lang="ts">
	import { resolve } from '$app/paths';

	const surfaces = ['bg-extralight', 'bg-light', 'bg-medium'];
</script>

{#snippet contents(label: string)}
	<p class="font-medium">{label}</p>
	<p class="text-subtle-1 text-sm">
		<code class="text-code">dark:</code> is
		<span class="dark:hidden">inactive</span><span class="hidden dark:inline">active</span>
	</p>
{/snippet}

<main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 pt-16">
	<header>
		<a href={resolve('/')} class="text-link underline">Back to all tokens</a>
		<h1 class="text-heading mt-2 text-3xl font-medium">Dark mode scoping</h1>
		<p class="text-subtle-1 mt-2 max-w-2xl">
			This page tests the class-driven rules. Use the "Switch to dark" / "Switch to light" button to
			flip the page-level mode and watch which boxes change.
		</p>
	</header>

	<section class="border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-2 rounded border p-4">
		{@render contents('Follows the page')}
	</section>

	<section class="dark border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-4 rounded border p-4">
		{@render contents('Forced dark')}
		<div class="flex gap-4">
			{#each surfaces as surface (surface)}
				<div class="border-light text-default flex-1 rounded border p-4 text-sm {surface}">{surface}</div>
			{/each}
		</div>

		<div class="light border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-4 rounded border p-4">
			{@render contents('Forced light inside dark')}

			<div class="dark border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-2 rounded border p-4">
				{@render contents('Dark re-nested inside light')}
				<p class="text-subtle-1 text-sm">
					Tokens flip here, but <code class="text-code">dark:</code> utilities stay inactive. This is a documented
					limitation.
				</p>
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-2">
		<p class="text-display">Display 24/26 Space Grotesk 500</p>
		<code class="text-code">text-code: Roboto Mono at text-xs</code>
	</section>
</main>
