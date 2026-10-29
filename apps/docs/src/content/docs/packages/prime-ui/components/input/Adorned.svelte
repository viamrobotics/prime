<script lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import { Icon, Input } from "@viamrobotics/prime-ui";

  let query = $state("");
</script>

<div class="not-content">
  <Input.Group class="w-64">
    <Icon icon={mdiMagnify} />
    <Input bind:value={query} placeholder="Search parts" aria-label="Search parts" />
    <span class="text-sm text-subtle-2">ms</span>
  </Input.Group>
</div>
