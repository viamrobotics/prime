<script lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import { Field, Icon, Input } from "@viamrobotics/prime-ui";

  let query = $state("");
</script>

<Field aria-label="Search parts" class="not-content">
  <Input.Group class="w-64">
    <Icon icon={mdiMagnify} />
    <Input bind:value={query} placeholder="Search parts" />
    <span class="text-sm text-subtle-2">ms</span>
  </Input.Group>
</Field>
