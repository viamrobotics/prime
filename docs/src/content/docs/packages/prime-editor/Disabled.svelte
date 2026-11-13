<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";
  import { Checkbox, Field, Label } from "@viamrobotics/prime-ui";

  let disabled = $state(true);
  let value = $state("");
</script>

<div class="not-content flex w-full flex-col gap-3">
  <Field class="flex items-center gap-2">
    <Checkbox bind:checked={disabled} />
    <Label>Disabled</Label>
  </Field>
  <CodeEditor
    aria-label="Query"
    class="max-h-64 w-full overflow-auto"
    language="sql"
    placeholder="SELECT * FROM readings"
    {disabled}
    bind:value
  />
</div>
