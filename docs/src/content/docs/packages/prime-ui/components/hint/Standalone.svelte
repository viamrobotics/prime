<script lang="ts">
  import { Hint, Input, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex max-w-xs flex-col gap-1">
  <Label for="standalone-name">Machine name</Label>
  <Input id="standalone-name" aria-describedby="standalone-name-hint" placeholder="rover-1" />
  <Hint id="standalone-name-hint">Lowercase letters, numbers, and dashes.</Hint>
</div>
