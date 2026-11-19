<script lang="ts">
  import { Field, FileInput, Hint, Label } from "@viamrobotics/prime-ui";

  const recording = [new File([], "greeting.wav")];
  const notes = [new File([], "notes.txt")];
</script>

<div class="not-content grid max-w-xs gap-3">
  <FileInput aria-label="Default" />
  <FileInput aria-label="Chosen" value={recording} />
  <FileInput aria-label="Disabled" disabled />
  <FileInput aria-label="Disabled with a file" disabled value={recording} />
  <FileInput aria-label="Custom prompt">Browse</FileInput>
  <Field state="warn" class="flex flex-col gap-1">
    <Label>Warn</Label>
    <FileInput value={recording} />
    <Hint>This recording is longer than a minute.</Hint>
  </Field>
  <Field state="error" class="flex flex-col gap-1">
    <Label>Error</Label>
    <FileInput value={notes} />
    <Hint>Unsupported audio format.</Hint>
  </Field>
</div>
