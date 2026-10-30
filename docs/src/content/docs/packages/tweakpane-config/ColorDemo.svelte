<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { Color } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value = $state("#2e67d3");

  const paneTheme = $derived(
    theme.current === "dark" ? primeThemeDark : primeTheme,
  );
</script>

<Color theme={paneTheme} bind:value label="Color" />
