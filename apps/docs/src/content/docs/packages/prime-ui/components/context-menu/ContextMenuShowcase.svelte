<script lang="ts">
  import { ContextMenu } from "@viamrobotics/prime-ui";

  const area =
    "flex h-24 items-center justify-center rounded-lg border border-dashed border-medium text-sm text-subtle-2";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Plain area</p>
    <ContextMenu>
      <ContextMenu.Trigger class={area}>Right-click here</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <ContextMenu>
      <ContextMenu.Trigger class={area} disabled>
        The browser's own menu shows here
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  </div>
</div>
