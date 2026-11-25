<!--
@component
A marker on the enclosing `<MapLibre>` map. Without an `element` it draws maplibre-gl's default
pin in `color`.

```svelte
<MapLibre>
	<MapLibreMarker lng={-73.98} lat={40.77} color="blue" />
</MapLibre>
```
-->
<script lang="ts">
	import { LngLat, Marker } from 'maplibre-gl';

	import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';

	interface Props {
		/** The longitude of the marker. @default 0 */
		lng?: number;
		/** The latitude of the marker. @default 0 */
		lat?: number;
		/** The rotation of the marker, clockwise in degrees. @default 0 */
		rotation?: number;
		/** The relative size of the marker. @default 1 */
		scale?: number;
		/** The color of the default pin. */
		color?: string;
		/** An element drawn in place of the default pin. */
		element?: HTMLElement;
	}

	const { lng = 0, lat = 0, rotation = 0, scale = 1, color = '', element }: Props = $props();

	const context = useMapLibre();

	const marker = $derived.by(() => {
		const value = new Marker(element ? { element, scale, color } : { scale, color });
		value.setLngLat(new LngLat(0, 0));
		value.getElement().style.zIndex = '1';
		return value;
	});

	$effect.pre(() => {
		const current = marker;
		current.addTo(context.map);
		return () => {
			current.remove();
		};
	});

	$effect.pre(() => {
		marker.setLngLat(new LngLat(lng, lat));
	});

	$effect.pre(() => {
		marker.setRotation(rotation);
	});
</script>
