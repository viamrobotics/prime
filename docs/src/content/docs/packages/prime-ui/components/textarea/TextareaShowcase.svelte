<script lang="ts">
  import { Field, Hint, Label, Textarea } from "@viamrobotics/prime-ui";
</script>

<div class="not-content grid max-w-md gap-3">
  <Field aria-label="Default" class="grid">
    <Textarea placeholder="Default" />
  </Field>
  <Field aria-label="Disabled" disabled class="grid">
    <Textarea placeholder="Disabled" />
  </Field>
  <Field aria-label="Read-only" class="grid">
    <Textarea readonly value="Read-only value" />
  </Field>
  <Field label="Error" state="error" class="flex flex-col gap-1">
    <Label />
    <Textarea />
    <Hint>Something is wrong.</Hint>
  </Field>
</div>
