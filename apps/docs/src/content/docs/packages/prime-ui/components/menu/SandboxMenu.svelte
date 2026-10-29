<script lang="ts">
  import { mdiPencil } from "@mdi/js";
  import { Icon, Menu } from "@viamrobotics/prime-ui";
  import type { ComponentProps } from "svelte";

  type Placement = Pick<ComponentProps<typeof Menu.Content>, "side" | "align">;

  const { side, align }: Placement = $props();
</script>

<Menu>
  <Menu.Trigger class="button">Actions</Menu.Trigger>
  <Menu.Content {side} {align}>
    <Menu.Item>
      <Icon icon={mdiPencil} size="sm" />
      Rename
    </Menu.Item>
    <Menu.Item>
      Save
      <Menu.Shortcut>⌘S</Menu.Shortcut>
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item variant="danger">Delete</Menu.Item>
  </Menu.Content>
</Menu>
