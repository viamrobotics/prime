<script lang="ts">
  import { Menubar } from "@viamrobotics/prime-ui";
</script>

<Menubar aria-label="Application">
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content aria-label="File">
      <Menubar.Item>
        New
        <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>Open</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content aria-label="Edit">
      <Menubar.Item>Undo</Menubar.Item>
      <Menubar.Item>Redo</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content aria-label="View">
      <Menubar.Item>Zoom in</Menubar.Item>
      <Menubar.Item>Zoom out</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar>
