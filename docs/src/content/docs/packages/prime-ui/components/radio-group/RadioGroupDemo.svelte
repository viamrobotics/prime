<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { RadioGroup } from "@viamrobotics/prime-ui";

  import LabeledRadioGroup from "./LabeledRadioGroup.svelte";
</script>

<Sandbox
  name="RadioGroup"
  component={LabeledRadioGroup}
  controls={{
    value: { kind: "select", label: "Value", default: "md", options: ["sm", "md", "lg"] },
    orientation: {
      kind: "select",
      label: "Orientation",
      default: "vertical",
      options: ["vertical", "horizontal"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
>
  <RadioGroup.Item value="sm">Small</RadioGroup.Item>
  <RadioGroup.Item value="md">Medium</RadioGroup.Item>
  <RadioGroup.Item value="lg">Large</RadioGroup.Item>
</Sandbox>
