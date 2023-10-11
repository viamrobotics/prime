<!-- 
@component

For text-based user inputs that only allow certain characters. Shows the user a tooltip when they attempt to use disallowed characters.

```svelte
<RestrictedTextInput
      value={restrictedValue}
      tooltipDescription="Valid characters: numbers, lowercase letters, dashes"
      restrictInput={(inputValue) =>
        inputValue
          .replaceAll(/\s/gu, '-')
          .replaceAll(/[^a-z0-9-$]/gu, '')}
/>
```
-->
<script lang="ts">
import type cx from 'classnames';
import { TextInput } from '$lib';
import { Tooltip, type TooltipVisibility } from '$lib/tooltip';
import { onDestroy } from 'svelte';

/** The value of the input. */
export let value: string;

/** A function to restrict the input value. If the function returns a different string than what the user inputted, the help tooltip is shown. */
export let restrictInput: (inputValue: string) => string;

/** A tooltip that is shown to the user when restricted characters are used. */
export let tooltipDescription: string;

/** Additional CSS classes to pass to the input. */
export let inputCX: cx.Argument = '';

let validationState: 'hide' | 'invalid' | 'invalid-remind' = 'hide';
let tooltipTimeoutID: number | undefined = undefined;

const clearTooltipTimeout = () => {
  clearTimeout(tooltipTimeoutID);
};

const hideInvalid = () => {
  clearTooltipTimeout();
  validationState = 'hide';
};

const showInvalid = () => {
  clearTooltipTimeout();
  validationState = 'invalid';
  tooltipTimeoutID = window.setTimeout(hideInvalid, 5000);
};

const remindInvalid = () => {
  clearTooltipTimeout();
  validationState = 'invalid-remind';
  tooltipTimeoutID = window.setTimeout(showInvalid, 250);
};

const handleInput = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const rawValue = target.value;

  value = restrictInput(rawValue);
  target.value = value;

  if (value === rawValue) {
    hideInvalid();
  } else if (validationState === 'hide') {
    showInvalid();
  } else if (validationState === 'invalid') {
    remindInvalid();
  }
};

$: tooltipWiggle = validationState === 'invalid-remind';
let tooltipVisibility: TooltipVisibility;
$: tooltipVisibility = validationState === 'hide' ? 'invisible' : 'visible';
onDestroy(clearTooltipTimeout);
</script>

<Tooltip
  cx={tooltipWiggle && 'animate-wiggle'}
  state={tooltipVisibility}
  location="bottom"
  let:tooltipID
>
  <p slot="description">{tooltipDescription}</p>
  <TextInput
    cx={inputCX}
    aria-describedby={tooltipID}
    {value}
    on:input={handleInput}
    {...$$restProps}
  />
</Tooltip>
