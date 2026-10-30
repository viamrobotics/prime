<script lang="ts">
  import { Dialog } from "@viamrobotics/prime-ui";

  const widths = ["max-w-[25rem]", "max-w-[37.5rem]", "max-w-[50rem]", "max-w-[60rem]"];
</script>

<div class="not-content flex flex-col gap-2">
  <p class="text-xs font-medium text-subtle-2 uppercase">Widths</p>
  <div class="flex flex-wrap gap-2">
    {#each widths as width (width)}
      <Dialog>
        <Dialog.Trigger class="button">{width}</Dialog.Trigger>
        <Dialog.Content class="w-full {width}">
          <div class="flex items-start justify-between gap-4">
            <Dialog.Title>Width</Dialog.Title>
            <Dialog.Close />
          </div>
          <Dialog.Description class="mt-1"><code>{width}</code></Dialog.Description>
        </Dialog.Content>
      </Dialog>
    {/each}
  </div>
</div>
