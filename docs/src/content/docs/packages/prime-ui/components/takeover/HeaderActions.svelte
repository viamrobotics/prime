<script lang="ts">
  import { Takeover } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Takeover>
    <Takeover.Trigger class="button">Open takeover</Takeover.Trigger>
    <Takeover.Content>
      <Takeover.Header>
        <Takeover.Title>Edit machine</Takeover.Title>
        <div class="flex items-center gap-2">
          <button type="button" class="button">Save</button>
          <Takeover.Close />
        </div>
      </Takeover.Header>
      <div class="p-4">Actions sit beside the close button.</div>
    </Takeover.Content>
  </Takeover>
</div>
