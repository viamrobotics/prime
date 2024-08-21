<script lang="ts">
  import {
    ContextMenuItem,
    ContextMenuSeparator,
    FloatingMenu,
    IconButton
  } from '@viamrobotics/prime-core';

  let floatingMenuOpen = false;

  const setFloatingMenuOpen = (isOpen: boolean) => {
    floatingMenuOpen = isOpen;
  };
</script>

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
