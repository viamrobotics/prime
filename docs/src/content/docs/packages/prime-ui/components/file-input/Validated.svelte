<script lang="ts">
  import { Field, FileInput, Hint, Label } from "@viamrobotics/prime-ui";

  const MAX_BYTES = 1024 * 1024;

  let files = $state<File[]>([]);

  const tooLarge = $derived(files.some((file) => file.size > MAX_BYTES));
</script>

<Field label="Image" state={tooLarge ? "error" : "none"} class="not-content flex max-w-xs flex-col gap-1">
  <Label />
  <FileInput accept="image/*" bind:value={files} />
  <Hint>{tooLarge ? "Choose an image under 1 MB." : "Up to 1 MB."}</Hint>
</Field>
