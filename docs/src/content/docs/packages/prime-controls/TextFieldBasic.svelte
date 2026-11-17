<script lang="ts">
  import { TextField } from "@viamrobotics/prime-controls";

  let name = $state("motion-1");
  let pin = $state("");
</script>

<div class="not-content flex w-72 flex-col gap-3">
  <TextField label="Motion name" placeholder="builtin" bind:value={name} />
  <TextField
    label="Pin"
    hint="The board pin to read, such as GPIO17"
    placeholder="GPIO17"
    bind:value={pin}
  />
  <TextField label="Base name" state="error" value="" />
  <p class="text-sm">Name: {JSON.stringify(name)}, pin: {JSON.stringify(pin)}</p>
</div>
