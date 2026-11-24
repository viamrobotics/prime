<script lang="ts">
  import { Field, Textarea } from "@viamrobotics/prime-ui";

  let notes = $state("");
</script>

<div class="not-content">
  <Field aria-label="Notes">
    <Textarea class="w-64" bind:value={notes} placeholder="Notes" />
  </Field>

  <p class="mt-3 text-sm text-subtle-2">length: <code>{notes.length}</code></p>
</div>
