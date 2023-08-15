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
import cx from 'classnames';

export let value = '';

/** Whether or not the input should be rendered as readonly and be operable. */
export let readonly = false;

/** Whether or not the input should be rendered as readonly and be non-operable. */
export let disabled = false;

/** The state of the input (info, warn, error, success), if any. */
export let state: InputState = 'none';

$: isInfo = state === 'info';
$: isWarn = state === 'warn';
$: isError = state === 'error';

let icon = '';
$: {
  switch (state) {
    case 'info': {
      icon = 'information';
      break;
    }
    case 'warn': {
      icon = 'alert';
      break;
    }
    case 'error': {
      icon = 'alert-circle';
      break;
    }
    default: {
      icon = '';
      break;
    }
  }
}
</script>

<div class="relative w-full">
  <input
    {...$$restProps}
    readonly={disabled || readonly ? true : undefined}
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError ? true : undefined}
    class={cx(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none',
      {
        'border-light bg-white hover:border-gray-6 focus:border-gray-9':
          !disabled && !readonly && !isError,
        'border-none bg-light': readonly,
        'pointer-events-none border-disabled-light bg-disabled-light text-disabled-dark':
          disabled,
        'border-light hover:border-medium focus:border-gray-9 ':
          !disabled && !isError,
        'border-danger-dark focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-danger-dark':
          isError,
      }
    )}
    bind:value
    on:input
    on:keydown
  />

  {#if icon !== ''}
    <span
      class={cx('absolute right-2 top-1.5', {
        'text-info-dark': isInfo,
        'text-warning-bright': isWarn,
        'text-danger-dark': isError,
      })}
    >
      <Icon name={icon} />
    </span>
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
