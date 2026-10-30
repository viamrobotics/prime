<script lang="ts">
  import { Tooltip } from "@viamrobotics/prime-ui";

  const placements = ["top", "right", "bottom", "left"] as const;
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Placement</p>
    <div class="flex flex-wrap gap-4 px-24 py-12">
      {#each placements as placement (placement)}
        <Tooltip>
          <Tooltip.Trigger class="inline-flex">
            <button type="button" class="button">{placement}</button>
          </Tooltip.Trigger>
          <Tooltip.Content {placement}>On the {placement}</Tooltip.Content>
        </Tooltip>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <Tooltip disabled>
      <Tooltip.Trigger class="inline-flex">
        <button type="button" class="button">Never shows</button>
      </Tooltip.Trigger>
      <Tooltip.Content>You will not see this</Tooltip.Content>
    </Tooltip>
  </div>
</div>
