<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';

type Variants = 'default' | 'minimal';

export let title = '';
export let open = false;
export let variant: Variants = 'default';

const dispatch = createEventDispatcher();

const handleClick = () => {
  dispatch('toggle', { isOpen: !open });
};
</script>

<div class="relative w-full">
  <div
    role="button"
    aria-label="Toggle Content"
    tabindex="0"
    class="{cx(
      'w-full py-2 px-4 flex flex-reverse items-center justify-between text-default cursor-pointer',
      {
        'border border-light bg-white': variant === 'default',
      }
    )},"
    on:click={handleClick}
    on:keyup|preventDefault={handleClick}
  >
    <div class="flex flex-wrap gap-x-3 gap-y-1 items-center">
      {#if title}
        <h2 class="m-0 text-sm">{title}</h2>
      {/if}

      <slot name="title" />
    </div>

    <div class="h-full flex items-center gap-3">
      <slot name="header" />

      <v-icon
        class={cx('transition-transform duration-200', {
          'rotate-0': !open,
          'rotate-180': open,
        })}
        name="chevron-down"
      />
    </div>
  </div>

  <div
    class={cx('text-black transition-all duration-500', {
      'bg-white': variant === 'default',
      hidden: !open,
    })}
  >
    <slot />
  </div>
</div>
