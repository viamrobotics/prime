<script lang="ts">
  import { Collapsible } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let isLocked = $state(true);
</script>

<div class="not-content flex flex-col items-start gap-3">
  <label class="flex items-center gap-2 text-sm">
    <input type="checkbox" bind:checked={isLocked} />
    Keep closed
  </label>

  <Collapsible
    class="w-full"
    bind:open={
      () => open,
      (next) => {
        if (!isLocked) open = next;
      }
    }
  >
    <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
    <Collapsible.Content class="pt-2 text-sm">
      The setter declines every change while the box is checked.
    </Collapsible.Content>
  </Collapsible>
</div>
