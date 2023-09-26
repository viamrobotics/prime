<svelte:options immutable />

<script lang="ts">
type Variants = 'default' | 'minimal';

import cx from 'classnames';
import { dispatcher } from '../lib/dispatch';
import { htmlToBoolean } from '../lib/boolean';

export let title = '';
export let open = 'false';
export let variant: Variants = 'default';

const dispatch = dispatcher();

let isOpen: boolean;

$: isOpen = htmlToBoolean(open, 'open');

const handleClick = (event: Event) => {
  if ((event.target as HTMLElement).getAttribute('slot') === 'header') {
    return;
  }

  isOpen = !isOpen;
  dispatch(event, 'toggle', { isOpen });
};
</script>

<div class="relative w-full">
  <div
    class="{cx(
      'flex-reverse flex w-full cursor-pointer items-center justify-between px-4 py-2 text-default',
      {
        'border border-light bg-white': variant === 'default',
      }
    )},"
    on:click={handleClick}
    on:keyup|preventDefault={handleClick}
  >
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
      {#if title}
        <h2 class="m-0 text-sm">{title}</h2>
      {/if}

      <slot name="title" />
    </div>

    <div class="flex h-full items-center gap-3">
      <slot name="header" />

      <v-icon
        class={cx('transition-transform duration-200', {
          'rotate-0': !isOpen,
          'rotate-180': isOpen,
        })}
        name="chevron-down"
      />
    </div>
  </div>

  <div
    class={cx('text-black transition-all duration-500', {
      'bg-white': variant === 'default',
      hidden: !isOpen,
    })}
  >
    <slot />
  </div>
</div>
