<script lang="ts">
import cx from 'classnames';
import { uniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';
import { floatingStyle } from './floating-style';
import ContextMenu from './context-menu.svelte';

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
  if (element !== controlElement) {
    closeMenu();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
  }
};

$: style.register({ controlElement, menuElement });
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
    use:clickOutside={handleClickOutside}
    bind:this={menuElement}
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
