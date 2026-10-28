import DragTrigger from './DragTrigger.svelte';
import MoveTrigger from './MoveTrigger.svelte';
import PaneBody from './PaneBody.svelte';
import Root from './Panes.svelte';
import TabList from './TabList.svelte';
import TabListDropRegion from './TabListDropRegion.svelte';

export const Panes: typeof Root & {
	DragTrigger: typeof DragTrigger;
	MoveTrigger: typeof MoveTrigger;
	PaneBody: typeof PaneBody;
	TabList: typeof TabList;
	TabListDropRegion: typeof TabListDropRegion;
} = Object.assign(Root, { DragTrigger, MoveTrigger, PaneBody, TabList, TabListDropRegion });
