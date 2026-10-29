<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Checkbox, Color, Slider, TabGroup, TabPage } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let accent = $state("#a51aff");
  let amount = $state(0.25);
  let isEnabled = $state(true);
  let selectedIndex = $state(0);

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<TabGroup bind:selectedIndex>
  <TabPage title="Color">
    <Color bind:value={accent} label="Accent" />
  </TabPage>
  <TabPage title="Slider">
    <Slider bind:value={amount} min={0} max={1} step={0.01} label="Amount" />
  </TabPage>
  <TabPage title="Toggle">
    <Checkbox bind:value={isEnabled} label="Enabled" />
  </TabPage>
</TabGroup>
