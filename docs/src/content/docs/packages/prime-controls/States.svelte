<script lang="ts">
  import {
    FileField,
    NumberField,
    Panel,
    Point,
    Select,
    Slider,
    TextField,
    ToggleButtons,
  } from "@viamrobotics/prime-controls";

  interface StateCard {
    title: string;
    disabled?: boolean;
    readonly?: boolean;
    state?: "warn" | "error";
  }

  const CARDS: StateCard[] = [
    { title: "Default" },
    { title: "Disabled", disabled: true },
    { title: "Readonly", readonly: true },
    { title: "Warning", state: "warn" },
    { title: "Error", state: "error" },
  ];

  const SPACES = [
    { value: "local", label: "Local" },
    { value: "world", label: "World" },
  ];

  const MODES = [
    { value: "orbit", label: "Orbit" },
    { value: "fly", label: "Fly" },
  ];

  const values = $state(
    CARDS.map(() => ({
      speed: 12,
      length: 120,
      name: "arm-1",
      files: [] as File[],
      position: { x: 0, y: 1 },
      opacity: 40,
      space: "local",
      mode: "orbit",
    })),
  );
</script>

<div class="not-content grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each CARDS as { title, disabled, readonly, state }, index (title)}
    <Panel {title}>
      <NumberField label="Speed" {disabled} {readonly} {state} bind:value={values[index].speed} />
      <NumberField
        label="Length"
        suffix="mm"
        {disabled}
        {readonly}
        {state}
        bind:value={values[index].length}
      />
      <TextField label="Name" {disabled} {readonly} {state} bind:value={values[index].name} />
      {#if !readonly}
        <FileField label="Model" {disabled} {state} bind:value={values[index].files} />
        <Point label="Position" {disabled} {state} bind:value={values[index].position} />
        <Slider label="Opacity" suffix="%" {disabled} {state} bind:value={values[index].opacity} />
        <ToggleButtons label="Space" items={SPACES} {disabled} bind:value={values[index].space} />
        <Select aria-label="Mode" items={MODES} {disabled} bind:value={values[index].mode} />
      {/if}
    </Panel>
  {/each}
</div>
