<!--
@component

Creates a modal overlay.

```svelte
<script lang="ts">
  let isOpen = false
  const handleOpen = () => (isOpen = true)
  const handleClose = () => (isOpen = false)
</script>

<div>
  <Button on:click={handleOpen}>
    Open Modal
  </Button>
  <Modal {isOpen} on:close={handleClose}>
    <svelte:fragment slot="title">
      This is the modal demo
    </svelte:fragment>
    <svelte:fragment slot="message">
      Are you sure you want to print a statement to the console?
    </svelte:fragment>
    <Button
      slot="primary"
      on:click={() => console.log('statement')}
    >
      Print
    </Button>
    <Button
      slot="secondary"
      variant="dark"
      on:click={handleClose}
    >
      Cancel
    </Button>
  </Modal>
</div>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import IconButton from './button/icon-button.svelte';
import { clickOutside } from '$lib';

/** Whether the modal is open. */
export let isOpen: boolean;

/** The variant of the modal. */
export let variant: 'small' | '' = '';

export let role = "dialog"

const dispatch = createEventDispatcher<{
  close: undefined;
}>();

const handleCloseModal = () => {
  dispatch('close');
};

const handleEscapePress = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    handleCloseModal();
  }
};

$: if (typeof document !== 'undefined') {
  document.body.classList.toggle('overflow-hidden', isOpen);
}
</script>

<svelte:window on:keydown={isOpen ? handleEscapePress : undefined} />

{#if isOpen}
  <div
    class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
    {role}
    aria-modal="true"
  >
    <div
      use:clickOutside={handleCloseModal}
      class={cx(
        'relative max-w-lg border border-medium bg-white p-6 shadow-sm',
        {
          'max-h-[600px] min-h-[400px] w-[480px]': variant === '',
          'max-h-[320px] w-[400px]': variant === 'small',
          'overflow-y-auto': true,
        }
      )}
    >
      <IconButton
        cx="absolute right-4 top-4 text-gray-6"
        icon="close"
        label="Close modal"
        on:click={handleCloseModal}
      />
      <div
        class={cx('flex flex-col gap-2', { 'min-h-[400px]': variant === '' })}
      >
        <h2 class="pr-12 text-lg font-semibold text-default">
          <slot name="title" />
        </h2>

        <div class="text-sm text-subtle-1">
          <slot name="message" />
        </div>

        <div class="flex flex-grow"><slot /></div>

        <div
          class="mt-6 flex justify-end gap-2"
        >
          <slot name="secondary" />
          <slot name="primary" />
        </div>
      </div>
    </div>
  </div>
{/if}
