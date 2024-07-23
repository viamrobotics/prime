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

/** Optional URL that the hyperlink points to. */
export let href = '';

/** Optional target for linked URL. */
export let target: '_self' | '_blank' | '_parent' | '_top' = '_blank';

/** Whether or not the pill has the aria-readonly attribute. If readonly, there is not a button to remove the pill. */
export let readonly = false;

/** Whether or not the pill is disabled. */
export let disabled = false;

/** Whether or not the pill is removable. If removable, and not readonly, there is a button to remove the pill. */
export let removable = true;

/** The icon shown in the button. */
export let icon: IconName | undefined = undefined;

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
      'gap-1 bg-medium px-2 py-0.5': !icon,
      'h-6 gap-1.5 border border-medium bg-light pl-1.5 pr-2': icon,
    },
    extraClasses
  )}
  aria-disabled={disabled ? true : undefined}
  aria-readonly={readonly ? true : undefined}
>
  {#if icon}
    <Icon
      name={icon}
      cx="text-gray-6"
      size="sm"
    />
  {/if}
  {#if href}
    <a
      {href}
      {target}
      class="truncate hover:underline">{value}</a
    >
  {:else}
    <span class="truncate">{value}</span>
  {/if}
  {#if !readonly && removable}
    <button
      type="button"
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
