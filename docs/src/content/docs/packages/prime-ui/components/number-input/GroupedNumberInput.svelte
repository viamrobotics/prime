<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Field, Input, NumberInput } from "@viamrobotics/prime-ui";

  type Props = ComponentProps<typeof NumberInput>;

  const { state, ...rest }: Props = $props();
</script>

<Input.Group class="w-40">
  <NumberInput {state} {...rest} />
  <Field.StateIcon {state} />
</Input.Group>
