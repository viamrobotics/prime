<script lang="ts">
  import { mdiBackupRestore } from "@mdi/js";
  import { Point, type PointAxis, type PointValue } from "@viamrobotics/prime-controls";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";

  const live: PointValue = { x: 312.4, y: -80.1, z: 420 };

  let target = $state<PointValue>({ x: 312.4, y: -75, z: 420 });

  const restore = (axis: PointAxis) => {
    const value = live[axis];
    if (value !== undefined) target = { ...target, [axis]: value };
  };
</script>

<div class="not-content w-96">
  <Point label="Target" step={0.1} bind:value={target}>
    {#snippet trailing(axis)}
      <Tooltip>
        <Tooltip.Trigger class="flex shrink-0">
          <button
            type="button"
            class={["icon-button size-5", target[axis] === live[axis] && "invisible"]}
            aria-label={`Reset ${axis.toUpperCase()} to ${live[axis]}`}
            onclick={() => restore(axis)}
          >
            <Icon icon={mdiBackupRestore} size="sm" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Reset to {live[axis]}</Tooltip.Content>
      </Tooltip>
    {/snippet}
  </Point>
</div>
