<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  FloatingMenu,
  IconButton,
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
  <ContextMenu
    id={menuID}
    cx="max-w-[150px]"
  >
    <ContextMenuItem icon="refresh">Restart</ContextMenuItem>
    <ContextMenuItem icon="open-in-new">View more info</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem
      icon="trash-can-outline"
      variant="danger"
    >
      Delete
    </ContextMenuItem>
  </ContextMenu>
</Story>

<Story name="Floating">
  <div class="min-h-[150px]">
    <FloatingMenu
      placement="bottom-start"
      offset={4}
      isOpen={floatingMenuOpen}
      onChange={setFloatingMenuOpen}
    >
      <svelte:fragment slot="control">
        <IconButton
          icon="dots-horizontal"
          label="See more"
        />
      </svelte:fragment>
      <svelte:fragment slot="items">
        <ContextMenuItem icon="refresh">Restart</ContextMenuItem>
        <ContextMenuItem icon="open-in-new">View more info</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          icon="trash-can-outline"
          variant="danger"
        >
          Delete
        </ContextMenuItem>
      </svelte:fragment>
    </FloatingMenu>
  </div>
</Story>
