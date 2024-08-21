<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { htmlToBoolean } from '../lib/boolean';
import { dispatcher } from '../lib/dispatch';
import { checkKeyboardEvent } from '../lib/events';

export let title = '';
export let message = '';
export let open = 'false';
export let variant: 'small' | '' = '';

const dispatch = dispatcher();

let isOpen: boolean;

$: isOpen = htmlToBoolean(open, 'open');
$: document.body.classList.toggle('overflow-hidden', isOpen);

const handleClose = (event: MouseEvent | KeyboardEvent) => {
  // Close only if background is clicked (not the modal itself)
  if (event instanceof MouseEvent && event.target !== event.currentTarget) {
    return;
  }

  if (event instanceof KeyboardEvent && !checkKeyboardEvent(event, ['Enter'])) {
    return;
  }

  dispatch(event, 'close');
};
</script>

<!-- 
  In order to make the overlay keyboard navigable for the keyup behavior we need to apply a tab index to this div.
  svelte-ignore a11y-no-noninteractive-tabindex 
-->
<div
  class={cx(
    'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40',
    {
      invisible: !isOpen,
    }
  )}
  tabindex="0"
  aria-label={title}
  on:click={handleClose}
  on:keyup|preventDefault={handleClose}
>
  <div
    class={cx('relative border border-medium bg-white p-6 shadow-sm', {
      'max-h-[600px] min-h-[400px] w-[480px]': variant === '',
      'max-h-[320px] w-[400px]': variant === 'small',
    })}
  >
    <v-button
      class="absolute right-4 top-4 text-gray-6"
      icon="close"
      label="Delete component"
      variant="icon"
      on:click={handleClose}
      on:keydown={handleClose}
    />
    <figure
      class={cx('flex flex-col gap-2', { 'min-h-[400px]': variant === '' })}
    >
      <figcaption class="pr-12 text-lg font-semibold">
        {title}
      </figcaption>

      {#if message}
        <p class="text-sm text-subtle-1">{message}</p>
      {/if}

      <div class="flex flex-grow"><slot /></div>

      <div class="mt-6 flex justify-end gap-2">
        <slot name="secondary" />
        <slot name="primary" />
      </div>
    </figure>
  </div>
</div>
