<script lang="ts">
  import { Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large", disabled: true },
  ];
</script>

{#snippet options()}
  <Select.Portal>
    <Select.Content>
      <Select.Viewport>
        {#each sizes as item (item.value)}
          <Select.Item value={item.value} label={item.label} disabled={item.disabled} />
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Placeholder, with a disabled item</p>
    <div class="max-w-xs">
      <Select items={sizes}>
        <Select.Trigger aria-label="Size">
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        {@render options()}
      </Select>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <div class="max-w-xs">
      <Select items={sizes} value="md" disabled>
        <Select.Trigger aria-label="Size">
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        {@render options()}
      </Select>
    </div>
  </div>
</div>
