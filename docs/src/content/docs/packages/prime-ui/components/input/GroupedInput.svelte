<script lang="ts">
  import { Field, Input, type FieldState } from "@viamrobotics/prime-ui";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "value"> {
    state?: FieldState;
  }

  const { state, ...rest }: Props = $props();
</script>

<Input.Group class="w-64">
  <Input {state} {...rest} />
  <Field.StateIcon {state} />
</Input.Group>
