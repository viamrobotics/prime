<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";

  const variants = ["info", "success", "warning", "danger"] as const;
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Stacked</p>
    {#each variants as variant (variant)}
      <Banner {variant}>
        <Banner.Title>{variant}</Banner.Title>
        <Banner.Description>A short explanation of what happened.</Banner.Description>
        <Banner.Close />
      </Banner>
    {/each}
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Compact</p>
    {#each variants as variant (variant)}
      <Banner {variant}>
        <Banner.Description>A short explanation of what happened.</Banner.Description>
        <Banner.Close />
      </Banner>
    {/each}
  </div>
</div>
