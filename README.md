# P.R.I.M.E.

Pretty Rad Interactive Modular Elements

Made with ❤️ at Viam

A collection of UI elements.

## Packages

[`@viamrobotics/prime`][legacy] - Legacy web components

[`@viamrobotics/prime-core`][core] - Core components. Exported as Svelte components.

[`@viamrobotics/prime-blocks`][blocks] - Large blocks of UI that often have dependencies like [Threlte][]. Exported as Svelte components.

[legacy]: https://github.com/viamrobotics/prime/tree/main/packages/legacy
[core]: https://github.com/viamrobotics/prime/tree/main/packages/core
[blocks]: https://github.com/viamrobotics/prime/tree/main/packages/blocks
[threlte]: https://threlte.xyz

## Building

```bash
pnpm -r build
```

## Linting

```bash
pnpm -r check
pnpm -r format
```

## Testing

```bash
pnpm -C packages/legacy playwright-install
pnpm -r test
```

### Browser Compatibility

`PRIME` supports the following browsers:

| ![Chrome][] | ![Firefox][] | ![Edge][] | ![Safari][] |
| ----------------- | ------------------- | ------------- | ----------------- |
| Latest ✔          | Latest ✔            | Latest ✔      | Latest ✔          |

[chrome]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[edge]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[safari]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png

## License

Copyright 2021-2023 Viam Inc.

Apache 2.0 - See [LICENSE](https://github.com/viamrobotics/prime/blob/main/LICENSE) file
