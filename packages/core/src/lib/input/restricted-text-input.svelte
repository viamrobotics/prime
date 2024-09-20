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
import cx from 'classnames';

import { Tooltip, type TooltipVisibility } from '$lib/tooltip';
import { useTimeout } from '$lib/use-timeout';

import Input from './input.svelte';

/** The value of the input. */
export let value: string;

/** A function to restrict the input value. If the function returns a different string than what the user inputted, the help tooltip is shown. */
export let restrictInput: (inputValue: string) => string;

/** A tooltip that is shown to the user when restricted characters are used. */
export let tooltipDescription: string;

/** Additional CSS classes to pass to the input. */
export let inputCX: cx.Argument = '';

/** The duration to show the tooltip for invalid input. Useful for testing. */
export let tooltipDurationMs = 5000;

/** The duration to show the wiggle animation. This animation is defined in the tailwind theme. */
export let wiggleDurationMs = 250;

const { set: setTooltipTimeout, clear: clearTooltipTimeout } = useTimeout();

let validationState: 'hide' | 'invalid' | 'invalid-remind' = 'hide';

const hideInvalid = () => {
  clearTooltipTimeout();
  validationState = 'hide';
};

const showInvalid = () => {
  validationState = 'invalid';
  setTooltipTimeout(hideInvalid, tooltipDurationMs);
};

const remindInvalid = () => {
  validationState = 'invalid-remind';
  setTooltipTimeout(showInvalid, wiggleDurationMs);
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
</script>

<Tooltip
  cx={tooltipWiggle && 'animate-wiggle'}
  state={tooltipVisibility}
  location="bottom"
  let:tooltipID
>
  <p slot="description">{tooltipDescription}</p>
  <Input
    type="text"
    cx={inputCX}
    aria-describedby={tooltipID}
    on:input={handleInput}
    {value}
    {...$$restProps}
  />
</Tooltip>
