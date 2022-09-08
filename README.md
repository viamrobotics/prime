# P.R.I.M.E.

Pretty Rad Interactive Modular Elements.

Made with ❤️ at Viam.

## Getting started

PRIME is a collection of atomic UI elements, designed to "just work" in any HTML-based environment, regardless of framework or lack thereof. It is a web component library.

## Installation

The PRIME NPM package contains the following necessary exports for usage:
* `prime.es.js` or `prime.umd.js` - JS that defines custom elements. ES modules are recommended over UMD.
* `prime.css` - stylesheet shared by all elements.

If using ES modules, import Prime's JS file into your code:

```ts
import '@viamrobotics/prime'
```

You must host `prime.css` in a static file server. This is every prime element loads it as a shared stylesheet.

If you are not hosting `prime.css` at the root directory of your domain, you will need to add a PRIME_CONFIG global variable before loading the JS file:

```html
<script type="module">
window.PRIME_CONFIG = {
  base: '/path/to/static/folder',
  query: '?v=someCacheBustingHashIfNeeded',
}
</script>
```

If the necessary `.css` and `.js` files have been added, then no additional imports are needed!
You can immediately start adding PRIME elements to your app, since prime elements are simply custom HTML elements:

```html
<v-button label='Hello world!' />
```

All elements are prefixed with `v-`. This stands for Viam, the cool company where these elements are made.

## Playground

To use the playground, go to the `playground` directory, and:
```bash
npm install
npm start
```
Or to run in production mode:
```
npm run build
npm run serve
```

### Browser Compatibility

`PRIME` supports the following browsers:

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |