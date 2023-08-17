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

const dispatch = createEventDispatcher<{
  /** Fires when selected with the label */
  select: { value: string };
}>();

/**
 * Optional icon name (https://prime.viam.com/?path=/docs/elements-icon--docs).
 * No icon by default.
 */
export let icon = '';

/** The style variant, default value is 'primary' */
export let variant: ContextMenuItemVariant = 'primary';

/** The text displayed. */
export let label: string;
</script>

<button
  role="menuitem"
  aria-labelledby={label}
  class="flex w-full items-center gap-1 px-2 py-1.5 text-left hover:bg-light"
  on:click={() => dispatch('select', { value: label })}
>
  {#if icon !== ''}
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
