<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  const states = [
    { state: "none", hint: "Lowercase letters, numbers, and dashes." },
    { state: "info", hint: "Names can be changed later." },
    { state: "warn", hint: "This name is similar to an existing robot." },
    { state: "error", hint: "That name is already taken." },
  ] as const;
</script>

<div class="not-content grid max-w-md gap-4">
  {#each states as { state, hint } (state)}
    <Field label="Robot name: {state}" {state} class="flex flex-col gap-1">
      <Label />
      <Input.Group>
        <Input value="rover-1" />
        <Field.StateIcon />
      </Input.Group>
      <Hint>{hint}</Hint>
    </Field>
  {/each}
  <Field label="Robot name: disabled" disabled class="flex flex-col gap-1">
    <Label />
    <Input value="rover-1" />
    <Hint>Unavailable while the part is offline.</Hint>
  </Field>
</div>
