<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Checkbox, Pane, Slider } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let amount = $state(0.25);
  let isEnabled = $state(true);

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Pane position="inline" title="Settings">
  <Slider bind:value={amount} min={0} max={1} step={0.01} label="Amount" />
  <Checkbox bind:value={isEnabled} label="Enabled" />
</Pane>
