<svelte:options immutable={true} tag='v-dialogue' />

<script lang='ts'>
  import cx from 'classnames';

  import { addStyles } from '../lib/index';

  export let variant = '';
  export let title = '';
  export let message = '';
  export let text = '';

  export let isOpen = true;

  const hideModal = () => {
    isOpen = false;
  };

  addStyles();
</script>

<div 
  class={
    cx('z-50 bg-gray-200 bg-opacity-25 w-full h-full absolute top-0 left-0 p-10 flex justify-center items-center', {
      invisible: !isOpen,
    }
  )}
  on:click={hideModal}
>
  <div 
    class='min-w-[400px] relative border border-black bg-white m-2 p-4 max-w-lg' style='box-shadow:4px 4px 0px #000'
    on:click|stopPropagation
  >
    <button 
      class="absolute right-0 top-0 p-2 hover:scale-125 transition-transform"
      on:click={hideModal}
    >
      <v-icon
        class=' text-gray-500 hover:text-black'
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

      {#if isOpen}
      <div class='flex flex-row-reverse'>
        <v-button
          class='ml-4'
          variant='{variant}'
          label='{text}'
        />
      </div>
      {/if}
    </figure>
  </div>
</div>
