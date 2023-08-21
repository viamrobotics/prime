<script lang='ts'>

import { Label, SliderInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';

export let readonly = false;
export let placeholders = ['0', '0', '0'];
export let labels = ['x', 'y', 'z'];
export let type: 'integer' | 'number' = 'number';
export let values: number[] = [];
export let step = 1;

const inputs: HTMLInputElement[] = [];

const dispatch = createEventDispatcher<{ input: number[] }>();

const handleInput = (index: number) => {
  const value = inputs[index]?.valueAsNumber

  if (value !== undefined && !Number.isNaN(value)) {
    values[index] = value;
    dispatch('input', values);
  }
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Enter') {
    handleInput(index);
  }
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
        on:blur={() => handleInput(index)}
        on:slide={() => handleInput(index)}
        on:keydown={(event) => handleKeydown(event, index)}
      />
    </Label>
  {/each}
</div>
