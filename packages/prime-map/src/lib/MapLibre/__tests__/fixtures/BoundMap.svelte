<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import { LngLat } from 'maplibre-gl';

	import MapReady from '../../../../../test/fixtures/MapReady.svelte';
	import SatelliteControls from '../../../controls/SatelliteControls.svelte';
	import MapLibre from '../../MapLibre.svelte';

	interface Props {
		onCreate: (map: Map) => void;
	}

	const { onCreate }: Props = $props();

	let center = $state(new LngLat(0, 0));
	let zoom = $state(4);
	let satellite = $state(false);
</script>

<button type="button" onclick={() => (zoom = 8)}>Zoom to 8</button>
<button type="button" onclick={() => (satellite = true)}>Show satellite</button>

<div style="width: 400px; height: 300px">
	<MapLibre bind:center bind:zoom bind:satellite>
		<MapReady {onCreate} />
		<SatelliteControls />
	</MapLibre>
</div>

<output data-testid="bound-lng">{center.lng}</output>
<output data-testid="bound-zoom">{zoom}</output>
<output data-testid="bound-satellite">{satellite}</output>
