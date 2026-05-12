<script lang="ts">
	import { Icon, IconPathsByName, IconSizes, type IconName } from '$lib';

	const sizes = Object.keys(IconSizes) as (keyof typeof IconSizes)[];
	const allNames = Object.keys(IconPathsByName) as IconName[];
</script>

<div class="space-y-10">
	<header>
		<h1 class="text-xl font-semibold tracking-tight">Icon</h1>
	</header>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">Sizes</h2>
		<div class="border-light flex items-end gap-6 rounded border bg-white p-6">
			{#each sizes as size (size)}
				<div class="flex flex-col items-center gap-2">
					<Icon name="rocket-launch-outline" {size} />
					<span class="text-subtle-1 font-mono text-[11px]">{size}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">Color via currentColor</h2>
		<div class="border-light flex gap-6 rounded border bg-white p-6">
			<Icon name="alert-circle" size="xl" class="text-danger-dark" />
			<Icon name="alert" size="xl" class="text-warning-dark" />
			<Icon name="information" size="xl" class="text-info-dark" />
			<Icon name="check-circle" size="xl" class="text-success-dark" />
			<Icon name="cog" size="xl" class="text-subtle-1" />
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">
			All icons ({allNames.length})
		</h2>
		<div
			class="border-light grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-2 rounded border bg-white p-3"
		>
			{#each allNames as name (name)}
				<div class="flex items-center gap-2 rounded p-2 hover:bg-light">
					<Icon {name} size="lg" />
					<span class="truncate font-mono text-[11px]">{name}</span>
				</div>
			{/each}
		</div>
	</section>
</div>
