<script lang='ts'>

import { SliderInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';
import { LngLat } from 'maplibre-gl';

export let label: string | undefined = undefined;
export let readonly: boolean | undefined = undefined;
export let lng: number | undefined = undefined;
export let lat: number | undefined = undefined;

const dispatch = createEventDispatcher<{ input: LngLat }>();

let latInput: HTMLInputElement
let lngInput: HTMLInputElement

</script>

<div class='flex gap-1.5 items-end'>
  <SliderInput
    bind:input={latInput}
    type='number'
    label={label ?? 'Latitude'}
    placeholder='0'
    incrementor={readonly ? undefined : 'slider'}
    value={lat}
    step={1}
    class='w-full'
    on:input={() => dispatch('input', new LngLat(lng ?? 0, latInput.valueAsNumber))}
    {readonly}
  />
  <SliderInput
    bind:input={lngInput}
    type='number'
    label={label ? '' : 'Longitude'}
    placeholder='0'
    incrementor={readonly ? undefined : 'slider'}
    value={lng}
    step={1}
    class='w-full'
    on:input={() => dispatch('input', new LngLat(lngInput.valueAsNumber, lat ?? 0))}
    {readonly}
  />
  <slot />
</div>
