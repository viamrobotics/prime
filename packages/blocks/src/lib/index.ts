// Three.js components
export { default as AxesHelper } from './axes-helper/axes-helper.svelte';

// MapLibre components
export { LngLat, MercatorCoordinate } from 'maplibre-gl';
export { default as MapLibre } from './maplibre/index.svelte';
export { default as MapLibreMarker } from './maplibre/marker.svelte';
export { default as DirectionalMarker } from './maplibre/directional-marker.svelte';
export { default as NavigationControls } from './maplibre/controls/navigation.svelte';
export { default as CenterControls } from './maplibre/controls/center.svelte';
export { default as FollowControls } from './maplibre/controls/follow.svelte';
export { default as SatelliteControls } from './maplibre/controls/satellite.svelte';
export { default as LngLatInput } from './maplibre/lnglat-input.svelte';
export { useMapLibre, useMapLibreEvent } from './maplibre/hooks';
export { useMapLibreThreeRenderer } from './maplibre/plugins/three';
export { useMapLibreThreeRaycast } from './maplibre/plugins/raycast';
export {
  lngLatToMercator,
  mercatorToCartesian,
  lngLatToCartesian,
  cartesianToLngLat,
  cartesianToMercator,
} from './maplibre/math';
export { GeoPose, Waypoint } from './maplibre/types';

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
