import Root from './Collapsible.svelte';
import Content from './CollapsibleContent.svelte';
import Trigger from './CollapsibleTrigger.svelte';

export const Collapsible: typeof Root & {
	Trigger: typeof Trigger;
	Content: typeof Content;
} = Object.assign(Root, { Trigger, Content });
