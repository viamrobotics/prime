---
"@viamrobotics/prime-controls": minor
---

`NumberField` draws its own up and down stepper as the last item in its frame, in place of the browser's spin buttons, so the stepper sits at the far right, after a `suffix` and `trailing` content. It shows while the frame is hovered or holds focus. A press steps once and a held press repeats, with Shift and Alt scaling the step as the arrow keys do. `Point` and the `Slider` readout get it too. The input now always sits in a prime-ui `Input.Group`.
