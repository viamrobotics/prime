<script lang="ts">
	import type { Map } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';

	import MapLibre from '../../src/lib/MapLibre/MapLibre.svelte';
	import MapReady from './MapReady.svelte';

	interface Props extends ComponentProps<typeof MapLibre> {
		onCreate?: (map: Map) => void;
	}

	let { map = $bindable(), onCreate, children, ...props }: Props = $props();
</script>

<div style="width: 400px; height: 300px">
	<MapLibre bind:map {...props}>
		{#if onCreate}
			<MapReady {onCreate} />
		{/if}
		{@render children?.()}
	</MapLibre>
</div>
