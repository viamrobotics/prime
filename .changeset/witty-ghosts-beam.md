---
"@viamrobotics/prime-docs": patch
---

Add the Field page. Every component page now carries a live states showcase alongside its sandbox, replacing the embedded prime-ui playground. astro dev resolves prime-ui from source for hot reload, while the build renders the packaged dist. Fix the Icon demo to pass icon instead of src.

Generate component reference from source: a content-layer loader reads each prime-ui component's @component block and Props interface JSDoc into a components collection, and the pages render intro, props table, and compound parts from it. The Components sidebar autogenerates from the directory.
