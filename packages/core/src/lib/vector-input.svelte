<!--
@component
  
For numeric user inputs that require easy adjustment.

```svelte
<VectorInput
  type='number'
  label='Position'
  placeholder='0'
  value=''
  step='0.1'
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import SliderInput from '$lib/input/slider-input.svelte';

/**
 * The label for the vector input.
 */
export let label = '';
/**
 * How many dimensions the vector input has.
 */
export let dimensions = 3;
/** The amount to increment/decrement on sliding and on keyup/down. */
export let step = 1;
/** The value of an input. */
export let value = '';
/** The placeholders for the input. */
export let placeholders = ['x', 'y', 'z', 'w'];

interface Events {
    input: { value: (number | undefined)[] };
}

const dispatch = createEventDispatcher<Events>()
/** The values of the vector input. */
let valueArray: (number | undefined)[];

$: {
  const arr: (number | undefined)[] = [];

  const split = value.split(',');
  for (let i = 0; i < dimensions; i += 1) {
    const num = Number.parseFloat(split[i]!);
    if (!Number.isNaN(num)) {
      arr[i] = num;
    }
  }

  valueArray = arr;
}


const handleInput = (index: number) => {
  return (event: Event) => {
    const input = event.target as HTMLInputElement;
    const inputValue = input?.value;
    if (event.target && inputValue) {
    valueArray[index] = Number.parseFloat(inputValue || '0');
    } else {
    valueArray[index] = 0; 
    }
    value = valueArray.join(',');
    dispatch('input', { value: valueArray });
  };
};


const dimensionsArray = () => {
  const arr = [];

  for (let i = 0; i < dimensions; i += 1) {
    arr.push(i);
  }

  return arr;
};
</script>

<div class="flex justify-between items-center gap-2">
  <p class="m-0 text-[11px]">
    {label}
  </p>
  <div class="flex gap-1">
    {#each dimensionsArray() as i (i)}
      <div class="w-16">
        <SliderInput 
          {step}
          value={valueArray[i] ?? undefined}
          placeholder={placeholders[i]}
          on:input={handleInput(i)}
        />
      </div>
    {/each}
  </div>
</div>
