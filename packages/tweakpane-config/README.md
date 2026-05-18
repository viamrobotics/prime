# Viam's Tweakpane Config

Viam-themed `Theme` preset for [`svelte-tweakpane-ui`][svelte-tweakpane-ui]. Drop it into `ThemeUtils.setGlobalDefaultTheme` and every component on the page renders in Viam's palette and typography.

[svelte-tweakpane-ui]: https://kitschpatrol.com/svelte-tweakpane-ui

## Installation

```sh
pnpm add @viamrobotics/tweakpane-config svelte-tweakpane-ui
```

## Usage

Apply the theme globally:

```svelte
<script lang="ts">
	import { primeTheme } from '@viamrobotics/tweakpane-config';
	import { ThemeUtils, Pane, Slider } from 'svelte-tweakpane-ui';

	ThemeUtils.setGlobalDefaultTheme(primeTheme);

	let value = $state(0.5);
</script>

<Pane title="Prime-themed pane">
	<Slider bind:value min={0} max={1} />
</Pane>
```

`ThemeUtils.setGlobalDefaultTheme` touches `window`, so guard the call for SSR (e.g. inside `$effect`, `onMount`, or behind an `if (browser)` check). See the [svelte-tweakpane-ui themes docs](https://kitschpatrol.com/svelte-tweakpane-ui/docs/themes) for other usage patterns — passing `theme` per-component, partial overrides, etc.

## Extending the theme

`primeTheme` is a plain `Theme` object. Spread it for partial overrides:

```ts
import { primeTheme } from "@viamrobotics/tweakpane-config";
import { ThemeUtils, type Theme } from "svelte-tweakpane-ui";

const compactTheme: Theme = {
  ...primeTheme,
  containerUnitSize: "20px",
};

ThemeUtils.setGlobalDefaultTheme(compactTheme);
```

## Fonts

The theme references `Public Sans Variable`. Load it via Viam's font config:

```ts
import "@viamrobotics/tailwind-config/fonts";
```

If the font isn't loaded, browsers fall back to the system sans-serif.
