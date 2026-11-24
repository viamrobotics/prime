<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Checkbox, Field } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof Checkbox>;

  const { ...rest }: Props = $props();
</script>

<Field aria-label="Accept the terms">
  <Checkbox {...rest} />
</Field>
