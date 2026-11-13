<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Field, Input } from "@viamrobotics/prime-ui";

  type Props = Omit<ComponentProps<typeof Input>, "value">;

  const { state, ...rest }: Props = $props();
</script>

<Input.Group class="w-64">
  <Input {state} {...rest} />
  <Field.StateIcon {state} />
</Input.Group>
