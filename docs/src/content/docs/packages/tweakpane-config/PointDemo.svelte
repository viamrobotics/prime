<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { Point, type PointValue3d } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value: PointValue3d = $state({ x: 0, y: 0, z: 0 });

  const paneTheme = $derived(
    theme.current === "dark" ? primeThemeDark : primeTheme,
  );
</script>

<Point theme={paneTheme} bind:value label="Point" />
