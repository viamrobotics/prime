---
"@viamrobotics/prime-controls": minor
---

`Point` stacks its axes one a row when its box is too narrow for a row of them: under 15rem for two axes, 22rem for three, and 29rem for four. Its root is now a size container, so give it a width where its parent would otherwise shrink it to its content.
