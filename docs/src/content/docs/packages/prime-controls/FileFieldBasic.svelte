<script lang="ts">
  import { FileField } from "@viamrobotics/prime-controls";

  const SUPPORTED = [".wav", ".mp3"];

  let audio = $state<File[]>([]);
  let images = $state<File[]>([]);

  const unsupported = $derived(
    audio.some((file) => !SUPPORTED.some((extension) => file.name.toLowerCase().endsWith(extension))),
  );
</script>

<div class="not-content flex w-80 flex-col gap-3">
  <FileField
    label="Audio file"
    hint="A WAV or MP3 recording"
    accept={SUPPORTED.join(",")}
    state={unsupported ? "error" : "none"}
    bind:value={audio}
  />
  <FileField label="Images" accept="image/*" multiple bind:value={images}>Choose images</FileField>
  <FileField label="Firmware" disabled />
  <p class="text-sm">
    Audio: {JSON.stringify(audio.map((file) => file.name))}, images: {images.length}
  </p>
</div>
