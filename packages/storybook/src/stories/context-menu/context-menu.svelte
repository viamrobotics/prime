<script lang="ts">
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  type ContextMenuItemVariant,
} from '@viamrobotics/prime-core';

export let label: string = 'hi';
export let variant: ContextMenuItemVariant = 'primary';
export let icon: string = '';
</script>

<ContextMenu>
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
