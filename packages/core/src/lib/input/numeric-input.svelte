<!--
@component
  
For numeric user inputs.

```svelte
<NumericInput type="integer" on:input={onInput} />
```
-->
<svelte:options immutable />

<script lang="ts">
import Input from './input.svelte';
import type { NumericInputTypes } from './utils';

/** The input type */
export let type: NumericInputTypes | undefined = 'number';

/**
 * The value of the input, if any.
 *
 * TODO: Discuss disabling these rules for svelte components, otherwise
 * these props are treatef as required and force users to add value={undefined}
 * when no initial value is set.
 */
export let value: number | undefined = undefined;

/** The amount to increment/decrement when using the up/down arrows. */
export let step = 1;

/** The HTML input element. */
export let input: HTMLInputElement | undefined = undefined;

$: isNumber = type === 'number';
$: pattern = isNumber ? '^([-+,0-9.]+)' : '[0-9]+';

</script>

<Input
  type="number"
  {pattern}
  {step}
  {...$$restProps}
  bind:value
  bind:input={input}
  on:input
/>
