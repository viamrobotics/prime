<script lang="ts">
  import { Field, FileInput, Hint, Label } from "@viamrobotics/prime-ui";

  const recording = [new File([], "greeting.wav")];
  const notes = [new File([], "notes.txt")];
</script>

<div class="not-content grid max-w-xs gap-3">
  <Field aria-label="Default" class="grid">
    <FileInput />
  </Field>
  <Field aria-label="Chosen" class="grid">
    <FileInput value={recording} />
  </Field>
  <Field aria-label="Disabled" disabled class="grid">
    <FileInput />
  </Field>
  <Field aria-label="Disabled with a file" disabled class="grid">
    <FileInput value={recording} />
  </Field>
  <Field aria-label="Custom prompt" class="grid">
    <FileInput>Browse</FileInput>
  </Field>
  <Field label="Warn" state="warn" class="flex flex-col gap-1">
    <Label />
    <FileInput value={recording} />
    <Hint>This recording is longer than a minute.</Hint>
  </Field>
  <Field label="Error" state="error" class="flex flex-col gap-1">
    <Label />
    <FileInput value={notes} />
    <Hint>Unsupported audio format.</Hint>
  </Field>
</div>
