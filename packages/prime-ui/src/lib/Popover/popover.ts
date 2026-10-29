import Root from './Popover.svelte';
import Close from './PopoverClose.svelte';
import Content from './PopoverContent.svelte';
import Trigger from './PopoverTrigger.svelte';

export const Popover: typeof Root & {
	Trigger: typeof Trigger;
	Content: typeof Content;
	Close: typeof Close;
} = Object.assign(Root, { Trigger, Content, Close });
