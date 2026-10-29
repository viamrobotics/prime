<script lang="ts">
  import { Menu } from "@viamrobotics/prime-ui";
</script>

<div class="not-content pt-32">
  <Menu>
    <Menu.Trigger class="button">Open above</Menu.Trigger>
    <Menu.Content side="top" align="end" sideOffset={8}>
      <Menu.Item>Rename</Menu.Item>
      <Menu.Item>Duplicate</Menu.Item>
    </Menu.Content>
  </Menu>
</div>
