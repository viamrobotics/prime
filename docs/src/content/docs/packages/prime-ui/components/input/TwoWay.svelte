<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  let name = $state("rover-1");
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Machine name</Label>
    <Input bind:value={name} placeholder="rover-1" />
    <Hint>Lowercase letters, numbers, and dashes.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{name}</code></p>
</div>
