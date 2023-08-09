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

<script lang="ts">
import cx from 'classnames';

/** Whether or not the input should be rendered as readonly and be operable. */
export let readonly = false;

/** Whether or not the input should be rendered as readonly and be non-operable. */
export let disabled = false;
</script>

<input
  {...$$restProps}
  readonly={disabled || readonly ? true : undefined}
  aria-disabled={disabled ? true : undefined}
  class={cx(
    'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none',
    {
      'border-disabled-light bg-disabled-light text-disabled-dark':
        disabled || readonly,
      'pointer-events-none': disabled,
    }
  )}
  on:input
  on:keydown
  on:focus
  on:blur
/>

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
