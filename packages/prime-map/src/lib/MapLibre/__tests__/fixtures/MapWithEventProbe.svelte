<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import EventProbe from './EventProbe.svelte';
	import MapFrame from '../../../../../test/fixtures/MapFrame.svelte';

	interface Props {
		listening: boolean;
		onMove: () => void;
		onCreate: (map: Map) => void;
	}

	const { listening, onMove, onCreate }: Props = $props();
</script>

<MapFrame {onCreate}>
	{#if listening}
		<EventProbe {onMove} />
	{/if}
</MapFrame>
