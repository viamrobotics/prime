<script lang="ts">
  import { Checkbox, Field, Label } from "@viamrobotics/prime-ui";

  let accepted = $state(false);
</script>

<div class="not-content">
  <Field class="flex items-center gap-2">
    <Checkbox
      bind:checked={
        () => accepted,
        (next) => {
          if (next) accepted = true;
        }
      }
    />
    <Label>Accept the terms (cannot be undone)</Label>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">accepted: <code>{accepted}</code></p>
</div>
