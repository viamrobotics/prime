<script lang="ts">
  import { Input, RadioGroup } from "@viamrobotics/prime-ui";

  let contact = $state("email");
</script>

<RadioGroup bind:value={contact} class="not-content gap-3" aria-label="Contact method">
  <RadioGroup.Item value="email" description="We send a sign-in code.">
    {#snippet details()}
      <Input type="email" aria-label="Email address" placeholder="you@example.com" />
    {/snippet}
    Email
  </RadioGroup.Item>
  <RadioGroup.Item value="sms" description="Standard rates apply.">
    {#snippet details()}
      <Input type="tel" aria-label="Phone number" placeholder="555 0100" />
    {/snippet}
    Text message
  </RadioGroup.Item>
  <RadioGroup.Item value="none">No contact</RadioGroup.Item>
</RadioGroup>
