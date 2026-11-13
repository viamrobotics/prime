<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  const MAX_LENGTH = 60;

  let value = $state("SELECT * FROM robots;");
  let refused = $state(0);
</script>

<div class="not-content flex w-full flex-col gap-3">
  <CodeEditor
    aria-label="SQL limited to 60 characters"
    class="max-h-48 w-full overflow-auto"
    language="sql"
    bind:value={
      () => value,
      (next) => {
        if (next.length > MAX_LENGTH) {
          refused += 1;
          return;
        }
        value = next.toUpperCase();
      }
    }
  />
  <p class="text-sm text-subtle-2">length: <code>{value.length}</code> of {MAX_LENGTH}</p>
  <p class="text-sm text-subtle-2">refused edits: <code>{refused}</code></p>
</div>
