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
    <p class="text-xs font-medium text-subtle-2 uppercase">Default</p>
    <ToggleButtons value="mm" {items} aria-label="Units" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <ToggleButtons value="mm" {items} disabled aria-label="Units" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">One disabled item</p>
    <ToggleButtons value="mm" items={someDisabled} aria-label="Units" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Error</p>
    <Field state="error" class="flex flex-col gap-1">
      <Label>Units</Label>
      <ToggleButtons value="mm" {items} />
      <Hint>Pick the unit the device reports in.</Hint>
    </Field>
  </div>
</div>
