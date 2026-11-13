<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  let value = $state(`{\n  "speed": 5,\n}\n`);

  const error = $derived.by(() => {
    try {
      JSON.parse(value);
      return undefined;
    } catch (cause) {
      return cause instanceof Error ? cause.message : "The config is not valid JSON.";
    }
  });
</script>

<div class="not-content flex w-full flex-col gap-1">
  <span id="config-label" class="text-sm font-medium">Config</span>
  <CodeEditor
    aria-labelledby="config-label"
    aria-describedby="config-error"
    aria-invalid={error !== undefined}
    class="max-h-64 w-full overflow-auto"
    language="json"
    bind:value
  />
  <p id="config-error" aria-live="polite" class="min-h-4 text-xs text-danger-dark">{error}</p>
</div>
