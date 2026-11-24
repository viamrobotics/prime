<script lang="ts">
  import { Field, FileInput, Hint, Label } from "@viamrobotics/prime-ui";

  let files = $state<File[]>([]);
</script>

<Field label="Audio file" class="not-content flex max-w-xs flex-col gap-1">
  <Label />
  <FileInput accept=".wav,.mp3" bind:value={files} />
  <Hint>A WAV or MP3 recording.</Hint>
</Field>
