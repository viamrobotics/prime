<!--
@component

A clickable item within a context menu that triggers some action.
```svelte
<ContextMenuItem icon="plus" variant="danger" label="click me!" />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Icon from '$lib/icon/icon.svelte';
import type { IconName } from '$lib/icon/icons';

import type { ContextMenuItemVariant } from './variants';

/**
 * Optional icon name shown in the item.
 */
export let icon: IconName | undefined = undefined;

/** The style variant, default value is 'primary' */
export let variant: ContextMenuItemVariant = 'primary';

/** Additional CSS classes to pass to the item. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<button
  role="menuitem"
  class={cx(
    'flex w-full items-center gap-1.5 px-3 py-1.5 text-left hover:bg-light',
    extraClasses
  )}
  on:click
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
    class={cx('text-sm', {
      'text-default': variant === 'primary',
      'text-danger-dark': variant === 'danger',
    })}
  >
    <slot />
  </p>
</button>
