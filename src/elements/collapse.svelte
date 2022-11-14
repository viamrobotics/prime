<svelte:options immutable tag='v-collapse' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';

export let title = '';
export let open = false;

let root: HTMLElement;
const variant = 'secretUI';

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
    class={cx('w-full py-2 px-4 flex flex-reverse items-center justify-between border text-black border-black bg-white cursor-pointer', {
      'border-none bg-none': variant === 'secretUI'
    })}
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
    class="{cx('bg-white text-black overflow-hidden transition-all duration-500', {
      'max-h-0': !open,
      'max-h-fit': open,
    })}"
  >
    <slot />
  </div>
</div> 


