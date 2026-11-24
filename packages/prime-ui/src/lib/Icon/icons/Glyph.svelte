<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import { iconRole } from '../icon-role.ts';

	interface Props extends SVGAttributes<SVGElement> {
		/** Layers drawn in order, each a path `d` on a 24×24 viewBox with an optional opacity. */
		paths: { d: string; opacity?: number }[];
	}

	const { paths, class: extraClasses, ...restProps }: Props = $props();

	const roleAttributes = $derived(iconRole(restProps));
</script>

<svg
	{...roleAttributes}
	{...restProps}
	viewBox="0 0 24 24"
	focusable="false"
	fill="currentColor"
	class={extraClasses}
>
	{#each paths as { d, opacity } (d)}
		<path {d} {opacity} fill-rule="evenodd" />
	{/each}
</svg>
