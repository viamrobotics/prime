<script lang="ts">
  import { Field, Input, RadioGroup } from "@viamrobotics/prime-ui";

  let contact = $state("email");
</script>

<Field aria-label="Contact method">
  <RadioGroup bind:value={contact} class="not-content gap-3">
    <RadioGroup.Item value="email" description="We send a sign-in code.">
      {#snippet details()}
        <Field aria-label="Email address">
          <Input type="email" placeholder="you@example.com" />
        </Field>
      {/snippet}
      Email
    </RadioGroup.Item>
    <RadioGroup.Item value="sms" description="Standard rates apply.">
      {#snippet details()}
        <Field aria-label="Phone number">
          <Input type="tel" placeholder="555 0100" />
        </Field>
      {/snippet}
      Text message
    </RadioGroup.Item>
    <RadioGroup.Item value="none">No contact</RadioGroup.Item>
  </RadioGroup>
</Field>
