<script lang='ts'>

import { Label, SliderInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';

export let readonly = false;

export let type: 'integer' | 'number' = 'number';
export let step = 1;
export let labels = ['x', 'y', 'z'];
export let placeholders: Record<string, string> = { x: '0', y: '0', z: '0' };
export let values: Record<string, number> = {};

const inputs: Record<string, HTMLInputElement> = {};

const dispatch = createEventDispatcher<{ input: Record<string, number> }>();

const handleInput = (label: string) => {
  const value = inputs[label]?.valueAsNumber

  if (value !== undefined && !Number.isNaN(value)) {
    values[label] = value;
    dispatch('input', values);
  }
};

const handleKeydown = (event: KeyboardEvent, label: string) => {
  if (event.key === 'Enter') {
    handleInput(label);
  }
};

</script>

<div class='flex gap-1.5 items-end'>
  {#each labels as label, index (label)}
    <Label>
      {label}
      <SliderInput
        slot='input'
        bind:input={inputs[label]}
        {type}
        {step}
        placeholder={placeholders[index]}
        class='max-w-[5.5rem]'
        readonly={readonly ? 'readonly' : undefined}
        value={values[label]}
        incrementor={readonly ? '' : 'slider'}
        on:blur={() => handleInput(label)}
        on:slide={() => handleInput(label)}
        on:keydown={(event) => handleKeydown(event, label)}
      />
    </Label>
  {/each}
</div>
