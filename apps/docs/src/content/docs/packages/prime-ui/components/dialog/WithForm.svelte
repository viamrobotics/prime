<script lang="ts">
  import { Dialog, Field, Input, Label } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let name = $state("");
</script>

<div class="not-content">
  <Dialog bind:open>
    <Dialog.Trigger class="button">Rename</Dialog.Trigger>
    <Dialog.Content class="w-full max-w-md gap-4">
      <div class="flex items-start justify-between gap-4">
        <Dialog.Title>Rename machine</Dialog.Title>
        <Dialog.Close />
      </div>

      <div class="flex min-h-0 flex-col gap-3 overflow-y-auto">
        <Dialog.Description>The new name shows everywhere the machine is listed.</Dialog.Description>
        <Field class="flex flex-col gap-1">
          <Label>Name</Label>
          <Input bind:value={name} />
        </Field>
      </div>

      <div class="flex justify-end gap-2">
        <Dialog.Close class="button" aria-label="Cancel">Cancel</Dialog.Close>
        <button class="button" type="button" onclick={() => (open = false)}>Save</button>
      </div>
    </Dialog.Content>
  </Dialog>
</div>
