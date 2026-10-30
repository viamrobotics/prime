<script lang="ts">
  import { Dialog } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Dialog bind:open>
    <Dialog.Trigger class="button">Open dialog</Dialog.Trigger>
    <Dialog.Content class="w-full max-w-md">
      <div class="flex items-start justify-between gap-4">
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Close />
      </div>
      <Dialog.Description class="mt-1">You will get an email when a machine goes offline.</Dialog.Description>
    </Dialog.Content>
  </Dialog>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
