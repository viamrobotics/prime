<script lang="ts">
  import { Input, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex max-w-xs flex-col gap-1">
  <Label for="standalone-email" required>Email</Label>
  <Input id="standalone-email" type="email" required placeholder="you@viam.com" />
</div>
