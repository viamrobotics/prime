---
"@viamrobotics/tailwind-config": patch
---

Define `scrollbar-thumb-border-*` and `slider-thumb-border-*` once each, so every form compiles on Tailwind 4.1, which kept only the first definition of a name. Both now take a bare number for the border width, such as `scrollbar-thumb-border-0`
