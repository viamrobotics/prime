<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { SliderInput, Label } from '@viamrobotics/prime-core';

/** The orientation angle along the z-axis. */
export let th: number;

const dispatch = createEventDispatcher<{
  /** Fires when the orientation is edited. */
  input: number;
}>();

let input: HTMLInputElement;

const handleInput = () => {
  const value = input.valueAsNumber;

  if (!Number.isNaN(value)) {
    dispatch('input', value);
  }
};
</script>

<Label position="top">
  Rotation
  <SliderInput
    slot="input"
    bind:input
    value={th}
    placholder={0}
    on:blur={handleInput}
    on:input={handleInput}
    on:keydown={(event) => event.key === 'Enter' && handleInput()}
  />
</Label>
