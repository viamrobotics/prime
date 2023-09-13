<!--
@component

Created a modal overlay.

```svelte
    <Modal
      open={modalOpen}
      title='This is the modal demo'
      message='Are you sure you want to kick off a notify toast?'
      on:close={handleCloseModal}
    >
      <Button slot='primary' on:click={() => notify.success('Howdy Message', 'Howdy Partner')}>Notify howdy</Button>
      <Button
        slot='secondary'
        variant='dark'
        on:click={handleCloseModal}
      >Cancel</Button>
    </Modal>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher, onMount } from 'svelte';
import IconButton from './button/icon-button.svelte';

/** The title text in the modal. */
export let title = '';
/** The message text in the modal. */
export let message = '';
/** Whether the modal is open. */
export let open = false;
/** The variant of the modal. */
export let variant: 'small' | '' = '';

const dispatch = createEventDispatcher<{
  /** Fires when the modal is requested to close. */
  close: boolean;
}>();

const handleCloseModal = () => {
  dispatch('close', true);
};

const handleBackgroundClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleCloseModal();
  }
};

onMount(() => {
  document.body.classList.toggle('overflow-hidden', open);
});
</script>

<div
  class={cx(
    'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40',
    {
      invisible: !open,
    }
  )}
  role="dialog"
  tabindex="0"
  aria-label={title}
  on:click={handleBackgroundClick}
>
  <div
    class={cx('relative max-w-lg border border-medium bg-white p-6 shadow-sm', {
      'max-h-[600px] min-h-[400px] w-[480px]': variant === '',
      'max-h-[320px] w-[400px]': variant === 'small',
    })}
  >
    <IconButton
      class="absolute right-4 top-4 text-gray-6"
      icon="close"
      label="Close modal"
      on:click={handleCloseModal}
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
