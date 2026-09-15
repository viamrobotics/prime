---
paths:
  - '**/*.html'
  - '**/*.astro'
---

# Accessibility — HTML and Astro

Document-level guidance for hand-written HTML and Astro. See `accessibility.md` for the
element-level rules on semantics, names, keyboard, focus, forms, color, and structure that
this guide assumes.

## Rule — follow without deliberation

- **Set `lang` on `<html>`, and again on any element whose language changes.** A screen reader
  picks the voice and pronunciation rules from it.
- **Write a `<title>` that distinguishes the page from every other page on the site.** It is
  the first thing a screen reader announces on load.
- **Ship exactly one `<main>`.** A second forces a screen reader user to guess which one holds
  the page's actual content.
- **Label a `<nav>` when the page has more than one.** Without a label they announce as
  identical landmarks and a user cannot tell which to enter.
- **Use `<header>` and `<footer>`, not a `<div class="header">`.** A styled div carries no
  landmark role, so it is invisible to landmark navigation no matter what it is named.
- **Put a skip link first in the tab order, and make it visible on focus.** A skip link that
  stays visually hidden while focused is unusable by the sighted keyboard users it is for.
- **Never set `user-scalable=no` or `maximum-scale=1` in the viewport meta tag.** Both block
  pinch zoom and fail a WCAG criterion outright.
- **Give every `<iframe>` a `title`.** A screen reader has no other way to describe embedded
  content before entering it.
- **Hide a decorative `<iframe>` with `aria-hidden` and drop it from the tab order.** Otherwise
  a keyboard user tabs into content that carries no information.
- **Mark a layout `<table>` with `role="presentation"` when restructuring it is not possible.**
  Without it a screen reader announces row and column counts for content that has none.
- **Declare character encoding before any content in `<head>`.** A wrong or late encoding
  garbles the text a screen reader reads aloud.
- **Provide a `<noscript>` fallback for content that requires script.** Progressive enhancement
  keeps the page usable when a script fails to load or run.

### Astro

- **Astro components render to static HTML, so the base rule's element-level checks apply to
  the output, not the template.** There is no client runtime to patch semantics after the fact.
- **Add keyboard handling only at a `client:` directive.** That is the one point where a
  component becomes interactive, and the base rule's keyboard section applies from there.

### Tooling

- **Run `html-validate` or the W3C Nu validator for structural errors, and `axe` DevTools for
  what static checking cannot see.** Neither catches whether alt text is meaningful or whether
  focus order actually makes sense to a person using it.

## Examples

**Bad — no skip link, no landmark labels, zoom disabled.**

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
  </head>
  <body>
    <div class="header">Site</div>
    <nav><a href="/a">A</a></nav>
    <nav><a href="/b">B</a></nav>
    <div id="content"></div>
  </body>
</html>
```

**Good — language, landmarks, a focus-visible skip link, zoom left enabled.**

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Products - Acme</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    <header>Site</header>
    <nav aria-label="Primary"><a href="/a">A</a></nav>
    <nav aria-label="Footer"><a href="/b">B</a></nav>
    <main id="content"></main>
  </body>
</html>
```
