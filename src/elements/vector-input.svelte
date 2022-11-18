<svelte:options immutable tag='v-vector-input' />

<script lang='ts'>

import { addStyles } from '../lib/index';
import { dispatcher } from '../lib/dispatch';

export let label: string
export let dimensions = 3
export let step = 1
export let type: 'integer' | 'number' = 'number'
export let value: string
export let placeholders = ['x', 'y', 'z', 'w']

const dispatch = dispatcher();

addStyles();

let valueArray: number[]

$: {
  const arr = []
  const split = value.split(',')
  for (let i = 0; i < dimensions; i += 1) {
    arr[i] = typeof split[i] === 'string' ? Number.parseFloat(split[i]!) : undefined
  }
  valueArray = typeof value === 'string' ? value.split(',').map(n => Number.parseFloat(n)) : []
}

const handleInput = (index: number) => {
  return (event: CustomEvent) => {
    valueArray[index] = Number.parseFloat(event.detail.value || '0');
    value = valueArray.join(',')
    console.log(valueArray)
    dispatch('input', { value: valueArray });
  };
};

</script>
  
<div class="flex justify-between items-center gap-2">
  <p class="m-0 text-[11px]">
    {label}
  </p>
  <div class="flex gap-1">
    {#each Array(dimensions).fill(0).map((_, i) => i) as i (i)}
    <div class="w-16">
      <v-input
        {type}
        {step}
        value={valueArray[i]}
        placeholder={placeholders[i]}
        incrementor="slider"
        on:input={handleInput(i)}
      />
    </div>
    {/each}
  </div>
</div>
  