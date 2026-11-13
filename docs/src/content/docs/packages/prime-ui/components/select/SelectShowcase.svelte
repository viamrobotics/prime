<script lang="ts">
  import { Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large", disabled: true },
  ];
</script>

{#snippet options()}
  <Select.Content>
    <Select.Viewport>
      {#each sizes as item (item.value)}
        <Select.Item value={item.value} label={item.label} disabled={item.disabled} />
      {/each}
    </Select.Viewport>
  </Select.Content>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Placeholder, with a disabled item</h4>
    <div class="max-w-xs">
      <Select items={sizes}>
        <Select.Trigger class="w-64" aria-label="Size">
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        {@render options()}
      </Select>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <div class="max-w-xs">
      <Select items={sizes}>
        <Select.Trigger class="w-64" aria-label="Size" state="error">
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        {@render options()}
      </Select>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled</h4>
    <div class="max-w-xs">
      <Select items={sizes} value="md" disabled>
        <Select.Trigger class="w-64" aria-label="Size">
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        {@render options()}
      </Select>
    </div>
  </div>
</div>
