<script lang="ts">
  import { Menubar } from "@viamrobotics/prime-ui";

  let showGrid = $state(true);
</script>

<div class="not-content">
  <Menubar aria-label="Application">
    <Menubar.Menu>
      <Menubar.Trigger>Project</Menubar.Trigger>
      <Menubar.Content aria-label="Project">
        <Menubar.Item>
          New
          <Menubar.Shortcut>⌘N</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item>
          Open
          <Menubar.Shortcut>⌘O</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Sub>
          <Menubar.SubTrigger>Export as</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.Item>PNG</Menubar.Item>
            <Menubar.Item>SVG</Menubar.Item>
            <Menubar.Item>PDF</Menubar.Item>
          </Menubar.SubContent>
        </Menubar.Sub>
        <Menubar.Separator />
        <Menubar.Item variant="danger">Delete project</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>

    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content aria-label="Edit">
        <Menubar.Item>
          Undo
          <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item>
          Redo
          <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>

    <Menubar.Menu>
      <Menubar.Trigger>View</Menubar.Trigger>
      <Menubar.Content aria-label="View">
        <Menubar.CheckboxItem bind:checked={showGrid}>
          Show grid
        </Menubar.CheckboxItem>
        <Menubar.Item>Zoom to fit</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar>
</div>
