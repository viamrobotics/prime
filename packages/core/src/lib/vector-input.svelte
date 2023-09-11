<!--
@component
  
For numeric user inputs that require easy adjustment.

```svelte
    <VectorInput
    type="number"
    step={1}
    labels={['x', 'y', 'z']}
    placeholders={{
      x: '0',
      y: '0',
      z: '0'
    }}
    values={{
      x: 0,
      y: 0,
      z: 0
    }}
  />
```
-->
<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { Label, SliderInput } from '$lib';

/** Whether the inputs are readonly. */
export let readonly = false;

/** Whether the inputs are integers or decimal numbers. */
export let type: 'integer' | 'number' = 'number';

/** The slider step. */
export let step = 1;

/** The input labels. */
export let labels = ['x', 'y', 'z'];

/** The input placeholders. */
export let placeholders: Record<string, string> = { x: '0', y: '0', z: '0' };

/** The input values. */
export let values: Record<string, number> = {};

const dispatch = createEventDispatcher<{
  /** Fires when an input event occurs. */
  input: Record<string, number>;
}>();

const inputs: Record<string, HTMLInputElement> = {};

const handleInput = (label: string) => {
  const value = inputs[label]?.valueAsNumber;

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

<div class="flex items-end gap-1.5">
  {#each labels as label, index (label)}
    <Label>
      {label}
      <SliderInput
        slot="input"
        bind:input={inputs[label]}
        {type}
        {step}
        {readonly}
        placeholder={placeholders[index]}
        class="max-w-[5.5rem]"
        value={values[label]}
        incrementor={readonly ? '' : 'slider'}
        on:blur={() => handleInput(label)}
        on:input={() => handleInput(label)}
        on:keydown={(event) => handleKeydown(event, label)}
      />
    </Label>
  {/each}
</div>
