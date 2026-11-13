<script lang="ts">
  import { Slider } from "@viamrobotics/prime-controls";

  let level = $state(20);
  let writes = $state(0);
</script>

<div class="not-content flex w-72 flex-col gap-3">
  <Slider
    label="Level"
    bind:value={
      () => level,
      (next) => {
        level = next;
        writes += 1;
      }
    }
  />
  <p class="text-sm text-subtle-2">last value: <code>{level}</code></p>
  <p class="text-sm text-subtle-2">writes: <code>{writes}</code></p>
</div>
