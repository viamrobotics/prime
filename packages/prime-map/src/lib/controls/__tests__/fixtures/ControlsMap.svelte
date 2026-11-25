<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import { LngLat } from 'maplibre-gl';

	import MapFrame from '../../../../../test/fixtures/MapFrame.svelte';
	import DirectionalMarker from '../../../Marker/DirectionalMarker.svelte';
	import MapLibreMarker from '../../../Marker/Marker.svelte';
	import CenterControls from '../../CenterControls.svelte';
	import FollowControls from '../../FollowControls.svelte';
	import NavigationControls from '../../NavigationControls.svelte';
	import SatelliteControls from '../../SatelliteControls.svelte';

	type Part = 'center' | 'follow' | 'navigation' | 'satellite' | 'marker' | 'directional-marker';

	interface Props {
		parts: Part[];
		onCreate: (map: Map) => void;
		lng?: number;
		lat?: number;
		following?: boolean;
		storageKey?: string;
		showZoom?: boolean;
	}

	let {
		parts,
		onCreate,
		lng,
		lat,
		following = $bindable(false),
		storageKey,
		showZoom
	}: Props = $props();
</script>

<MapFrame center={new LngLat(0, 0)} zoom={4} {onCreate}>
	{#if parts.includes('center')}
		<CenterControls {storageKey} />
	{/if}
	{#if parts.includes('follow')}
		<FollowControls {lng} {lat} bind:following />
	{/if}
	{#if parts.includes('navigation')}
		<NavigationControls {showZoom} />
	{/if}
	{#if parts.includes('satellite')}
		<SatelliteControls />
	{/if}
	{#if parts.includes('marker')}
		<MapLibreMarker lng={lng ?? 0} lat={lat ?? 0} rotation={45} />
	{/if}
	{#if parts.includes('directional-marker')}
		<DirectionalMarker lng={lng ?? 0} lat={lat ?? 0} />
	{/if}
</MapFrame>
