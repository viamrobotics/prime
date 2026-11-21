<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Switch } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof Switch>;

  const { ...rest }: Props = $props();
</script>

<Switch aria-label="Notifications" {...rest} />
