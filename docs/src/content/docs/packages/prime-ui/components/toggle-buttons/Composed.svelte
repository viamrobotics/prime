<script lang="ts">
  import { mdiFormatListBulleted, mdiViewGrid } from "@mdi/js";
  import { Field, Icon, ToggleButtons } from "@viamrobotics/prime-ui";

  let layout = $state("grid");
</script>

<div class="not-content">
  <Field aria-label="Layout">
    <ToggleButtons bind:value={layout}>
      <ToggleButtons.Item value="grid" class="flex items-center gap-1">
        <Icon icon={mdiViewGrid} size="sm" />
        Grid
      </ToggleButtons.Item>
      <ToggleButtons.Item value="list" class="flex items-center gap-1">
        <Icon icon={mdiFormatListBulleted} size="sm" />
        List
      </ToggleButtons.Item>
    </ToggleButtons>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{layout}</code></p>
</div>
