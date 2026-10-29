import Root from './Dialog.svelte';
import Close from './DialogClose.svelte';
import Content from './DialogContent.svelte';
import Description from './DialogDescription.svelte';
import Title from './DialogTitle.svelte';
import Trigger from './DialogTrigger.svelte';

export const Dialog: typeof Root & {
	Trigger: typeof Trigger;
	Content: typeof Content;
	Title: typeof Title;
	Description: typeof Description;
	Close: typeof Close;
} = Object.assign(Root, { Trigger, Content, Title, Description, Close });
