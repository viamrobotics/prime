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
import { writable, type Writable } from 'svelte/store';

/** The value of the input. A store because the value is not exactly bound to user input. */
export let value: Writable<string>;

/** A function to restrict the input value. If the function returns a different string than what the user inputted, the help tooltip is shown. */
export let restrictInput: (inputValue: string) => string;

/** A tooltip that is shown to the user when restricted characters are used. */
export let tooltipDescription: string;

/** Additional CSS classes to pass to the input. */
let extraInputClasses: cx.Argument = '';
export { extraInputClasses as inputCX };

const tooltipVisible = writable<TooltipVisibility>('invisible');
let tooltipTimeoutID = -1;

const tooltipWiggle = writable(false);
let tooltipWiggleTimeoutID = -1;

const handleInput = (event: Event) => {
  const inputValue = (event.currentTarget as HTMLInputElement).value;
  const nextValue = restrictInput(inputValue);

  if (nextValue !== inputValue) {
    if (tooltipTimeoutID >= 0) {
      window.clearTimeout(tooltipWiggleTimeoutID);
      $tooltipWiggle = true;
      tooltipWiggleTimeoutID = window.setTimeout(() => {
        $tooltipWiggle = false;
      }, 500);
    }

    window.clearTimeout(tooltipTimeoutID);
    $tooltipVisible = 'visible';
    tooltipTimeoutID = window.setTimeout(() => {
      $tooltipVisible = 'invisible';
      tooltipTimeoutID = -1;
    }, 5000);
  }

  $value = nextValue;
};
</script>

<Tooltip
  cx={$tooltipWiggle && 'animate-wiggle'}
  state={$tooltipVisible}
  location="bottom"
  let:tooltipID
>
  <p slot="description">{tooltipDescription}</p>
  <TextInput
    cx={extraInputClasses}
    aria-describedby={tooltipID}
    bind:value={$value}
    on:input={handleInput}
    {...$$restProps}
  />
</Tooltip>
