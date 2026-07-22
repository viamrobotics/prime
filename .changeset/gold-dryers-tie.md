---
"@viamrobotics/prime-ui": minor
---

Add Field, a form-field wrapper that wires Label, Hint, Input, NumberInput, Checkbox, RadioGroup, and Select together. Parts inside a Field take id, disabled, required, state, aria-describedby, and aria-labelledby from it, so the accessible associations no longer need hand-written ids. Hint turns red in the error state. Props passed to a part directly still win, and every part keeps working outside a Field.

Remove the SvelteKit playground app from the package. Components are now demonstrated on the docs site, which hot-reloads this package's source in dev. The package no longer depends on adapter-static or mdsvex.
