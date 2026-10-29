<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Checkbox } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value = $state(true);

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Checkbox bind:value label="Checkbox" />
