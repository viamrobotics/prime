<script lang="ts">
  import { Point, type PointValue } from "@viamrobotics/prime-controls";

  const AXES = ["x", "y", "z"] as const;
  const MIXED = { placeholder: "-" };

  let poses = $state<PointValue[]>([
    { x: 10, y: 0, z: 5 },
    { x: 10, y: 0, z: 40 },
  ]);

  const shared = $derived(
    Object.fromEntries(
      AXES.map((axis) => [
        axis,
        poses.every((pose) => pose[axis] === poses[0][axis]) ? poses[0][axis] : undefined,
      ]),
    ) as Partial<PointValue>,
  );

  const write = (next: Partial<PointValue>) => {
    const numbers = Object.fromEntries(
      Object.entries(next).filter(([, value]) => value !== undefined),
    );
    poses = poses.map((pose) => ({ ...pose, ...numbers }));
  };
</script>

<div class="not-content flex w-96 flex-col gap-2">
  <Point
    label="Position of 2 objects"
    axes={{ x: MIXED, y: MIXED, z: MIXED }}
    bind:value={() => shared, write}
  />
  {#each poses as pose, index (index)}
    <output class="text-xs">Object {index + 1}: {JSON.stringify(pose)}</output>
  {/each}
</div>
