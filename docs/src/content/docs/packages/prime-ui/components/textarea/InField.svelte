<script lang="ts">
  import { Field, Hint, Label, Textarea } from "@viamrobotics/prime-ui";

  let description = $state("");
</script>

<Field class="not-content flex max-w-xs flex-col gap-1">
  <Label>Description</Label>
  <Textarea bind:value={description} rows={4} />
  <Hint>Shown on the machine's overview page.</Hint>
</Field>
