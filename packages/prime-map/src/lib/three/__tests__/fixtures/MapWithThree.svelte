<script lang="ts">
	import type { Map } from 'maplibre-gl';
	import type { Camera, Scene } from 'three';

	import { LngLat } from 'maplibre-gl';

	import MapFrame from '../../../../../test/fixtures/MapFrame.svelte';
	import type { ThreeProbeState } from './three-probe.ts';
	import ThreeProbe from './ThreeProbe.svelte';

	interface Props {
		rendering: boolean;
		probes?: number;
		onCreate: (map: Map) => void;
		onReady: (state: ThreeProbeState) => void;
		render: (scene: Scene, camera: Camera) => void;
	}

	const { rendering, probes = 1, onCreate, onReady, render }: Props = $props();
</script>

<MapFrame center={new LngLat(0, 0)} zoom={15} {onCreate}>
	{#if rendering}
		{#each { length: probes }, index (index)}
			<ThreeProbe {onReady} {render} />
		{/each}
	{/if}
</MapFrame>
