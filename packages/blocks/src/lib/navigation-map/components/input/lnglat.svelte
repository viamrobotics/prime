<script lang="ts">
import { SliderInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';
import { LngLat } from 'maplibre-gl';

/** The label for the Lat,Lng, pair. Defaults to Latitude, Longitude. */
export let label: string | undefined = undefined;

/** Whether the inputs are readonly. */
export let readonly: boolean | undefined = undefined;

/** The longitude value. */
export let lng: number | undefined = undefined;

/** The latitude value. */
export let lat: number | undefined = undefined;

const dispatch = createEventDispatcher<{
  /** Fires when the latitude or longitude is edited. */
  input: LngLat;
}>();

let latInput: HTMLInputElement;
let lngInput: HTMLInputElement;
</script>

<div class="flex items-end gap-1.5">
  <SliderInput
    bind:input={latInput}
    type="number"
    label={label ?? 'Latitude'}
    placeholder="0"
    incrementor={readonly ? undefined : 'slider'}
    value={lat}
    step={1}
    class="grow"
    on:change={() =>
      dispatch('input', new LngLat(lng ?? 0, latInput.valueAsNumber))}
    on:input={() =>
      dispatch('input', new LngLat(lng ?? 0, latInput.valueAsNumber))}
    {readonly}
  />
  <SliderInput
    bind:input={lngInput}
    type="number"
    label={label ? '' : 'Longitude'}
    placeholder="0"
    incrementor={readonly ? undefined : 'slider'}
    value={lng}
    step={1}
    class="grow"
    on:change={() =>
      dispatch('input', new LngLat(lngInput.valueAsNumber, lat ?? 0))}
    on:input={() =>
      dispatch('input', new LngLat(lngInput.valueAsNumber, lat ?? 0))}
    {readonly}
  />
  <slot />
</div>
