<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { ToggleButtons } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof ToggleButtons>;

  const { ...rest }: Props = $props();
</script>

<ToggleButtons aria-label="Units" {...rest} />
