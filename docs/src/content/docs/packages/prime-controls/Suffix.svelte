<script lang="ts">
  import { NumberField, Point, Slider } from "@viamrobotics/prime-controls";

  let length = $state(120);
  let position = $state({ x: 0, y: 1, z: 2 });
  let opacity = $state(80);
</script>

<div class="not-content flex w-72 flex-col gap-3">
  <NumberField label="Length" suffix="mm" step={0.1} bind:value={length} />
  <Point label="Position" suffix="mm" bind:value={position} />
  <Slider label="Opacity" suffix="%" bind:value={opacity} />
</div>
