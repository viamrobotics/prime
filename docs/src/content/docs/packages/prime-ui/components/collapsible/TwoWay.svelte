<script lang="ts">
  import { Collapsible } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Collapsible bind:open>
    <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
    <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
  </Collapsible>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
