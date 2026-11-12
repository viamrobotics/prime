<script lang="ts">
  import { NumberField } from "@viamrobotics/prime-controls";

  let speed = $state(5);
  let writes = $state(0);
</script>

<div class="not-content flex w-48 flex-col gap-3">
  <NumberField
    label="Speed"
    bind:value={
      () => speed,
      (next) => {
        if (next !== undefined) speed = next;
        writes += 1;
      }
    }
  />
  <p class="text-sm text-subtle-2">last value: <code>{speed}</code></p>
  <p class="text-sm text-subtle-2">writes: <code>{writes}</code></p>
</div>
