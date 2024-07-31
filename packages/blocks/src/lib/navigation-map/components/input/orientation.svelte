<!--
@component
An editable 2d rotation input, presented to the user in degrees
-->
<script lang="ts">
import { MathUtils } from 'three';
import { SliderInput, Label } from '@viamrobotics/prime-core';

/** The rotation in radians */
export let th: number;

/** Fires when orientation changes with the new value in radians */
export let onChange: ((th: number) => void) | undefined = undefined;

let input: HTMLInputElement;

const handleInput = () => {
  const value = input.valueAsNumber;

  if (!Number.isNaN(value)) {
    onChange?.(MathUtils.degToRad(value));
  }
};
</script>

<div class="w-1/2">
  <Label position="top">
    Rotation (deg)
    <SliderInput
      slot="input"
      bind:input
      value={MathUtils.radToDeg(th)}
      placeholder={0}
      on:blur={handleInput}
      on:input={handleInput}
      on:keydown={(event) => event.key === 'Enter' && handleInput()}
    />
  </Label>
</div>
