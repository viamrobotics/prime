<script lang="ts">
  import { mdiCheckCircle, mdiCircleMedium } from "@mdi/js";
  import { Field, Icon, RadioGroup } from "@viamrobotics/prime-ui";

  let value = $state("grid");
</script>

<Field aria-label="Layout">
  <RadioGroup bind:value orientation="horizontal" class="not-content gap-4">
    {#each ["grid", "list", "table"] as layout (layout)}
      <RadioGroup.Item value={layout} class="capitalize">
        {#snippet indicator({ checked })}
          <Icon
            icon={checked ? mdiCheckCircle : mdiCircleMedium}
            size="lg"
            class={checked ? "text-info-dark" : "text-subtle-2"}
          />
        {/snippet}
        {layout}
      </RadioGroup.Item>
    {/each}
  </RadioGroup>
</Field>
