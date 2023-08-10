<!--
@component
  
For numeric user inputs.

```svelte
<NumericInput type="integer"  on:input={onInput} />
```
-->
<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Input from './input.svelte';
import {
  getDecimals,
  parseNumericInputValue,
  type NumericInputTypes,
} from './utils';

/** The input type */
export let type: NumericInputTypes = 'number';

/**
 * The value of the input, if any.
 *
 * TODO: Discuss disabling these rules for svelte components, otherwise
 * these props are treatef as required and force users to add value={undefined}
 * when no initial value is set.
 */
// eslint-disable-next-line no-undef-init,unicorn/no-useless-undefined
export let value: number | undefined = undefined;

/** The amount to increment/decrement when using the up/down arrows. */
export let step = 1;

const dispatch = createEventDispatcher<{
  input: number;
  keydown: number;
}>();

$: stringValue = value === undefined ? '' : `${value}`;
$: isNumber = type === 'number';
$: pattern = isNumber ? '^([-+,0-9.]+)' : '[0-9]+';

const setValue = (next: number) => {
  value = next;
  stringValue = `${value}`;
  dispatch('input', next);
};

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase();
  if (key !== 'arrowup' && key !== 'arrowdown') {
    return;
  }

  event.preventDefault();

  const inputValue = (event.target as HTMLInputElement).value;
  const x = Number.parseFloat(inputValue || '0');
  const stepped = key === 'arrowup' ? x + step : x - step;
  const next = parseNumericInputValue(
    stepped.toFixed(isNumber ? getDecimals(inputValue) : 0),
    type
  );

  setValue(next);
};

$: {
  const next = parseNumericInputValue(stringValue, type);

  // only set and send value if valid
  if (!Number.isNaN(next)) {
    setValue(next);
  }
}
</script>

<Input
  type="number"
  {pattern}
  {...$$restProps}
  bind:value={stringValue}
  on:input
  on:keydown={handleKeydown}
/>
