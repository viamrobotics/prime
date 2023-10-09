<script lang="ts">
import cx from 'classnames';
import { uniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';
import { floatingStyle, type FloatingMenuPlacement } from './floating-style';
import ContextMenu from './context-menu.svelte';

export let placement: FloatingMenuPlacement = 'bottom-start';
export let offset = 0;
export let buttonCX: cx.Argument = '';
export let menuCX: cx.Argument = '';

const menuID = uniqueId('floating-menu');
const style = floatingStyle();

let isOpen = false;
let controlElement: HTMLElement | undefined;
let menuElement: HTMLElement | undefined;

const openMenu = () => (isOpen = true);
const closeMenu = () => (isOpen = false);

const handleClickOutside = (element: Element) => {
  if (!controlElement?.contains(element)) {
    closeMenu();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
  }
};

$: style.register({ controlElement, menuElement, placement, offset });
</script>

<svelte:document on:keydown={isOpen ? handleEscape : undefined} />

<button
  class={cx(buttonCX)}
  aria-haspopup="menu"
  aria-controls={menuID}
  aria-expanded={isOpen}
  on:click={isOpen ? closeMenu : openMenu}
  bind:this={controlElement}
>
  <slot
    name="control"
    {isOpen}
  />
</button>

{#if isOpen}
  <div
    bind:this={menuElement}
    use:clickOutside={handleClickOutside}
    class="absolute left-0 top-0 z-max w-max"
    class:invisible={!$style}
    style:top={$style?.top}
    style:left={$style?.left}
  >
    <ContextMenu
      id={menuID}
      cx={menuCX}
    >
      <slot name="items" />
    </ContextMenu>
  </div>
{/if}
