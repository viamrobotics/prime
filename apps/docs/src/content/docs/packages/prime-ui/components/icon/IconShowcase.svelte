<script lang="ts">
  import Bot from "@lucide/svelte/icons/bot";
  import Cpu from "@lucide/svelte/icons/cpu";
  import Rocket from "@lucide/svelte/icons/rocket";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import {
    mdiAlertCircle,
    mdiCheckCircle,
    mdiChevronDown,
    mdiChevronUp,
    mdiCog,
    mdiInformation,
  } from "@mdi/js";
  import { Icon } from "@viamrobotics/prime-ui";
  import {
    FilterOutline,
    Magnet,
    Resize,
    ViamLocalModule,
    ViamMixedPartStatus,
    ViamRegistryModule,
    ViamService,
  } from "@viamrobotics/prime-ui/icons";

  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;

  const paths = [
    { label: "mdiCog", icon: mdiCog },
    { label: "mdiAlertCircle", icon: mdiAlertCircle },
    { label: "mdiInformation", icon: mdiInformation },
    { label: "mdiCheckCircle", icon: mdiCheckCircle },
    { label: "mdiChevronUp", icon: mdiChevronUp },
    { label: "mdiChevronDown", icon: mdiChevronDown },
  ];

  const glyphs = [
    { label: "ViamService", component: ViamService },
    { label: "ViamLocalModule", component: ViamLocalModule },
    { label: "ViamRegistryModule", component: ViamRegistryModule },
    { label: "ViamMixedPartStatus", component: ViamMixedPartStatus },
    { label: "FilterOutline", component: FilterOutline },
    { label: "Magnet", component: Magnet },
    { label: "Resize", component: Resize },
  ];

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
          <Icon icon={mdiCog} {size} />
          <span class="text-xs text-subtle-2">{size}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Paths from @mdi/js</p>
    <div class="flex flex-wrap gap-4 text-default">
      {#each paths as { label, icon } (label)}
        <span class="flex w-28 flex-col items-center gap-1">
          <Icon {icon} size="xl" />
          <span class="text-center text-xs text-subtle-2">{label}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Viam glyphs from @viamrobotics/prime-ui/icons (a few of 25, see the migration table for the full list)</p>
    <div class="flex flex-wrap gap-4 text-default">
      {#each glyphs as { label, component } (label)}
        <span class="flex w-32 flex-col items-center gap-1">
          <Icon icon={component} size="xl" />
          <span class="text-center text-xs text-subtle-2">{label}</span>
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
      <Icon icon={mdiAlertCircle} size="xl" class="text-danger-dark" />
      <Icon icon={mdiInformation} size="xl" class="text-info-dark" />
      <Icon icon={mdiCheckCircle} size="xl" class="text-success-dark" />
    </div>
  </div>
</div>
