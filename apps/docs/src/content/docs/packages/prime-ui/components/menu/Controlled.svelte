<script lang="ts">
  import { Menu } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let isLocked = $state(true);
</script>

<div class="not-content flex flex-col items-start gap-3">
  <label class="flex items-center gap-2 text-sm">
    <input type="checkbox" bind:checked={isLocked} />
    Keep closed
  </label>

  <Menu
    bind:open={
      () => open,
      (next) => {
        if (!isLocked) open = next;
      }
    }
  >
    <Menu.Trigger class="button">Actions</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Rename</Menu.Item>
      <Menu.Item>Duplicate</Menu.Item>
    </Menu.Content>
  </Menu>
</div>
