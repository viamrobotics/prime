<script lang='ts'>

import { createEventDispatcher } from 'svelte';
import { SliderInput, Label } from '@viamrobotics/prime-core';

export let th: number;

const dispatch = createEventDispatcher<{ input: number }>();

let input: HTMLInputElement;

const handleInput = () => {
  const value = input.valueAsNumber

  console.log(value)

  if (!Number.isNaN(value)) {
    dispatch('input', value);
  }
};

</script>

<Label>
  Rotation
  <SliderInput
    bind:input={input}
    value={th}
    placholder={0}
    on:blur={handleInput}
    on:slide={handleInput}
    on:keydown={(event) => event.key === 'Enter' && handleInput()}
  />
</Label>

