<script lang="ts">
  import { Field, Label, Switch } from "@viamrobotics/prime-ui";

  let armed = $state(false);
</script>

<div class="not-content">
  <Field class="flex items-center gap-2">
    <Switch
      bind:checked={
        () => armed,
        (next) => {
          if (next) armed = true;
        }
      }
    />
    <Label>Arm the machine (cannot be undone)</Label>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">armed: <code>{armed}</code></p>
</div>
