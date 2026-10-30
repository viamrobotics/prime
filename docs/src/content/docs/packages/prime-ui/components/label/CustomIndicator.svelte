<script lang="ts">
  import { Field, Input, Label } from "@viamrobotics/prime-ui";
</script>

<Field class="not-content flex max-w-xs flex-col gap-1" required>
  <Label>
    Email
    {#snippet indicator()}
      <span class="text-xs text-subtle-2">(required)</span>
    {/snippet}
  </Label>
  <Input type="email" placeholder="you@viam.com" />
</Field>
