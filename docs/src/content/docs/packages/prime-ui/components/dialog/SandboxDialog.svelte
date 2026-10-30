<script lang="ts">
  import { Dialog } from "@viamrobotics/prime-ui";

  interface Props {
    width?: string;
  }

  const { width = "max-w-md" }: Props = $props();
</script>

<Dialog>
  <Dialog.Trigger class="button">Open dialog</Dialog.Trigger>
  <Dialog.Content class="w-full {width}">
    <div class="flex items-start justify-between gap-4">
      <Dialog.Title>Rename sensor</Dialog.Title>
      <Dialog.Close />
    </div>
    <Dialog.Description class="mt-1">Pick a name that is easy to find later.</Dialog.Description>
  </Dialog.Content>
</Dialog>
