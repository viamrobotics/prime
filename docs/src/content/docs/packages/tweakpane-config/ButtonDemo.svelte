<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { Button } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let clickCount = $state(0);

  const paneTheme = $derived(
    theme.current === "dark" ? primeThemeDark : primeTheme,
  );
</script>

<Button theme={paneTheme}
  title="Clicked {clickCount} times"
  label="Button"
  on:click={() => {
    clickCount += 1;
  }}
/>
