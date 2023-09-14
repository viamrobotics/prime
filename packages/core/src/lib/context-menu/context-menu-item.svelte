<!--
@component
  
A clickable item within a context menu that triggers some action.
```svelte
<ContextMenuItem icon="plus" variant="danger" label="click me!" />
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type ContextMenuItemVariant = 'primary' | 'danger';
</script>

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import Icon from '$lib/icon/icon.svelte';
import type { IconName } from '$lib/icon/icons';

const dispatch = createEventDispatcher<{
  /** Fires when selected with the label */
  select: { value: string };
}>();

/**
 * Optional icon name shown in the item.
 */
export let icon: IconName | undefined = undefined;

/** The style variant, default value is 'primary' */
export let variant: ContextMenuItemVariant = 'primary';

/** The text displayed. */
export let label: string;

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<button
  role="menuitem"
  aria-labelledby={label}
  class={cx(
    'flex w-full items-center gap-1 px-2 py-1.5 text-left hover:bg-light',
    extraClasses
  )}
  on:click={() => dispatch('select', { value: label })}
>
  {#if icon}
    <div
      class={cx({
        'text-gray-400': variant === 'primary',
        'text-danger-dark': variant === 'danger',
      })}
    >
      <Icon name={icon} />
    </div>
  {/if}

  <p
    id={label}
    class={cx('text-sm', {
      'text-default': variant === 'primary',
      'text-danger-dark': variant === 'danger',
    })}
  >
    {label}
  </p>
</button>
