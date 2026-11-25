# @viamrobotics/prime-map

MapLibre maps for Svelte 5. `MapLibre` creates a maplibre-gl map that fills its parent and provides a runes context to its children, which add markers, controls, and layers. The `./three` subpath renders a Three.js scene on the map as a custom layer. `maplibre-gl` is a peer, and `three` an optional peer that only `./three` imports.

## Layout

- `src/lib/MapLibre/MapLibre.svelte`: the root. It creates the map in `onMount`, binds it through `bind:map`, keeps the style in step with `mapProvider`, `mapProviderKey`, and `satellite`, and renders `children` and `layer` once the first style loads. `center`, `zoom`, and `satellite` are `$bindable`. The camera writes `center` and `zoom` back, and the effects that apply them skip the camera's own writes. On unmount it removes the map after its children's cleanup.
- `src/lib/MapLibre/useMapLibre.svelte.ts`: `provideMapLibre`, which `MapLibre` calls, and `useMapLibre`, which throws outside a `MapLibre`. The context is an object of getters. `provideMapLibre` takes reactive props as getter thunks and the bindable `center`, `zoom`, and `satellite` as `{ get, set }`, so a write from a control reaches the bound prop. `map` throws when read before the map exists, which children never see, since they mount after it loads.
- `src/lib/MapLibre/useMapLibreEvent.svelte.ts`: `useMapLibreEvent`, a map event listener that lives as long as the calling component.
- `src/lib/Marker/Marker.svelte` (exported as `MapLibreMarker`) and `DirectionalMarker.svelte`: markers. `DirectionalMarker` draws an arrow element through `Marker`.
- `src/lib/LngLatInput/LngLatInput.svelte`: two prime-controls `NumberField`s in a named group. It needs no map.
- `src/lib/controls/`: `CenterControls`, `FollowControls`, `NavigationControls`, and `SatelliteControls`, each read through `useMapLibre`. The checkboxes are prime-ui `Field`, `Checkbox`, and `Label`. `map-view-storage.ts` reads and writes the view `CenterControls` persists in `localStorage` under its `storageKey`.
- `src/lib/projection.ts`: Mercator and Cartesian conversions over maplibre-gl's `MercatorCoordinate`.
- `src/lib/providers/`: `MapProviders`, the OpenStreetMap and Google Maps styles, `getStyleSpecification`, which picks one and falls back to OpenStreetMap, the `google://` tile protocol, `DEFAULT_MAX_ZOOM`, and the tile size.
- `src/lib/three/`: `useMapLibreThreeRenderer`, `useMapLibreThreeRaycast`, and `lng-lat-user-data.ts`, which reads an object's `userData.lngLat`.
- `src/lib/index.ts`: the `.` exports. `src/lib/three.ts`: the `./three` exports. These two are the only re-export modules, and every other module imports from the module that defines a symbol.
- `src/lib/**/__tests__/`: the specs, excluded from the published package. Wrapper components sit in `__tests__/fixtures/` beside them.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the specs import, `map-network.ts` answers every fetch with a 404 so a map spec never loads tiles, `fixtures/MapFrame.svelte` renders a `MapLibre` in a 400 by 300 box, and `fixtures/MapReady.svelte` hands a spec the map once it loads.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-map build    # svelte-package + publint
pnpm --filter @viamrobotics/prime-map check    # svelte-check
pnpm --filter @viamrobotics/prime-map test     # vitest
pnpm --filter @viamrobotics/prime-map lint     # eslint
pnpm --filter @viamrobotics/prime-map format   # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`, against a real maplibre-gl map on WebGL. Other `*.spec.ts` files run in node. `vite.config.ts` excludes `maplibre-gl` from dependency pre-bundling, because pre-bundling drops the worker file it loads from beside its bundle.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- Nothing reachable from `src/lib/index.ts` imports `three`. `src/lib/__tests__/entry-imports.spec.ts` walks the imports to hold that.
- A hook or control reads `context.map` inside its `$effect` and tears down against the map it captured.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
- State flows through `bind:`, never change callbacks, and a component's props carry no camelCase `on*` callbacks.
