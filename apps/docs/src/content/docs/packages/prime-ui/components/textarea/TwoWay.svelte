<script lang="ts">
  import { Textarea } from "@viamrobotics/prime-ui";

  let notes = $state("");
</script>

<div class="not-content">
  <Textarea class="w-64" bind:value={notes} aria-label="Notes" placeholder="Notes" />

  <p class="mt-3 text-sm text-subtle-2">length: <code>{notes.length}</code></p>
</div>
