<script lang="ts">
  import { Takeover } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Takeover bind:open>
    <Takeover.Trigger class="button">Open takeover</Takeover.Trigger>
    <Takeover.Content>
      <Takeover.Header>
        <Takeover.Title>Setup wizard</Takeover.Title>
        <Takeover.Close />
      </Takeover.Header>
      <div class="p-4">Close it with the button or Escape.</div>
    </Takeover.Content>
  </Takeover>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
