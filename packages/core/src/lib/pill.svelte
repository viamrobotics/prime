<!--
@component
  
For displaying a list of items.

```svelte
<Pill value="Chocolate chip" on:remove={onRemove} />
```
-->
<svelte:options immutable />

<script lang="ts">
import { Icon, type IconName } from '$lib';
import cx from 'classnames';

import { createEventDispatcher } from 'svelte';

/** The text in the pill. */
export let value = '';

/** Whether or not the pill has the aria-readonly attribute. If readonly, there is not a button to remove the pill. */
export let readonly = false;

/** Whether or not the pill is disabled. */
export let disabled = false;

/** Whether or not the pill is removable. If removable, and not readonly, there is a button to remove the pill. */
export let removable = true;

/** Variants */
export let variant: 'default' | 'outlined' = 'default';

/** The icon shown in the button. */
export let icon: IconName = '';

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
    'flex max-w-fit items-center gap-1 whitespace-nowrap rounded text-xs',
    {
      'cursor-not-allowed bg-disabled-light text-disabled-dark':
        disabled || readonly,
      'gap-1 bg-medium px-2 py-0.5': variant === 'default',
      'h-6 gap-1.5 border border-medium bg-light pl-1.5 pr-2':
        variant === 'outlined',
    },
    extraClasses
  )}
  aria-disabled={disabled ? true : undefined}
  aria-readonly={readonly ? true : undefined}
>
  {#if icon && variant === 'outlined'}
    <Icon
      name={icon}
      cx="text-gray-6"
      size="sm"
    />
  {/if}
  <span>
    {value}
  </span>
  {#if !readonly && removable}
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
