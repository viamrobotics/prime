<svelte:options immutable />

<script lang="ts">
import { dispatcher } from '../lib/dispatch';

export let label = '';
export let dimensions = 3;
export let step = 1;
export let type: 'integer' | 'number' = 'number';
export let value = '';
export let placeholders = ['x', 'y', 'z', 'w'];

const dispatch = dispatcher();

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
  return (event: CustomEvent<{ value: string }>) => {
    valueArray[index] = Number.parseFloat(event.detail.value || '0');
    value = valueArray.join(',');
    dispatch(event, 'input', { value: valueArray });
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
        <v-input
          {type}
          {step}
          value={valueArray[i] ?? ''}
          placeholder={placeholders[i]}
          incrementor="slider"
          on:input={handleInput(i)}
        />
      </div>
    {/each}
  </div>
</div>
