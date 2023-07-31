<!--
@component
  
For displaying a list of items.

```svelte
<Pill value="Chocolate chip" on:remove={onRemove} />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

import { createEventDispatcher } from 'svelte';

/** The text in the pill. */
export let value = '';
/**
 * Whether or not the pill has the aria-readonly attribute. If not readonly, there is a button to remove the pill.
 */
export let readonly = false;
/** Whether or not the pill is disabled. */
export let disabled = false;

const dispatch = createEventDispatcher<{
  /** When the pill is removed. */
  remove: { value: string }
}>();

const handleRemove = () => {
  if (disabled || readonly) {
    return;
  }

  dispatch('remove', { value });
};
</script>

<div
  class={cx(
    'flex max-w-fit items-center gap-1 whitespace-nowrap rounded-xl bg-medium px-2 py-0.5 text-[10px] hover:bg-gray-3',
    {
      'cursor-not-allowed bg-disabled-light text-disabled-dark':
        disabled || readonly,
    }
  )}
  aria-disabled={disabled}
  aria-readonly={readonly}
>
  <span>
    {value}
  </span>
  {#if !readonly}
    <button on:click={handleRemove}>
      <!--  TODO(APP-2290): Use an icon once migrated. -->
      <!-- <Icon name="close" /> -->
      <!-- For now, just an "x" -->
      x
    </button>
  {/if}
</div>
