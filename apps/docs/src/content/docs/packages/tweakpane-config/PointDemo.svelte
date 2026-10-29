<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { ThemeUtils, Point, type PointValue3d } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value: PointValue3d = $state({ x: 0, y: 0, z: 0 });

  $effect(() => {
    ThemeUtils.setGlobalDefaultTheme(
      theme.current === "dark" ? primeThemeDark : primeTheme,
    );
  });
</script>

<Point bind:value label="Point" />
