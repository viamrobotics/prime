<script lang="ts">
  import { Collapsible } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Collapsible>
    <Collapsible.Trigger class="font-semibold">
      Advanced
      {#snippet indicator({ open })}
        <span class="text-sm text-subtle-2">{open ? "Hide" : "Show"}</span>
      {/snippet}
    </Collapsible.Trigger>
    <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
  </Collapsible>
</div>
