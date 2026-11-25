<!--
@component
A checkbox that switches the enclosing `<MapLibre>` map between its road map and satellite
imagery. It writes the map's `satellite`, so `bind:satellite` on the `<MapLibre>` follows it. On
Google Maps the map loads the satellite style, and on OpenStreetMap it shows the USGS imagery
layer.

```svelte
<MapLibre>
	<SatelliteControls />
</MapLibre>
```
-->
<script lang="ts">
	import { Checkbox, Field, Label } from '@viamrobotics/prime-ui';

	import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';

	const context = useMapLibre();
</script>

<Field label="Satellite" class="flex items-center gap-2">
	<Checkbox bind:checked={context.satellite} />
	<Label />
</Field>
