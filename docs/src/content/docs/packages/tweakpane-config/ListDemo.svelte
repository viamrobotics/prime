<script lang="ts">
  import { theme } from "@docs/theme.svelte.ts";
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { List, type ListOptions } from "svelte-tweakpane-ui";

  const options: ListOptions<string> = {
    Power_wire: "power-wire",
    Solar_power: "solar-power",
    Hologram: "hologram",
    Cyberpunk: "cyberpunk",
  };
  let value = $state("cyberpunk");

  const paneTheme = $derived(
    theme.current === "dark" ? primeThemeDark : primeTheme,
  );
</script>

<List theme={paneTheme} bind:value {options} label="List" />
