<script lang="ts">
  import { Icon, RadioGroup } from "@viamrobotics/prime-ui";

  let value = $state("grid");
</script>

<RadioGroup bind:value orientation="horizontal" class="not-content gap-4" aria-label="Layout">
  {#each ["grid", "list", "table"] as layout (layout)}
    <RadioGroup.Item value={layout} class="capitalize">
      {#snippet indicator({ checked })}
        <Icon
          icon={checked ? "check-circle" : "circle-md"}
          size="lg"
          class={checked ? "text-info-dark" : "text-subtle-2"}
        />
      {/snippet}
      {layout}
    </RadioGroup.Item>
  {/each}
</RadioGroup>
