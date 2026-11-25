<!--
@component
Latitude and longitude fields that show and set the center of the enclosing `<MapLibre>` map.
With a `storageKey`, the center and zoom persist in `localStorage` under it, and the map returns
to them on the next mount.

```svelte
<MapLibre>
	<CenterControls storageKey="robot-map-view" />
</MapLibre>
```
-->
<script lang="ts">
	import type { LngLat } from 'maplibre-gl';

	import { onMount } from 'svelte';

	import LngLatInput from '../LngLatInput/LngLatInput.svelte';
	import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';
	import { useMapLibreEvent } from '../MapLibre/useMapLibreEvent.svelte.ts';
	import { readMapView, writeMapView } from './map-view-storage.ts';

	interface Props {
		/** The `localStorage` key the view persists under. Without one, nothing persists. */
		storageKey?: string;
	}

	const { storageKey }: Props = $props();

	const context = useMapLibre();

	onMount(() => {
		const saved = storageKey === undefined ? undefined : readMapView(storageKey);
		if (saved) {
			context.map.jumpTo({ center: saved.center, zoom: saved.zoom });
		}
	});

	const handleInput = (center: LngLat) => {
		context.map.jumpTo({ center });
	};

	useMapLibreEvent('move', () => {
		if (storageKey === undefined) {
			return;
		}

		const { lng, lat } = context.map.getCenter();
		writeMapView(storageKey, { center: { lng, lat }, zoom: context.map.getZoom() });
	});
</script>

<LngLatInput lng={context.center.lng} lat={context.center.lat} oninput={handleInput} />
