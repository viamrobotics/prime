<script lang="ts">
	import type { LngLat } from 'maplibre-gl';

	import type { MapLibreContext } from '../../useMapLibre.svelte.ts';
	import ContextProbe from './ContextProbe.svelte';
	import MapFrame from '../../../../../test/fixtures/MapFrame.svelte';

	interface Props {
		zoom?: number;
		center?: LngLat;
		satellite?: boolean;
		onContext?: (context: MapLibreContext) => void;
	}

	const { zoom, center, satellite, onContext }: Props = $props();
</script>

<MapFrame {zoom} {center} {satellite}>
	<ContextProbe {onContext} />
</MapFrame>
