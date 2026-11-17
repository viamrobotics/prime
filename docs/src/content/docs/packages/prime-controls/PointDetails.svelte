<script lang="ts">
  import { mdiBackupRestore } from "@mdi/js";
  import { Point, type PointAxis, type PointValue } from "@viamrobotics/prime-controls";
  import { Icon } from "@viamrobotics/prime-ui";

  const live: PointValue = { x: 312.4, y: -80.1, z: 420 };
  const messageId = $props.id();

  let target = $state<PointValue>({ x: 312.4, y: -75, z: 420 });
  const edited = $derived(target.y !== live.y);

  const restore = (axis: PointAxis) => {
    const value = live[axis];
    if (value !== undefined) target = { ...target, [axis]: value };
  };
</script>

<div class="not-content w-96">
  <Point
    label="Target"
    suffix="mm"
    step={0.1}
    axes={edited ? { y: { state: "warn", describedBy: messageId } } : undefined}
    bind:value={target}
  >
    {#snippet details(axis)}
      <button
        type="button"
        class="button w-full justify-start button-ghost button-xs"
        aria-label={`Reset ${axis.toUpperCase()} to its live value, ${live[axis]}`}
        onclick={() => restore(axis)}
      >
        <Icon icon={mdiBackupRestore} size="sm" />
        {live[axis]}
      </button>
      {#if axis === "y" && edited}
        <p id={messageId} class="px-1.5 text-xs text-subtle-1">Differs from the live value.</p>
      {/if}
    {/snippet}
  </Point>
</div>
