<!--
@component

For user inputs.

This is the base input component that accepts all input properties without any
additional behaviors attached. Generally, other typed inputs like the
NumberInput or DateInput are preferable.

```svelte
<Input type="email"  on:click={onClick} />
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type InputState = 'info' | 'warn' | 'error' | 'none';
</script>

<script lang="ts">
import Icon from '$lib/icon/icon.svelte';
import type { IconName } from '$lib/icon/icons';
import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';
import cx from 'classnames';

export let value: string | number | undefined = '';

/** Whether or not the input should be rendered as readonly and be operable. */
export let readonly = false as boolean | undefined;

/** Whether or not the input should be rendered as readonly and be non-operable. */
export let disabled = false as boolean | undefined;

/** The state of the input (info, warn, error, success), if any. */
export let state: InputState | undefined = 'none';

/** The HTML input element. */
export let input: HTMLInputElement | undefined = undefined;

/** Additional CSS classes to pass to the input. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: isInfo = state === 'info';
$: isWarn = state === 'warn';
$: isError = state === 'error';
$: isInputReadOnly = disabled === true || readonly === true;
$: handleDisabled = preventHandler(isInputReadOnly);
$: handleDisabledKeydown = preventKeyboardHandler(isInputReadOnly);

let icon: IconName | null;
$: icon = (() => {
  switch (state) {
    case 'info': {
      return 'information';
    }
    case 'warn': {
      return 'alert';
    }
    case 'error': {
      return 'alert-circle';
    }
    default: {
      return null;
    }
  }
})();

$: defaultClasses =
  !disabled &&
  !readonly &&
  !isError &&
  'border-light hover:border-gray-6 focus:border-gray-9';

$: readonlyClasses =
  readonly && 'bg-light focus:border-gray-9 border-transparent';

$: disabledClasses =
  disabled &&
  'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed select-none';

$: errorClasses =
  isError &&
  'border-danger-dark focus:outline-danger-dark focus:outline-[1.5px] focus:-outline-offset-1';
</script>

<div class="relative w-full">
  <input
    {...$$restProps}
    readonly={isInputReadOnly ? true : undefined}
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError ? true : undefined}
    class={cx(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none',
      defaultClasses,
      readonlyClasses,
      disabledClasses,
      errorClasses,
      extraClasses
    )}
    bind:value
    bind:this={input}
    on:input
    on:input|capture={handleDisabled}
    on:change
    on:change|capture={handleDisabled}
    on:keydown
    on:keydown|capture={handleDisabledKeydown}
    on:blur
  />

  {#if icon}
    <Icon
      cx={[
        'absolute right-2 top-1.5',
        {
          'text-info-dark': isInfo,
          'text-warning-bright': isWarn,
          'text-danger-dark': isError,
        },
      ]}
      name={icon}
    />
  {/if}
</div>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
