<script lang="ts">
  import { Menu } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Menu bind:open>
    <Menu.Trigger class="button">Actions</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Rename</Menu.Item>
      <Menu.Item>Duplicate</Menu.Item>
    </Menu.Content>
  </Menu>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
