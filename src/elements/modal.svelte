<!-- Use native modal once supported https://caniuse.com/?search=popover -->
<svelte:options immutable tag="v-modal" />

<script lang="ts">
import cx from 'classnames';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';
import { dispatcher } from '../lib/dispatch';
import { checkKeyboardEvent } from '../lib/events';

export let title = '';
export let message = '';
export let open = 'false';

const dispatch = dispatcher();

addStyles();

let isOpen: boolean;

$: isOpen = htmlToBoolean(open, 'open');

const handleClose = (event: MouseEvent | KeyboardEvent) => {
  if (event instanceof KeyboardEvent && !checkKeyboardEvent(event, ['Enter'])) {
    return;
  }

  dispatch('close');
};
</script>

<!-- 
  In order to make the overlay keyboard navigable for the keyup behavior we need to apply a tab index to this div.
  svelte-ignore a11y-no-noninteractive-tabindex 
-->
<div
  class={cx(
    'z-50 bg-black bg-opacity-40 w-full h-full fixed top-0 left-0 flex justify-center items-center',
    {
      invisible: !isOpen,
    }
  )}
  tabindex="0"
  aria-label={`${title}`}
  on:click={handleClose}
  on:keyup|stopPropagation|preventDefault={handleClose}
>
  <div
    class="w-[480px] relative border border-medium bg-white p-6 max-w-lg shadow-sm"
    on:click|stopPropagation
    on:keyup|stopPropagation
  >
    <v-button
      class="absolute right-4 top-4 text-gray-6"
      icon="x"
      label="Delete component"
      variant="icon"
      on:click={handleClose}
      on:keydown={handleClose}
    />
    <figure class="min-h-[400px] flex flex-col gap-2">
      <figcaption class="pr-12 text-lg font-semibold">
        {title}
      </figcaption>

      {#if message}
        <p class="text-sm text-subtle-1">{message}</p>
      {/if}

      <div class="flex flex-grow"><slot /></div>

      <div class="flex justify-end gap-2">
        <slot name="secondary" />
        <slot name="primary" />
      </div>
    </figure>
  </div>
</div>
