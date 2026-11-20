<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { FileInput } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof FileInput>;

  const { ...rest }: Props = $props();
</script>

<FileInput aria-label="Upload" class="w-72" {...rest} />
