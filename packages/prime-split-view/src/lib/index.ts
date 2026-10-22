export { default as SplitView } from './SplitView/SplitView.svelte';
export type { PaneControls } from './SplitView/pane-controls.ts';
export type { LayoutNode, PaneNode, SplitDirection, SplitKey, SplitNode } from './layout.ts';
export {
	addPaneToUpperRight,
	movePane,
	removePane,
	setSplitRatio,
	swapPanes,
	updatePaneData
} from './tree.ts';
