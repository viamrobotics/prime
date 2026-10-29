<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";
  import type { ComponentProps } from "svelte";

  type Placement = Pick<ComponentProps<typeof Popover.Content>, "side" | "align">;

  const { side, align }: Placement = $props();
</script>

<Popover>
  <Popover.Trigger class="button">Open</Popover.Trigger>
  <Popover.Content aria-label="Details" {side} {align}>
    <div class="flex items-start gap-4">
      <p class="text-sm">Anchored to its trigger. The page stays interactive.</p>
      <Popover.Close />
    </div>
  </Popover.Content>
</Popover>
