<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Checkbox } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof Checkbox>;

  const { ...rest }: Props = $props();
</script>

<Checkbox aria-label="Accept the terms" {...rest} />
