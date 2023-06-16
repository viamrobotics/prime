<svelte:options immutable tag="v-accordion" />

<script lang="ts">

  import cx from 'classnames';
  import { addStyles } from '../lib/index';
  import { dispatcher } from '../lib/dispatch';
  import { htmlToBoolean } from '../lib/boolean';

  export let title = '';
  export let open = false;

  const dispatch = dispatcher();

  addStyles();

  let isOpen: boolean;

  $: isOpen = htmlToBoolean(open, 'open');

  const toggleAccordion = () => {
    isOpen = !isOpen;
  };

  const handleClick = (event: Event) => {
  if ((event.target as HTMLElement).getAttribute('slot') === 'title') {
    return;
  }

  isOpen = !isOpen;
  dispatch('toggle', { isOpen });
};

</script>

<div class="relative w-full">
  <div class="p-4 flex items-center justify-between text-default cursor-pointer accordion-header" on:click={toggleAccordion}>
    {#if title}
      <h2 class="m-0 text-sm">{title}</h2>
    {/if}

    <slot name="title" />

    <svg class="transition-transform duration-200 transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{isOpen ? 'rotate-0' : 'rotate-180'}">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  <div class="text-black transition-all duration-500 accordion-content" class:visible={isOpen}>
    <slot />
  </div>
</div>
