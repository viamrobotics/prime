import type { Action } from 'svelte/action';

export type ClickOutsideHandler = (target: Element) => void;

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
export const clickOutside: Action<
  Element | undefined,
  ClickOutsideHandler | undefined
> = (node, handler) => {
  let handleClickOutside = handler;
  let isMouseDown = false;

  const getOutsideTarget = (event: MouseEvent): Element | undefined => {
    const { target } = event;

    return node &&
      target instanceof Element &&
      window.document.contains(target) &&
      !node.contains(target) &&
      !event.defaultPrevented
      ? target
      : undefined;
  };

  const handleMouseDown = (event: MouseEvent): void => {
    const target = getOutsideTarget(event);

    if (target) {
      isMouseDown = true;
    }
  };

  const handleMouseUp = (event: MouseEvent): void => {
    const previousIsMouseDown = isMouseDown;
    const target = getOutsideTarget(event);
    isMouseDown = false;

    if (target && previousIsMouseDown) {
      handleClickOutside?.(target);
    }
  };

  // Listen to mousedown and mouseup rather than click
  // so don't trigger if the click starts inside the element and moves out.
  window.document.addEventListener('mousedown', handleMouseDown, true);
  window.document.addEventListener('mouseup', handleMouseUp, true);

  return {
    update: (nextHandler: ClickOutsideHandler | undefined) => {
      handleClickOutside = nextHandler;
    },
    destroy: () => {
      window.document.removeEventListener('mousedown', handleMouseDown, true);
      window.document.removeEventListener('mouseup', handleMouseUp, true);
    },
  };
};
