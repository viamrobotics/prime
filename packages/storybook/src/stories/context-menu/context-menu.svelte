<script lang="ts">
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  type ContextMenuItemVariant,
} from '@viamrobotics/prime-core';

export let label = 'hi';
export let variant: ContextMenuItemVariant = 'primary';
export let icon = '';
export let cx = '';
</script>

<ContextMenu {cx}>
  <ContextMenuItem
    {label}
    {variant}
    {icon}
  />
  <ContextMenuItem
    label="hello"
    icon="plus"
  />
  <ContextMenuSeparator />
  <ContextMenuItem
    label="BYE"
    icon="close"
    variant="danger"
  />
</ContextMenu>
