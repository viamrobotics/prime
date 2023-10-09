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
  >
    <svelte:fragment
      slot="control"
      let:isOpen
    >
      {isOpen ? 'Close menu' : 'Open menu'}
    </svelte:fragment>
    <svelte:fragment
      slot="items"
      let:closeMenu
    >
      <ContextMenuItem>Just a label</ContextMenuItem>
      <ContextMenuItem icon="trash-can-outline">With icon</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="primary">Primary</ContextMenuItem>
      <ContextMenuItem
        icon="close"
        variant="danger"
        on:click={closeMenu}
      >
        Danger
      </ContextMenuItem>
    </svelte:fragment>
  </FloatingMenu>
</Story>
