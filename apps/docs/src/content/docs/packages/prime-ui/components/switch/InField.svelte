<script lang="ts">
  import { Field, Hint, Label, Switch } from "@viamrobotics/prime-ui";

  let checked = $state(true);
</script>

<Field class="not-content grid grid-cols-[auto_1fr] items-center gap-x-2">
  <Switch bind:checked name="telemetry" value="on" />
  <Label>Send telemetry</Label>
  <Hint class="col-start-2">Helps us improve the platform.</Hint>
</Field>
