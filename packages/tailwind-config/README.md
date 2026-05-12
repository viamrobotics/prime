# Viam's Tailwind Config

This module contains [Viam][Viam]'s shared [Tailwind CSS][Tailwind CSS] v4 configuration.

[viam]: https://www.viam.com/
[tailwind css]: https://tailwindcss.com/

## Installation

```shell
pnpm add --save-dev tailwindcss @viamrobotics/tailwind-config
```

This package requires a Tailwind CSS v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`). See the [Tailwind installation guides](https://tailwindcss.com/docs/installation) for setup instructions.

## Usage

Add this package in your main CSS file:

```css
/* app.css */
@import "@viamrobotics/tailwind-config";
```

## Fonts

The config references the following font families.

- **Space Grotesk** — `font-space-grotesk`
- **Roboto Mono** — `font-roboto-mono`
- **Public Sans** — `font-public-sans`

Add them to your project with the following Typescript import:

```js
import "@viamrobotics/tailwind-config/fonts";
```
