<script lang="ts">
  import { Takeover } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-2">
  <p class="text-xs font-medium text-subtle-2 uppercase">Custom close label</p>
  <div>
    <Takeover>
      <Takeover.Trigger class="button">Open takeover</Takeover.Trigger>
      <Takeover.Content>
        <Takeover.Header>
          <Takeover.Title>Review</Takeover.Title>
          <Takeover.Close class="button">Done</Takeover.Close>
        </Takeover.Header>
        <div class="p-4">Children replace the close icon.</div>
      </Takeover.Content>
    </Takeover>
  </div>
</div>
