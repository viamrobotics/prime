<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import { onMount } from 'svelte';

	import { useMapLibre } from '../../src/lib/MapLibre/useMapLibre.svelte.ts';

	interface Props {
		onCreate: (map: Map) => void;
	}

	const { onCreate }: Props = $props();

	const context = useMapLibre();

	onMount(() => {
		onCreate(context.map);
	});
</script>
