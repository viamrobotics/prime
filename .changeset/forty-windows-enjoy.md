---
"@viamrobotics/prime-split-view": minor
---

Add `@viamrobotics/prime-split-view`, resizable and rearrangeable split-pane layouts for Svelte 5. `SplitView` renders a plain binary layout tree through a `pane` snippet and writes every change through `bind:layout`, so a function binding can persist or veto it. Panes resize by dragging or with the keyboard. The `pane` snippet receives `dragTrigger`, `dragIgnore`, and `moveTrigger` attachments, so a consumer chooses which of their own elements start a drag and which enter move mode, the keyboard and click alternative to dragging. `paneLabel` names panes for assistive technology. Immutable operations edit the tree from code: `setSplitRatio`, `swapPanes`, `movePane`, `addPaneToUpperRight`, `removePane`, and `updatePaneData`.
