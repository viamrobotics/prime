<script lang="ts">
  import { mdiContentCopy } from "@mdi/js";
  import { Checkbox, Field, Icon, Label, Tooltip } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let isMuted = $state(false);
</script>

<div class="not-content flex flex-col gap-3">
  <Tooltip
    bind:open={
      () => open,
      (next) => {
        if (!next || !isMuted) open = next;
      }
    }
  >
    <Tooltip.Trigger class="inline-flex">
      <button type="button" class="icon-button" aria-label="Copy">
        <Icon icon={mdiContentCopy} />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Content>Copy to clipboard</Tooltip.Content>
  </Tooltip>

  <Field class="flex items-center gap-2">
    <Checkbox bind:checked={isMuted} />
    <Label>Mute this tooltip</Label>
  </Field>

  <p class="text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
