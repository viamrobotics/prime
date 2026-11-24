<script lang="ts">
  import { Field, Hint, Label, ToggleButtons } from "@viamrobotics/prime-ui";

  const items = [
    { value: "mm", label: "mm" },
    { value: "cm", label: "cm" },
    { value: "in", label: "in" },
  ];
  const someDisabled = [
    { value: "mm", label: "mm" },
    { value: "cm", label: "cm", disabled: true },
    { value: "in", label: "in" },
  ];
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Default</h4>
    <Field aria-label="Units">
      <ToggleButtons value="mm" {items} />
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled</h4>
    <Field aria-label="Units" disabled>
      <ToggleButtons value="mm" {items} />
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">One disabled item</h4>
    <Field aria-label="Units">
      <ToggleButtons value="mm" items={someDisabled} />
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <Field label="Units" state="error" class="flex flex-col gap-1">
      <Label />
      <ToggleButtons value="mm" {items} />
      <Hint>Pick the unit the device reports in.</Hint>
    </Field>
  </div>
</div>
