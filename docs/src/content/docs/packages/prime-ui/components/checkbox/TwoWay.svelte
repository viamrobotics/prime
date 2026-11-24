<script lang="ts">
  import { Checkbox, Field, Label } from "@viamrobotics/prime-ui";

  let checked = $state(false);
</script>

<div class="not-content">
  <Field label="Email me about updates" class="flex items-center gap-2">
    <Checkbox bind:checked />
    <Label />
  </Field>

  <p class="mt-3 text-sm text-subtle-2">checked: <code>{checked}</code></p>
</div>
