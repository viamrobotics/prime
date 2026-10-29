<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Monitor, Slider } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value = $state(0.5);

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Slider bind:value min={0} max={1} step={0.01} label="Slider" />
<Monitor {value} label="Monitor" graph interval={50} min={0} max={1} />
