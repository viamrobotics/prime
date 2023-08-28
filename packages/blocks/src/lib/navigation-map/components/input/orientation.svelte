<script lang='ts'>

import { createEventDispatcher } from 'svelte';
import { SliderInput, Label } from '@viamrobotics/prime-core';

export let th: number;

const dispatch = createEventDispatcher<{ input: number }>();

let input: HTMLInputElement;

const handleInput = () => {
  const value = input.valueAsNumber

  if (!Number.isNaN(value)) {
    dispatch('input', value);
  }
};

</script>

<Label position='top'>
  Rotation
  <SliderInput
    slot='input'
    bind:input={input}
    value={th}
    placholder={0}
    on:blur={handleInput}
    on:slide={handleInput}
    on:keydown={(event) => event.key === 'Enter' && handleInput()}
  />
</Label>

