<script lang="ts">
  import { Field, Input, Label, Switch } from "@viamrobotics/prime-ui";

  let useProxy = $state(false);
</script>

<div class="not-content flex max-w-xs flex-col gap-3">
  <Field class="flex items-center gap-2">
    <Switch bind:checked={useProxy} />
    <Label>Use a proxy</Label>
  </Field>

  {#if useProxy}
    <Field class="flex flex-col gap-1">
      <Label>Proxy address</Label>
      <Input placeholder="proxy.example.com:8080" />
    </Field>
  {/if}
</div>
