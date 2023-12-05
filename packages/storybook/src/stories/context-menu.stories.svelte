<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  FloatingMenu,
  uniqueId,
} from '@viamrobotics/prime-core';

const menuID = uniqueId('context-menu');

let floatingMenuOpen = false;

const setFloatingMenuOpen = (isOpen: boolean) => {
  floatingMenuOpen = isOpen;
};
</script>

<Meta title="Elements/Context menu" />

<Story name="Basic">
  <ContextMenu id={menuID}>
    <ContextMenuItem>Just a label</ContextMenuItem>
    <ContextMenuItem icon="trash-can-outline">With icon</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="primary">Primary</ContextMenuItem>
    <ContextMenuItem
      icon="close"
      variant="danger"
    >
      Danger
    </ContextMenuItem>
  </ContextMenu>
</Story>

<Story name="Floating">
  <FloatingMenu
    placement="bottom-start"
    offset={4}
    isOpen={floatingMenuOpen}
    onChange={setFloatingMenuOpen}
  >
    <svelte:fragment slot="control">
      {floatingMenuOpen ? 'Close menu' : 'Open menu'}
    </svelte:fragment>
    <svelte:fragment slot="items">
      <ContextMenuItem>Just a label</ContextMenuItem>
      <ContextMenuItem icon="trash-can-outline">With icon</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="primary">Primary</ContextMenuItem>
      <ContextMenuItem
        icon="close"
        variant="danger"
        on:click={() => setFloatingMenuOpen(false)}
      >
        Danger
      </ContextMenuItem>
    </svelte:fragment>
  </FloatingMenu>
</Story>
