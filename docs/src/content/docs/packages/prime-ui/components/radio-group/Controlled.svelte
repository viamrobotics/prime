<script lang="ts">
  import { Field, Hint, Label, RadioGroup } from "@viamrobotics/prime-ui";

  let plan = $state("free");
</script>

<div class="not-content">
  <Field class="flex flex-col gap-1">
    <Label>Plan</Label>
    <RadioGroup
      name="plan"
      bind:value={
        () => plan,
        (next) => {
          if (next !== "enterprise") plan = next;
        }
      }
    >
      <RadioGroup.Item value="free">Free</RadioGroup.Item>
      <RadioGroup.Item value="team">Team</RadioGroup.Item>
      <RadioGroup.Item value="enterprise">Enterprise</RadioGroup.Item>
    </RadioGroup>
    <Hint>Enterprise is declined by the setter, so picking it changes nothing.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{plan}</code></p>
</div>
