import DragTrigger from './DragTrigger.svelte';
import MoveTrigger from './MoveTrigger.svelte';
import Root from './SplitView.svelte';

export const SplitView: typeof Root & {
	DragTrigger: typeof DragTrigger;
	MoveTrigger: typeof MoveTrigger;
} = Object.assign(Root, { DragTrigger, MoveTrigger });
