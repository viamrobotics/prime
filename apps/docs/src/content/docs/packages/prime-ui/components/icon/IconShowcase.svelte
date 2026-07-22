<script lang="ts">
  import Bot from "@lucide/svelte/icons/bot";
  import Cpu from "@lucide/svelte/icons/cpu";
  import Rocket from "@lucide/svelte/icons/rocket";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import { Icon } from "@viamrobotics/prime-ui";

  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;
  const curated = [
    "viam-service",
    "viam-component",
    "viam-mixed-part-status",
    "ask-ai",
    "alert-circle",
    "information",
    "check-circle",
    "checkbox-marked",
    "radiobox-marked",
    "chevron-up",
    "chevron-down",
    "cog",
  ] as const;

  const custom = [
    { label: "rocket", component: Rocket },
    { label: "sparkles", component: Sparkles },
    { label: "bot", component: Bot },
    { label: "cpu", component: Cpu },
  ];
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Sizes</p>
    <div class="flex items-end gap-4 text-default">
      {#each sizes as size (size)}
        <span class="flex flex-col items-center gap-1">
          <Icon icon="cog" {size} />
          <span class="text-xs text-subtle-2">{size}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Curated, by name</p>
    <div class="flex flex-wrap gap-4 text-default">
      {#each curated as name (name)}
        <span class="flex w-20 flex-col items-center gap-1">
          <Icon icon={name} size="xl" />
          <span class="text-center text-xs text-subtle-2">{name}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Any Svelte icon component (Lucide)</p>
    <div class="flex flex-wrap gap-4 text-default">
      {#each custom as { label, component } (label)}
        <span class="flex w-20 flex-col items-center gap-1">
          <Icon icon={component} size="xl" />
          <span class="text-center text-xs text-subtle-2">{label}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Color follows currentColor</p>
    <div class="flex gap-4">
      <Icon icon="alert-circle" size="xl" class="text-danger-dark" />
      <Icon icon="information" size="xl" class="text-info-dark" />
      <Icon icon="check-circle" size="xl" class="text-success-dark" />
    </div>
  </div>
</div>
