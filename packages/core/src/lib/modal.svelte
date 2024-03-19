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

export let focusPrimaryElement = false;

let headingElement: HTMLElement | undefined;
let slotElement: HTMLElement | undefined;

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

// Focus Logic
// If no slots are passed focus defaults to heading
// If one slot is passed focus slot element
// if two slots are passed reference focusPrimaryElement and focus primary or secondary slot
$: {
  if (isOpen) {
    const slotValues = slotElement?.querySelectorAll('button');
    if (slotValues?.length === 0) {
      headingElement?.focus();
    } else if (slotValues?.length === 1) {
      slotElement?.querySelectorAll('button').item(0).focus();
    } else if (focusPrimaryElement) {
      slotValues?.item(1).focus();
    } else {
      slotValues?.item(0).focus();
    }
  }
}
</script>

<svelte:window on:keydown={isOpen ? handleEscapePress : undefined} />

{#if isOpen}
  <div
    class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
    role='alertdialog'
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
        <h2
          bind:this={headingElement}
          tabindex="-1"
          class="pr-12 text-lg font-semibold text-default"
        >
          <slot name="title" />
        </h2>

        <div class="text-sm text-subtle-1">
          <slot name="message" />
        </div>

        <div class="flex flex-grow"><slot /></div>

        <div
          class="mt-6 flex justify-end gap-2"
          bind:this={slotElement}
        >
          <slot name="secondary" />
          <slot name="primary" />
        </div>
      </div>
    </div>
  </div>
{/if}
