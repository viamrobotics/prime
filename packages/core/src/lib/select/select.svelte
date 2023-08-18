<!--
@component
  
For selecting from a list of options.

```svelte
<Select on:select={onSelect}>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</Select>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import type { InputState } from '$lib/input/input.svelte';
import Icon from '$lib/icon/icon.svelte';

/** The selected option value, if any */
export let value: string | undefined = undefined;

/** Whether or not the select should be rendered as disabled and be non-operable. */
export let disabled = false;

/** The state of the select (info, warn, error, success), if any. */
export let state: InputState = 'none';

$: isInfo = state === 'info';
$: isWarn = state === 'warn';
$: isError = state === 'error';
</script>

<div class="relative w-full">
  <select
    bind:value
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError ? true : undefined}
    class={cx(
      'peer h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none',
      {
        'border-light bg-white hover:border-gray-6 focus:border-gray-9':
          !disabled && !isError,
        'pointer-events-none border-disabled-light bg-disabled-light text-disabled-dark':
          disabled,
        'border-light hover:border-medium focus:border-gray-9 ':
          !disabled && !isError,
        'border-info-dark focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-info-dark':
          isInfo,
        'border-warning-bright focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-warning-bright':
          isWarn,
        'border-danger-dark focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-danger-dark':
          isError,
      }
    )}
    {...$$restProps}
    on:input
  >
    <slot />
  </select>
  <span class="absolute right-2 text-gray-6 transition peer-active:rotate-180">
    <Icon name="chevron-down" />
  </span>
</div>
