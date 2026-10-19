<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  let name = $state("Rover 1");
</script>

<Field class="not-content flex max-w-xs flex-col gap-1" state="error">
  <Label>Machine name</Label>
  <Input.Group>
    <Input bind:value={name} />
    <Field.StateIcon />
  </Input.Group>
  <Hint>Spaces and capitals are not allowed.</Hint>
</Field>
