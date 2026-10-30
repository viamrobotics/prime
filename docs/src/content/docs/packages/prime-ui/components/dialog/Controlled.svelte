<script lang="ts">
  import { Dialog } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let hasAcknowledged = $state(false);
</script>

<div class="not-content">
  <Dialog
    bind:open={
      () => open,
      (next) => {
        if (next || hasAcknowledged) open = next;
      }
    }
  >
    <Dialog.Trigger class="button">Open dialog</Dialog.Trigger>
    <Dialog.Content class="w-full max-w-md">
      <Dialog.Title>Terms of service</Dialog.Title>
      <Dialog.Description class="mt-1">
        The setter declines every close until the box is checked, so Escape and the overlay do nothing.
      </Dialog.Description>
      <label class="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" bind:checked={hasAcknowledged} />
        I accept
      </label>
      <div class="mt-4 flex justify-end">
        <button class="button" type="button" onclick={() => (open = false)} disabled={!hasAcknowledged}>
          Continue
        </button>
      </div>
    </Dialog.Content>
  </Dialog>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
