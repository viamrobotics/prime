<script lang="ts">
  import { Field, Input, NumberInput, type FieldState } from "@viamrobotics/prime-ui";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "value" | "type"> {
    value?: number;
    state?: FieldState;
  }

  const { state, ...rest }: Props = $props();
</script>

<Input.Group class="w-40">
  <NumberInput {state} {...rest} />
  <Field.StateIcon {state} />
</Input.Group>
