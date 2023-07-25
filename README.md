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

## License

Copyright 2021-2023 Viam Inc.

Apache 2.0 - See [LICENSE](https://github.com/viamrobotics/prime/blob/main/LICENSE) file
