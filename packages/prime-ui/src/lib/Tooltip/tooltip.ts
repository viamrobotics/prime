import Root from './Tooltip.svelte';
import Content from './TooltipContent.svelte';
import Trigger from './TooltipTrigger.svelte';

export const Tooltip: typeof Root & {
	Trigger: typeof Trigger;
	Content: typeof Content;
} = Object.assign(Root, { Trigger, Content });
