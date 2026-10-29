<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, List, type ListOptions } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  const options: ListOptions<string> = {
    Power_wire: "power-wire",
    Solar_power: "solar-power",
    Hologram: "hologram",
    Cyberpunk: "cyberpunk",
  };
  let value = $state("cyberpunk");

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<List bind:value {options} label="List" />
