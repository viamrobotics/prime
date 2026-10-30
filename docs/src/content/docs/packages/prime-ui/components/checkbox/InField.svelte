<script lang="ts">
  import { Checkbox, Field, Hint, Label } from "@viamrobotics/prime-ui";

  let checked = $state(false);
</script>

<Field class="not-content grid grid-cols-[auto_1fr] items-center gap-x-2" required>
  <Checkbox bind:checked name="terms" value="accepted" />
  <Label>Accept the terms</Label>
  <Hint class="col-start-2">Required before you can continue.</Hint>
</Field>
