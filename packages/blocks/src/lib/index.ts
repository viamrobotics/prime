// Three.js components
export { default as AxesHelper } from './axes-helper/axes-helper.svelte';

// MapLibre components
export { default as MapLibre } from './maplibre/index.svelte';
export { default as MapLibreMarker } from './maplibre/marker.svelte';
export { default as MapLibreDirectionalMarker } from './maplibre/directional-marker.svelte';
export { default as MapLibreControls } from './maplibre/controls.svelte';
export { useMapLibre, useMapLibreEvent } from './maplibre/hooks';
export { maplibreRenderPlugin } from './maplibre/plugins/three';
export { maplibreRaycastPlugin } from './maplibre/plugins/raycast';
export type { LngLat, GeoPose, Waypoint } from './maplibre/types';

// Slam components
export { default as SlamMap2D } from './slam-map-2d/index.svelte';

// Navigation map components
export { default as NavigationMap } from './navigation-map/index.svelte';
export { NavigationTab } from './navigation-map/types';
export type {
  NavigationTabType,
  Shapes,
  CapsuleGeometry,
  SphereGeometry,
  BoxGeometry,
  Geometry,
  Obstacle,
  Path,
} from './navigation-map/types';
