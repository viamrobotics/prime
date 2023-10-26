<!--
@component
  
For displaying a list of items.

```svelte
<Pill value="Chocolate chip" on:remove={onRemove} />
```
-->
<svelte:options immutable />

<script lang="ts">
import { Icon } from '$lib';
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

/** Additional CSS classes to pass to the pill. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** When the pill is removed. */
  remove: { value: string };
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
    'flex max-w-fit items-center gap-1 whitespace-nowrap rounded bg-medium px-2 py-0.5 text-xs',
    {
      'cursor-not-allowed bg-disabled-light text-disabled-dark':
        disabled || readonly,
    },
    extraClasses
  )}
  aria-disabled={disabled ? true : undefined}
  aria-readonly={readonly ? true : undefined}
>
  <span>
    {value}
  </span>
  {#if !readonly}
    <button
      aria-label="Remove {value}"
      on:click={handleRemove}
      class={cx('text-gray-6', {
        'hover:text-default': !disabled,
        'cursor-not-allowed': disabled,
      })}
    >
      <Icon
        name="close"
        size="xs"
      />
    </button>
  {/if}
</div>
