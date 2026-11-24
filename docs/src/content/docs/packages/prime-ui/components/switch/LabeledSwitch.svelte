<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Field, Switch } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof Switch>;

  const { ...rest }: Props = $props();
</script>

<Field label="Notifications">
  <Switch {...rest} />
</Field>
