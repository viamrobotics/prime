<script lang="ts">
  import { Icon, ToggleButtons } from "@viamrobotics/prime-ui";
  import { mdiFormatListBulleted, mdiViewGrid } from "@mdi/js";

  let layout = $state("grid");
</script>

<div class="not-content">
  <ToggleButtons bind:value={layout} aria-label="Layout">
    <ToggleButtons.Item value="grid" class="flex items-center gap-1" aria-label="Grid">
      <Icon icon={mdiViewGrid} size="sm" />
      Grid
    </ToggleButtons.Item>
    <ToggleButtons.Item value="list" class="flex items-center gap-1" aria-label="List">
      <Icon icon={mdiFormatListBulleted} size="sm" />
      List
    </ToggleButtons.Item>
  </ToggleButtons>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{layout}</code></p>
</div>
