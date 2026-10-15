<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  let name = $state("Rover 1");
  let touched = $state(false);

  const isValid = $derived(/^[a-z0-9-]+$/.test(name));
  const state = $derived(touched && !isValid ? "error" : "none");
</script>

<Field class="not-content flex max-w-xs flex-col gap-1" {state}>
  <Label>Machine name</Label>
  <Input bind:value={name} onblur={() => (touched = true)}>
    <Input.StateIcon />
  </Input>
  <Hint>Lowercase letters, numbers, and dashes. Validated on blur.</Hint>
</Field>
