<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { RadioGroup } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof RadioGroup>;

  const { ...rest }: Props = $props();
</script>

<RadioGroup aria-label="Size" {...rest} />
