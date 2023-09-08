<!--
@component
  
For selecting from a list of options.

```svelte
<Select on:input={onSelect}>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</Select>
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type SelectState = 'error' | 'warn' | 'none';
</script>

<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib';
import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';

/** The selected option value, if any */
export let value: string | undefined = undefined;

/** Whether or not the select should be rendered as disabled and be non-operable. */
export let disabled = false;

/** The state of the select (info, warn, error, success), if any. */
export let state: SelectState = 'none';

const handleDisabled = preventHandler(disabled);
const handleDisabledKeydown = preventKeyboardHandler(disabled);

$: isWarn = state === 'warn';
$: isError = state === 'error';
</script>

<div class="relative w-full">
  <select
    bind:value
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError ? true : undefined}
    class={cx(
      'h-7.5 peer w-full appearance-none rounded-none border px-2 py-1.5 text-xs leading-tight outline-none',
      {
        'border-light hover:border-gray-6 focus:border-gray-9 bg-white':
          !disabled && !isError && !isWarn,
        'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed':
          disabled,
        'border-warning-bright hover:outline-warning-bright focus:outline-warning-bright hover:outline-[1.5px] hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
          isWarn,
        'border-danger-dark hover:outline-danger-dark focus:outline-danger-dark hover:outline-[1.5px hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
          isError,
      }
    )}
    {...$$restProps}
    on:change
    on:change|capture={handleDisabled}
    on:mousedown
    on:mousedown|capture={handleDisabled}
    on:keydown
    on:keydown|capture={handleDisabledKeydown}
  >
    <slot />
  </select>
  <span
    class={cx('text-gray-6 absolute right-2 top-1.5 transition', {
      'peer-active:rotate-180': !disabled,
    })}
  >
    <Icon name="chevron-down" />
  </span>
</div>
