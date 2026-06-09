# @viamrobotics/tailwind-config

## 1.1.0

### Minor Changes

- d95d7d9: Add an opt-in dark theme via the new `@viamrobotics/tailwind-config/dark` export

## 1.0.2

### Patch Changes

- 661fd52: Migrate package source from viamrobotics/js-config to viamrobotics/prime. Also removes stray whitespace inside `--value(--namespace-*)` calls, and declares `@fontsource-variable/{space-grotesk,roboto-mono,public-sans}` as direct dependencies (the `./fonts` entry point imports them but they were previously undeclared).
