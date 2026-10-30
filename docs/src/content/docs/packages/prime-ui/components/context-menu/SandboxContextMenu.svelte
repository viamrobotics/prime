<script lang="ts">
  import { mdiPencil } from "@mdi/js";
  import { ContextMenu, Icon } from "@viamrobotics/prime-ui";
</script>

<ContextMenu>
  <ContextMenu.Trigger
    class="flex h-32 w-72 items-center justify-center rounded-lg border border-dashed border-medium text-sm text-subtle-2"
  >
    Right-click here
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>
      <Icon icon={mdiPencil} size="sm" />
      Rename
    </ContextMenu.Item>
    <ContextMenu.Item>
      Save
      <ContextMenu.Shortcut>⌘S</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item variant="danger">Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
