<script lang="ts">
  import { primeTheme, primeThemeDark } from "@viamrobotics/tweakpane-config";
  import { RotationEuler, type RotationEulerValue } from "svelte-tweakpane-ui";
  import { theme } from "@docs/theme.svelte.ts";

  let value: RotationEulerValue = $state({ x: 0, y: 0, z: 0 });

  const paneTheme = $derived(
    theme.current === "dark" ? primeThemeDark : primeTheme,
  );
</script>

<RotationEuler theme={paneTheme} bind:value label="Rotation" />
