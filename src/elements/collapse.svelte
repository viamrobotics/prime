<svelte:options immutable={true} tag='v-collapse' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';

export let title = '';
export let open = false;

let root: HTMLElement;

addStyles();

const handleClick = (event: Event) => {
  if ((event.target as HTMLElement).getAttribute('slot') === 'header') {
    return;
  }

  open = !open;
  dispatch(root, 'toggle', { open });
};

</script>

<div
  bind:this={root}
  class='relative w-full overflow-hidden'
>
  <div
    class='w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer'
    on:click={handleClick}
  >
    <div class='flex items-center gap-2'>
      {#if title}
        <h2 class='text-sm'>{title}</h2>
      {/if}

      <slot name='title' />
    </div>

    <div class='h-full flex items-center gap-3'>
      <slot name='header' />

      <svg
        class={cx('transition-transform duration-200', {
          'rotate-0': !open,
          'rotate-180': open,
        })}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>

  <div
    class="{cx('bg-white text-black overflow-hidden transition-all duration-500', {
      'max-h-0': !open,
      'max-h-fit': open,
    })}"
  >
    <slot />
  </div>
</div>  
