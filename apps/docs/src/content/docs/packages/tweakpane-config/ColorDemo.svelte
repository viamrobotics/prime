<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Color } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value = $state("#2e67d3");

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Color bind:value label="Color" />
