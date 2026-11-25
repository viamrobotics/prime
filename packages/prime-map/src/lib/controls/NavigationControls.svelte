<!--
@component
maplibre-gl's zoom buttons and compass on the enclosing `<MapLibre>` map.

```svelte
<MapLibre>
	<NavigationControls position="top-left" />
</MapLibre>
```

See [maplibre-gl's `NavigationControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/).
-->
<script lang="ts">
	import { NavigationControl, type ControlPosition } from 'maplibre-gl';

	import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';

	interface Props {
		/** The map corner the controls sit in. @default 'top-right' */
		position?: ControlPosition;
		/** Whether the compass shows. @default true */
		showCompass?: boolean;
		/** Whether the zoom buttons show. @default true */
		showZoom?: boolean;
		/** Whether the compass tilts with the camera pitch. @default true */
		visualizePitch?: boolean;
	}

	const {
		position = 'top-right',
		showCompass = true,
		showZoom = true,
		visualizePitch = true
	}: Props = $props();

	const context = useMapLibre();

	// maplibre-gl builds the buttons in the constructor, so a changed option needs a new control.
	$effect(() => {
		const map = context.map;
		const control = new NavigationControl({ showCompass, showZoom, visualizePitch });
		map.addControl(control, position);

		return () => {
			map.removeControl(control);
		};
	});
</script>
