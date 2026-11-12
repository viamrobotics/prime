<script lang="ts">
  import { Takeover } from "@viamrobotics/prime-ui";

  const rows = Array.from({ length: 40 }, (_, index) => `Row ${index + 1}`);
</script>

<div class="not-content">
  <Takeover>
    <Takeover.Trigger class="button">Open takeover</Takeover.Trigger>
    <Takeover.Content>
      <Takeover.Header>
        <Takeover.Title>Logs</Takeover.Title>
        <Takeover.Close />
      </Takeover.Header>
      <div class="min-h-0 flex-1 overflow-y-auto p-4">
        {#each rows as row (row)}
          <p class="py-1">{row}</p>
        {/each}
      </div>
    </Takeover.Content>
  </Takeover>
</div>
