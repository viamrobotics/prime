<!--
@component
A latitude field and a longitude field, grouped and named as one pair. A typed number calls
`oninput` with the new pair, and an empty or partial entry calls nothing.

```svelte
<LngLatInput {lng} {lat} oninput={(next) => map.jumpTo({ center: next })} />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { NumberField } from '@viamrobotics/prime-controls';
	import { LngLat } from 'maplibre-gl';

	interface Props {
		/** The accessible name of the pair. @default 'Latitude, longitude' */
		label?: string;
		/** Whether both fields are read-only. @default false */
		readonly?: boolean;
		/** The longitude value. */
		lng?: number;
		/** The latitude value. */
		lat?: number;
		/** Content after the two fields, such as a button. */
		children?: Snippet;
		/** Called with the new pair when either field takes a finite number. */
		oninput: (lngLat: LngLat) => void;
	}

	const { label, readonly = false, lng, lat, oninput, children }: Props = $props();

	const setLat = (value: number | undefined) => {
		if (value !== undefined && Number.isFinite(value)) {
			oninput(new LngLat(lng ?? 0, value));
		}
	};

	const setLng = (value: number | undefined) => {
		if (value !== undefined && Number.isFinite(value)) {
			oninput(new LngLat(value, lat ?? 0));
		}
	};
</script>

<div role="group" aria-label={label ?? 'Latitude, longitude'} class="flex items-end gap-1.5">
	<NumberField
		label="Lat"
		suffix="°"
		step={1}
		class="min-w-0 flex-1"
		{readonly}
		bind:value={() => lat, setLat}
	/>
	<NumberField
		label="Lng"
		suffix="°"
		step={1}
		class="min-w-0 flex-1"
		{readonly}
		bind:value={() => lng, setLng}
	/>
	{@render children?.()}
</div>
