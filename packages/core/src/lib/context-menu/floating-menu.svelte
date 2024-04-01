<script lang="ts">
import cx from 'classnames';
import { uniqueId } from '$lib/unique-id';
import { Floating, type FloatingPlacement } from '$lib/floating';
import ContextMenu from './context-menu.svelte';

export let isOpen: boolean;
export let label: string | undefined = undefined;
export let describedBy: string | undefined = undefined;
export let placement: FloatingPlacement = 'bottom-start';
export let offset = 0;
export let buttonCX: cx.Argument = '';
export let menuCX: cx.Argument = '';
export let onChange: (isOpen: boolean) => unknown;

const buttonID = uniqueId('floating-menu-control');
const menuID = uniqueId('floating-menu');
const openMenu = () => onChange(true);
const closeMenu = () => onChange(false);

let referenceElement: HTMLElement | undefined;

const handleClickOutside = (element: Element) => {
  if (!referenceElement?.contains(element)) {
    closeMenu();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
  }
};
</script>

<svelte:window on:keydown={isOpen ? handleEscape : undefined} />

<button
  type="button"
  id={buttonID}
  class={cx(buttonCX)}
  aria-haspopup="menu"
  aria-controls={menuID}
  aria-expanded={isOpen}
  aria-label={label}
  aria-describedby={describedBy}
  on:click={isOpen ? closeMenu : openMenu}
  bind:this={referenceElement}
>
  <slot name="control" />
</button>

{#if isOpen}
  <Floating
    {offset}
    {placement}
    {referenceElement}
    onClickOutside={handleClickOutside}
  >
    <ContextMenu
      id={menuID}
      labelledBy={buttonID}
      cx={menuCX}
    >
      <slot name="items" />
    </ContextMenu>
  </Floating>
{/if}
