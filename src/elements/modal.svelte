<svelte:options immutable={true} tag='v-modal' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';
import { dispatch } from '../lib/dispatch';

export let title = '';
export let message = '';

export let open = 'false';
let isOpen: boolean;

$: isOpen = htmlToBoolean(open, 'open');

const handleClick = (event: Event) => {
  dispatch(event.currentTarget as HTMLVideoElement, 'close')
};

addStyles();
</script>

<div 
  class={
    cx('z-50 bg-gray-300 bg-opacity-25 w-full h-full absolute top-0 left-0 p-10 flex justify-center items-center', {
      'invisible': !isOpen,
    }
  )}
  on:click={handleClick}
>
  <div 
    class='min-w-[400px] relative border border-black bg-white m-2 p-4 max-w-lg shadow-solid4'
    on:click|stopPropagation
  >
    <button 
      class="absolute right-0 top-0 p-3 hover:scale-110 transition-transform text-gray-500 hover:text-black"
      on:click={handleClick}
    >
      <v-icon
        name='x'
        size='2xl'
      />
    </button>

    <figure>
      <figcaption class='mb-2 pr-12 text-2xl font-bold'>
        {title}
      </figcaption>
      
      {#if message}
        <p class='mb-8 text-base'>{message}</p>
      {/if}

      <slot />

      <div class='flex flex-row-reverse'>
        <slot name='action' />
      </div>
    </figure>
  </div>
</div>
