<script lang="ts">
  import { Field, Hint, Label, Textarea } from "@viamrobotics/prime-ui";
</script>

<div class="not-content grid max-w-md gap-3">
  <Textarea placeholder="Default" aria-label="Default" />
  <Textarea disabled placeholder="Disabled" aria-label="Disabled" />
  <Textarea readonly value="Read-only value" aria-label="Read-only" />
  <Field state="error" class="flex flex-col gap-1">
    <Label>Error</Label>
    <Textarea />
    <Hint>Something is wrong.</Hint>
  </Field>
</div>
