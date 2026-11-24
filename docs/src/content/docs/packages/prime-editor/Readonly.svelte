<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";
  import { Checkbox, Field, Label } from "@viamrobotics/prime-ui";

  let readonly = $state(true);
</script>

<div class="not-content flex w-full flex-col gap-3">
  <Field class="flex items-center gap-2" label="Readonly">
    <Checkbox bind:checked={readonly} />
    <Label />
  </Field>
  <CodeEditor
    aria-label="Python snippet"
    class="max-h-48 w-full overflow-auto"
    language="python"
    value={`print("select this text and copy it")\n`}
    {readonly}
  />
</div>
