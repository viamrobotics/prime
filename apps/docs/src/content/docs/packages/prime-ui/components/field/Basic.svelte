<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  let name = $state("");
</script>

<Field class="not-content flex max-w-xs flex-col gap-1" required>
  <Label>Machine name</Label>
  <Input bind:value={name} placeholder="rover-1" />
  <Hint>Lowercase letters, numbers, and dashes.</Hint>
</Field>
