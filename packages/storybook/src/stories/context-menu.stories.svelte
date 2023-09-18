<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Context menu" />

<Story name="Basic">
  <ContextMenu>
    <ContextMenuItem label="Just a label" />
    <ContextMenuItem
      label="With icon"
      icon="trash-can-outline"
    />
    <ContextMenuSeparator />
    <ContextMenuItem
      label="Primary"
      variant="primary"
    />
    <ContextMenuItem
      label="Danger"
      icon="close"
      variant="danger"
    />
  </ContextMenu>
</Story>
