# `@viamrobotics/prime-editor`

## Getting started

`@viamrobotics/prime-editor` is a collection of Svelte components that wrap code-editing tools.

This primarily based around [Codemirror](https://codemirror.net/)

## Installation

Install use the README instructions at [@viamrobotics/prime-core](https://github.com/viamrobotics/prime/tree/main/packages/core) to install prime-core. Then install prime-editor using your package manager of choice:

```
pnpm add --save-dev @viamrobotics/prime-editor
```

<strong>These components require that ssr is disabled.</strong>
Ensure that you have a `+layout.ts` above all pages that use these components:

```js
export const prerender = false;
export const ssr = false;
```

## Usage

Once installed, you can use the components in your app:

```html
<script lang="ts">
  import { JsonEditor } from '@viamrobotics/prime-editor';
</script>

<JsonEditor
  initialValue={'{"a": "b"}'}
  label="editor"
  onChange={(e) => console.log(e)}
/>
```
