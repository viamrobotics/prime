<script lang="ts">
  import { Field, Label, Switch } from "@viamrobotics/prime-ui";

  let enabled = $state(false);
</script>

<div class="not-content">
  <Field class="flex items-center gap-2">
    <Switch bind:checked={enabled} />
    <Label>Notifications</Label>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">checked: <code>{enabled}</code></p>
</div>
