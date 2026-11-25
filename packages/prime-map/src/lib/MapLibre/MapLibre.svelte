<!--
@component
A maplibre-gl map that fills its parent.

Children mount once the map loads its first style. They render inside the map's own positioned,
isolated box, so an absolutely positioned overlay sits relative to the map and its z-index never
competes with the host page. Children read the map through `useMapLibre`.

`center` and `zoom` follow the camera, so `bind:center` and `bind:zoom` track where the map is.
`bind:satellite` tracks the satellite view a `SatelliteControls` toggles.

```svelte
<MapLibre mapProvider="open-street">
	<MapLibreMarker lng={0} lat={0} />
</MapLibre>
```

```svelte
<MapLibre mapProvider="google-maps" mapProviderKey="my-api-key">
	<MapLibreMarker lng={0} lat={0} />
</MapLibre>
```
-->
<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';

	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	import { LngLat, Map, type MapOptions } from 'maplibre-gl';
	import { onMount, tick, untrack, type Snippet } from 'svelte';

	import { DEFAULT_MAX_ZOOM } from '../providers/default-max-zoom.ts';
	import { MapProviders, type MapProvider } from '../providers/map-provider.ts';
	import { SATELLITE_LAYER_ID } from '../providers/open-street-map-style.ts';
	import { getStyleSpecification } from '../providers/style-specification.ts';
	import { provideMapLibre } from './useMapLibre.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The minimum camera pitch. @default 0 */
		minPitch?: number;
		/** The maximum camera pitch. @default 60 */
		maxPitch?: number;
		/** The camera zoom. The camera writes it back as the map zooms. @default 9 */
		zoom?: number;
		/** The minimum zoom level of the map (0-24). @default 0 */
		minZoom?: number;
		/** The maximum zoom level of the map (0-24). @default 21 */
		maxZoom?: number;
		/** Classes for the map's outer box. */
		class?: ClassValue;
		/**
		 * The camera center. The camera writes it back as the map moves.
		 * @default the Viam office, lng -73.984421, lat 40.7718116
		 */
		center?: LngLat;
		/** The maplibre-gl `Map` instance, bound once the map is created. */
		map?: Map;
		/** Options passed to the maplibre-gl `Map` constructor, over the ones from these props. */
		options?: Partial<MapOptions>;
		/** The tile provider. @default 'open-street' */
		mapProvider?: MapProvider;
		/** The API key for the tile provider. Google Maps requires one. */
		mapProviderKey?: string;
		/** Whether satellite imagery shows. @default false */
		satellite?: boolean;
		/** Content rendered inside the map once it loads. */
		children?: Snippet;
		/** Content rendered after `children` once the map loads. */
		layer?: Snippet;
	}

	let {
		minPitch = 0,
		maxPitch = 60,
		zoom = $bindable(9),
		minZoom = 0,
		maxZoom = DEFAULT_MAX_ZOOM,
		class: className,
		center = $bindable(new LngLat(-73.984_421, 40.771_811_6)),
		map = $bindable(),
		options,
		mapProvider = MapProviders.openStreet,
		mapProviderKey,
		satellite = $bindable(false),
		children,
		layer,
		...rest
	}: Props = $props();

	const context = provideMapLibre({
		center: { get: () => center, set: (next) => (center = next) },
		zoom: { get: () => zoom, set: (next) => (zoom = next) },
		satellite: { get: () => satellite, set: (next) => (satellite = next) },
		maxZoom: () => maxZoom,
		mapProvider: () => mapProvider,
		apiKey: () => mapProviderKey
	});

	let container = $state.raw<HTMLDivElement>();
	let styleLoads = $state(0);
	const created = $derived(styleLoads > 0);

	// The last camera values written to `center` and `zoom`, so the effects that apply those
	// props skip the camera's own writes instead of interrupting an animation.
	let cameraCenter: LngLat | undefined;
	let cameraZoom: number | undefined;
	let styleRequest = 0;

	const handleStyleLoad = () => {
		styleLoads += 1;

		if (styleLoads === 1) {
			// Resize after the children render, since they can change the container's size.
			void tick().then(() => map?.resize());
		}
	};

	const handleMove = () => {
		if (map === undefined) {
			return;
		}

		cameraCenter = map.getCenter();
		cameraZoom = map.getZoom();
		center = cameraCenter;
		zoom = cameraZoom;
	};

	const handleResize = () => {
		if (map === undefined) {
			return;
		}

		const canvas = map.getCanvas();
		context.setSize({ width: canvas.clientWidth, height: canvas.clientHeight });
	};

	const loadStyle = async (
		instance: Map,
		provider: MapProvider,
		apiKey: string | undefined,
		showSatellite: boolean
	) => {
		styleRequest += 1;
		const request = styleRequest;
		const style = await getStyleSpecification(provider, apiKey, maxZoom, showSatellite);

		if (request === styleRequest) {
			instance.setStyle(style, { diff: false });
		}
	};

	$effect(() => {
		map?.setMinPitch(minPitch);
	});

	$effect(() => {
		map?.setMaxPitch(maxPitch);
	});

	$effect(() => {
		const next = zoom;
		if (map && next !== cameraZoom) {
			map.setZoom(next);
		}
	});

	$effect(() => {
		const next = center;
		if (map && next !== cameraCenter) {
			map.setCenter(next);
		}
	});

	// Google Maps serves satellite imagery as its own style, so a satellite change reloads it.
	// OpenStreetMap toggles a layer instead, in the effect below.
	$effect(() => {
		if (map === undefined) {
			return;
		}

		const showSatellite =
			mapProvider === MapProviders.googleMaps ? satellite : untrack(() => satellite);
		void loadStyle(map, mapProvider, mapProviderKey, showSatellite);
	});

	$effect(() => {
		const visibility = satellite ? 'visible' : 'none';
		if (created && map?.getLayer(SATELLITE_LAYER_ID)) {
			map.setLayoutProperty(SATELLITE_LAYER_ID, 'visibility', visibility);
		}
	});

	onMount(() => {
		if (container === undefined) {
			return;
		}

		const instance = new Map({
			container,
			center,
			zoom,
			minPitch,
			maxPitch,
			minZoom,
			maxZoom,
			...options
		});

		map = instance;
		context.attach(instance);

		instance.on('move', handleMove);
		instance.on('resize', handleResize);
		instance.on('style.load', handleStyleLoad);

		return () => {
			instance.off('move', handleMove);
			instance.off('resize', handleResize);
			instance.off('style.load', handleStyleLoad);
			// Children tear down against the map, so remove it once their cleanup has run.
			queueMicrotask(() => instance.remove());
		};
	});
</script>

<div class={['relative isolate h-full', className]} {...rest}>
	<div class="h-full" bind:this={container}></div>

	{#if created}
		{@render children?.()}
		{@render layer?.()}
	{/if}
</div>
