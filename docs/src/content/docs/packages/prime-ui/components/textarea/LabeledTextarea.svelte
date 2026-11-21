<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Textarea } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof Textarea>;

  const { ...rest }: Props = $props();
</script>

<Textarea aria-label="Description" {...rest} />
