<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Field, RadioGroup } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof RadioGroup>;

  const { ...rest }: Props = $props();
</script>

<Field aria-label="Size">
  <RadioGroup {...rest} />
</Field>
