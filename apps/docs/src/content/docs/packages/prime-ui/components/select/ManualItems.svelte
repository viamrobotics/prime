<script lang="ts">
  import { Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small", hint: "fits a 2 inch wheel" },
    { value: "md", label: "Medium", hint: "fits a 4 inch wheel" },
    { value: "lg", label: "Large", hint: "fits a 6 inch wheel" },
  ];

  let size = $state("md");
</script>

<div class="not-content max-w-xs">
  <Select items={sizes} bind:value={size}>
    <Select.Trigger class="w-64" aria-label="Size">
      <Select.Value placeholder="Pick a size" />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content>
        <Select.Viewport>
          {#each sizes as { value, label, hint } (value)}
            <Select.Item {value} {label}>
              {#snippet children({ selected })}
                <span class={{ "font-medium": selected }}>{label}</span>
                <span class="text-xs text-subtle-2">{hint}</span>
              {/snippet}
            </Select.Item>
          {/each}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select>
</div>
