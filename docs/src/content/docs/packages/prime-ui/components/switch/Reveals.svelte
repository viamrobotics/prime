<script lang="ts">
  import { Field, Input, Label, Switch } from "@viamrobotics/prime-ui";

  let useProxy = $state(false);
</script>

<div class="not-content flex max-w-xs flex-col gap-3">
  <Field label="Use a proxy" class="flex items-center gap-2">
    <Switch bind:checked={useProxy} />
    <Label />
  </Field>

  {#if useProxy}
    <Field label="Proxy address" class="flex flex-col gap-1">
      <Label />
      <Input placeholder="proxy.example.com:8080" />
    </Field>
  {/if}
</div>
