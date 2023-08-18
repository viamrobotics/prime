<script lang='ts'>

import { Label, SliderInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';

export let readonly = false;
export let placeholders = ['0', '0', '0'];
export let labels = ['x', 'y', 'z'];
export let type: 'integer' | 'number' = 'number';
export let values: number[] = [];
export let step = 1;

const inputs: HTMLInputElement[] = []

const dispatch = createEventDispatcher<{ input: number[] }>();

const handleInput = (index: number) => {
  return () => {
    const value = inputs[index]?.valueAsNumber

    if (value !== undefined) {
      values[index] = value;
      dispatch('input', values);
    }
  };
};

</script>

<div class='flex gap-1.5 items-end'>
  {#each labels as label, index (label)}
    <Label>
      {label}
      <SliderInput
        slot='input'
        bind:input={inputs[index]}
        {type}
        {step}
        placeholder={placeholders[index]}
        class='max-w-[5.5rem]'
        readonly={readonly ? 'readonly' : undefined}
        value={values[index]}
        incrementor={readonly ? '' : 'slider'}
        on:input={handleInput(index)}
      />
    </Label>
  {/each}
</div>
