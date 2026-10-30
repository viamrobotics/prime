<script lang="ts">
  import { ContextMenu } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <ContextMenu bind:open>
    <ContextMenu.Trigger
      class="flex h-24 items-center justify-center rounded-lg border border-dashed border-medium text-sm text-subtle-2"
    >
      Right-click or long-press
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item>Copy</ContextMenu.Item>
      <ContextMenu.Item>Paste</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
