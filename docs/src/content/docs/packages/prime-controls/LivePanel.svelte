<script lang="ts">
  import type { PointValue } from "@viamrobotics/prime-controls";

  import { Folder, NumberField, Panel, Point, Select, Slider, Tabs } from "@viamrobotics/prime-controls";

  let speed = $state(5);
  let position = $state<PointValue>({ x: 0, y: 1, z: 2 });
  let opacity = $state(0.5);
  let intensity = $state(0.8);
  let exposure = $state(1);
  let mode = $state("move");
  let moveStep = $state(0.5);
  let rotateStep = $state(15);
  let projection = $state("perspective");
  const projections = [
    { value: "perspective", label: "Perspective" },
    { value: "orthographic", label: "Orthographic" },
  ];
</script>

<div class="not-content flex flex-wrap items-start gap-6">
  <Panel title="Scene" class="w-80">
    <NumberField label="Speed" bind:value={speed} />
    <Point label="Position" step={0.1} bind:value={position} />
    <Select items={projections} bind:value={projection} aria-label="Projection" />
    <Slider label="Opacity" min={0} max={1} step={0.01} bind:value={opacity} />
    <Folder title="Lighting">
      <Slider label="Intensity" min={0} max={1} step={0.01} bind:value={intensity} />
      <NumberField label="Exposure" step={0.1} bind:value={exposure} />
    </Folder>
    <Tabs bind:value={mode}>
      <Tabs.List aria-label="Mode">
        <Tabs.Trigger value="move">Move</Tabs.Trigger>
        <Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="move">
        <NumberField label="Step" step={0.1} bind:value={moveStep} />
      </Tabs.Content>
      <Tabs.Content value="rotate">
        <NumberField label="Angle" bind:value={rotateStep} />
      </Tabs.Content>
    </Tabs>
  </Panel>
  <ul class="m-0 list-none p-0 text-sm text-subtle-2">
    <li>speed: <code>{speed}</code></li>
    <li>position: <code>{JSON.stringify(position)}</code></li>
    <li>opacity: <code>{opacity}</code></li>
    <li>intensity: <code>{intensity}</code></li>
    <li>exposure: <code>{exposure}</code></li>
    <li>projection: <code>{projection}</code></li>
    <li>mode: <code>{mode}</code></li>
    <li>step: <code>{moveStep}</code></li>
    <li>angle: <code>{rotateStep}</code></li>
  </ul>
</div>
