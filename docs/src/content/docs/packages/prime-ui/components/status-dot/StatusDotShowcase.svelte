<script lang="ts">
  import { StatusDot } from "@viamrobotics/prime-ui";

  const states = [undefined, "info", "warning", "success", "danger", "disabled"] as const;
  const rows = [
    { name: "Solid", variant: "solid", working: false },
    { name: "Hollow", variant: "hollow", working: false },
    { name: "Working", variant: "solid", working: true },
  ] as const;
</script>

<div class="not-content flex flex-col gap-6">
  {#each rows as row (row.name)}
    <div class="flex flex-col gap-2">
      <p class="text-xs font-medium text-subtle-2 uppercase">{row.name}</p>
      <div class="flex flex-wrap gap-6">
        {#each states as state (state ?? "none")}
          <div class="flex items-center gap-2">
            <StatusDot {state} variant={row.variant} working={row.working} label={state ?? "no state"} />
            <p class="text-xs text-subtle-2">{state ?? "no state"}</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
