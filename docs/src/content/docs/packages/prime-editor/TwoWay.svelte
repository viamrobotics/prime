<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  let value = $state(`{\n  "speed": 5\n}\n`);
</script>

<div class="not-content flex w-full flex-col gap-3">
  <CodeEditor
    aria-label="JSON config"
    class="max-h-48 w-full overflow-auto"
    language="json"
    bind:value
  />
  <p class="text-sm text-subtle-2">length: <code>{value.length}</code></p>
  <button type="button" class="button self-start" onclick={() => (value = "{}\n")}>
    Reset from outside
  </button>
</div>
