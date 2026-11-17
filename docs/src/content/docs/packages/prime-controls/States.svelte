<script lang="ts">
  import { NumberField, Point, Slider } from "@viamrobotics/prime-controls";

  let speed = $state(12);
  let length = $state(120);
  let position = $state({ x: 0, y: 1 });
  let opacity = $state(40);
</script>

<div class="not-content flex w-72 flex-col gap-3">
  <NumberField label="Speed" state="warn" bind:value={speed} />
  <NumberField label="Length" suffix="mm" state="error" bind:value={length} />
  <Point label="Position" state="error" bind:value={position} />
  <Slider label="Opacity" suffix="%" state="warn" bind:value={opacity} />
</div>
