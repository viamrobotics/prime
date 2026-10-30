<script lang="ts">
  import { Collapsible } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Closed</p>
    <Collapsible>
      <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
      <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
    </Collapsible>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Open</p>
    <Collapsible open>
      <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
      <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
    </Collapsible>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <Collapsible disabled>
      <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
      <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
    </Collapsible>
  </div>
</div>
