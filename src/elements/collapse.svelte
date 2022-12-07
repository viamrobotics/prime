<svelte:options immutable tag='v-collapse' />

<script lang='ts'>

type Variants = 'default' | 'minimal'

import cx from 'classnames';
import { addStyles } from '../lib/index';
import { dispatcher } from '../lib/dispatch';

export let title = '';
export let open = false;
export let variant: Variants = 'default';

const dispatch = dispatcher();

addStyles();

const handleClick = (event: Event) => {
  if ((event.target as HTMLElement).getAttribute('slot') === 'header') {
    return;
  }

  open = !open;
  dispatch('toggle', { open });
};

</script>

<div class='relative w-full'>
  <div
    class={cx('w-full py-2 px-4 flex flex-reverse items-center justify-between text-black cursor-pointer', {
      'border border-black bg-white': variant === 'default',
    })},
    on:click={handleClick}
    on:keyup|stopPropagation|preventDefault={handleClick}
  >
    <div class='flex flex-wrap gap-x-3 gap-y-1 items-center'>
      {#if title}
        <h2 class='m-0 text-sm'>{title}</h2>
      {/if}

      <slot name='title' />
    </div>

    <div class='h-full flex items-center gap-3'>
      <slot name='header' />

      <v-icon
        class={cx('transition-transform duration-200', {
          'rotate-0': !open,
          'rotate-180': open,
        })}
        name='chevron-down'
        size='2xl'
      />
    </div>
  </div>

  <div
    class="{cx(' text-black transition-all duration-500', {
      'bg-white': variant === 'default',
      'max-h-0': !open,
      'max-h-fit': open,
    })}"
  >
    <slot />
  </div>
</div> 
