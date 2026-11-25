<!--
@component
A marker drawn as an arrow that points along `rotation`, for a heading on the enclosing
`<MapLibre>` map.

```svelte
<MapLibre>
	<DirectionalMarker lng={-73.98} lat={40.77} rotation={90} />
</MapLibre>
```
-->
<script lang="ts">
	import MapLibreMarker from './Marker.svelte';

	interface Props {
		/** The longitude of the marker. @default 0 */
		lng?: number;
		/** The latitude of the marker. @default 0 */
		lat?: number;
		/** The heading the arrow points along, clockwise in degrees. @default 0 */
		rotation?: number;
		/** The relative size of the marker. @default 1 */
		scale?: number;
	}

	const { lng = 0, lat = 0, rotation = 0, scale = 1 }: Props = $props();

	let element = $state.raw<HTMLElement>();
</script>

<div bind:this={element} class="size-7.5">
	<svg
		viewBox="0 0 24 24"
		aria-hidden="true"
		class="size-full fill-success-dark stroke-white stroke-2"
	>
		<path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
	</svg>
</div>

{#if element}
	<MapLibreMarker {element} {lng} {lat} {rotation} {scale} />
{/if}
