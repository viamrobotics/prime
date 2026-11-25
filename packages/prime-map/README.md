# @viamrobotics/prime-map

MapLibre maps for Svelte 5: a map that fills its parent, markers, map controls, projection math between longitude and latitude and meters, and an optional bridge that renders a Three.js scene on the map.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-map @viamrobotics/prime-ui @viamrobotics/prime-controls @viamrobotics/tailwind-config maplibre-gl
```

Requires `svelte` `^5.29.0` and `maplibre-gl` `^6.0.0`. Add `three` `>=0.178.0` only to use the `@viamrobotics/prime-map/three` subpath. Import the stylesheets once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-ui/styles.css';
@import '@viamrobotics/prime-controls/styles.css';
@import '@viamrobotics/prime-map/styles.css';
```

`MapLibre` imports maplibre-gl's own stylesheet.

## Usage

```svelte
<script lang="ts">
	import {
		MapLibre,
		MapLibreMarker,
		NavigationControls,
		SatelliteControls
	} from '@viamrobotics/prime-map';
	import { LngLat } from 'maplibre-gl';
</script>

<div class="h-96">
	<MapLibre center={new LngLat(-73.98, 40.77)} zoom={14}>
		<MapLibreMarker lng={-73.98} lat={40.77} />
		<NavigationControls />
		<div class="absolute bottom-2 left-2">
			<SatelliteControls />
		</div>
	</MapLibre>
</div>
```

`MapLibre` fills its parent, so size the parent. `bind:center`, `bind:zoom`, and `bind:satellite` follow the camera and the satellite view, and `bind:map` gives the maplibre-gl `Map`. Its children mount once the map loads its first style and read the map through `useMapLibre()`, whose fields are reactive: `map`, `center`, `zoom`, `maxZoom`, `size`, `mapProvider`, `apiKey`, and a writable `satellite`. `useMapLibreEvent(event, listener)` listens to a map event until the calling component unmounts. Set `mapProvider="google-maps"` and `mapProviderKey` for Google Maps tiles, which fall back to OpenStreetMap when the key cannot open a session.

`CenterControls`, `FollowControls`, `NavigationControls`, and `SatelliteControls` go inside a `MapLibre`. `CenterControls` saves the view in `localStorage` under its `storageKey`, when one is given. `LngLatInput` is a latitude and longitude pair of fields that works anywhere.

### Three.js

```svelte
<script lang="ts">
	import { useMapLibreThreeRenderer } from '@viamrobotics/prime-map/three';
	import { Camera, Mesh, Scene, WebGLRenderer } from 'three';

	const { renderer }: { renderer: WebGLRenderer } = $props();

	const scene = new Scene();
	const camera = { current: new Camera() };
	const mesh = new Mesh();
	mesh.userData.lngLat = { lng: -73.98, lat: 40.77 };
	scene.add(mesh);

	useMapLibreThreeRenderer(scene, camera, (scene, camera) => renderer.render(scene, camera));
</script>
```

Call the hooks in a component inside a `MapLibre`. `useMapLibreThreeRenderer` places every object whose `userData.lngLat` holds a `{ lng, lat }`, and draws a `THREE.Line` through a list of them. `useMapLibreThreeRaycast(camera)` returns a `pointer` that follows the mouse and a `compute(raycaster)` that aims a raycaster through it. Nothing on the `.` entry imports `three`.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-map/) for the context, the controls, and the Three.js bridge.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
