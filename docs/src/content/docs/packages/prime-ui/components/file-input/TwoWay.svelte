<script lang="ts">
  import { Field, FileInput } from "@viamrobotics/prime-ui";

  let files = $state<File[]>([]);
</script>

<div class="not-content">
  <Field aria-label="Images">
    <FileInput class="w-72" accept="image/*" multiple bind:value={files} />
  </Field>

  <p class="mt-3 text-sm text-subtle-2">chosen: <code>{files.length}</code></p>
  <button type="button" class="mt-2 button button-compact" onclick={() => (files = [])}>
    Clear from outside
  </button>
</div>
