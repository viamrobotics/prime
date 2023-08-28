import type { Action } from 'svelte/action';

/**
 * Trigger a callback when the user clicks outside the element.
 *
 * Use a [Svelte action](https://svelte.dev/docs/svelte-action):
 * ```svelte
 * <script lang="ts">
 * import { writable } from 'svelte/store'
 * import { clickOutside } from '@viamrobotics/prime-core'
 *
 * const isOpen = writable(false)
 * </script>
 *
 * <button on:click={() => isOpen.set(true)}>
 *   Open Modal
 * </button>
 * {#if isOpen}
 *   <article use:clickOutside={() => isOpen.set(false)}>
 *     <h3>Cool modal</h3>
 *   </article>
 * {/if}
 * ```
 *
 * @param node The DOM node the action is attached to.
 * @param handler The callback to run
 * @returns The Svelte Action
 */
export const clickOutside: Action<HTMLElement, () => unknown> = (
  node,
  handler
) => {
  let handleClickOutside = handler;

  const handleWindowClick = (event: MouseEvent): void => {
    if (
      node &&
      !node.contains(event.target as Element | null) &&
      !event.defaultPrevented
    ) {
      handleClickOutside();
    }
  };

  window.document.addEventListener('click', handleWindowClick);

  return {
    update: (nextHandler: () => unknown) => {
      handleClickOutside = nextHandler;
    },
    destroy: () => {
      window.document.removeEventListener('click', handleWindowClick);
    },
  };
};
