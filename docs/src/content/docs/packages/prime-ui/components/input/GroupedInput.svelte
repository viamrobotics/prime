<script lang="ts">
  import { Field, Input } from "@viamrobotics/prime-ui";
  import type { ComponentProps } from "svelte";

  type Props = Omit<ComponentProps<typeof Input>, "value">;

  const { state, ...rest }: Props = $props();
</script>

<Input.Group class="w-64">
  <Input {state} {...rest} />
  <Field.StateIcon {state} />
</Input.Group>
