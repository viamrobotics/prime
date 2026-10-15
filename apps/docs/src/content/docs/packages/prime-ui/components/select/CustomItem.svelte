<script lang="ts">
  import { Icon, Select } from "@viamrobotics/prime-ui";

  const machines = [
    { value: "rover-1", label: "rover-1", status: "online" },
    { value: "rover-2", label: "rover-2", status: "offline" },
    { value: "arm-1", label: "arm-1", status: "online" },
  ];

  let machine = $state("rover-1");
</script>

<div class="not-content max-w-xs">
  <Select items={machines} bind:value={machine}>
    <Select.Trigger aria-label="Machine">
      <Select.Value placeholder="Pick a machine" />
      {#snippet indicator()}
        <Icon icon="unfold-more-vertical" size="base" class="shrink-0 text-subtle-2" />
      {/snippet}
    </Select.Trigger>
    <Select.Portal>
      <Select.Content>
        <Select.Viewport>
          {#each machines as item (item.value)}
            <Select.Item value={item.value} label={item.label}>
              {#snippet children({ selected })}
                <span class="flex items-center gap-2">
                  <span
                    class={[
                      "size-2 rounded-full",
                      item.status === "online" ? "bg-success-dark" : "bg-danger-dark",
                    ]}
                  ></span>
                  <span class={{ "font-medium": selected }}>{item.label}</span>
                </span>
                <span class="text-xs text-subtle-2">{item.status}</span>
              {/snippet}
            </Select.Item>
          {/each}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select>
</div>
