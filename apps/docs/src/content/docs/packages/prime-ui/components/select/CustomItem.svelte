<script lang="ts">
  import { mdiUnfoldMoreVertical } from "@mdi/js";
  import { Icon, Select } from "@viamrobotics/prime-ui";

  const machines = [
    { value: "rover-1", label: "Rover 1" },
    { value: "rover-2", label: "Rover 2", disabled: true },
    { value: "arm-1", label: "Arm 1" },
  ];

  let machine = $state("rover-1");
</script>

<div class="not-content max-w-xs">
  <Select items={machines} bind:value={machine}>
    <Select.Trigger class="w-64" aria-label="Machine">
      <Select.Value placeholder="Pick a machine" />
      {#snippet indicator()}
        <Icon icon={mdiUnfoldMoreVertical} size="base" class="shrink-0 text-subtle-2" />
      {/snippet}
    </Select.Trigger>
    <Select.Portal>
      <Select.Content>
        <Select.Viewport>
          <Select.Items>
            {#snippet children({ item, selected })}
              <span class={{ "font-medium": selected }}>{item.label}</span>
              <code class="text-xs text-subtle-2">{item.value}</code>
            {/snippet}
          </Select.Items>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select>
</div>
