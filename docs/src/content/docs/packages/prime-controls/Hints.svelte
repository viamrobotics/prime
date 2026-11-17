<script lang="ts">
  import {
    NumberField,
    Panel,
    Point,
    Select,
    Slider,
    ToggleButtons,
  } from "@viamrobotics/prime-controls";

  const spaces = [
    { value: "local", label: "Local" },
    { value: "world", label: "World" },
  ];
  const modes = [
    { value: "move", label: "Move" },
    { value: "rotate", label: "Rotate" },
  ];

  let power = $state(0.5);
  let position = $state({ x: 0, y: 1 });
  let opacity = $state(1);
  let space = $state("local");
  let mode = $state("move");
</script>

<div class="not-content w-72">
  <Panel title="Motor">
    <NumberField
      label="Power"
      hint="Fraction of full power, from -1 to 1"
      min={-1}
      max={1}
      step={0.1}
      bind:value={power}
    />
    <Point
      label="Target"
      hint="Where the motor should stop, in millimetres"
      bind:value={position}
    />
    <Slider
      label="Opacity"
      hint="How much of the scene shows through"
      min={0}
      max={1}
      step={0.01}
      bind:value={opacity}
    />
    <ToggleButtons
      label="Space"
      hint="The frame the target is measured in"
      items={spaces}
      bind:value={space}
    />
    <Select
      aria-label="Mode"
      hint="What dragging the gizmo does"
      items={modes}
      bind:value={mode}
    />
  </Panel>
</div>
