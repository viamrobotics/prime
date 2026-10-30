<script lang="ts">
  import { Menu } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Menu>
    <Menu.Trigger class="button">File</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Open</Menu.Item>
      <Menu.Sub>
        <Menu.SubTrigger>Export as</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Item>PNG</Menu.Item>
          <Menu.Item>SVG</Menu.Item>
          <Menu.Item>PDF</Menu.Item>
        </Menu.SubContent>
      </Menu.Sub>
    </Menu.Content>
  </Menu>
</div>
