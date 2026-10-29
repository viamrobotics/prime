<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Button } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let clickCount = $state(0);

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Button
  title="Clicked {clickCount} times"
  label="Button"
  on:click={() => {
    clickCount += 1;
  }}
/>
