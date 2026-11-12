<script lang="ts">
  import { Menubar } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled trigger</p>
    <Menubar aria-label="Disabled example">
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Open</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger disabled>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled and danger items</p>
    <Menubar aria-label="Items example">
      <Menubar.Menu>
        <Menubar.Trigger>Project</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item disabled>Share</Menubar.Item>
          <Menubar.Item variant="danger">Delete</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  </div>
</div>
