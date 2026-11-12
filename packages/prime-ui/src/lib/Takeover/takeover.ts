import Root from './Takeover.svelte';
import Close from './TakeoverClose.svelte';
import Content from './TakeoverContent.svelte';
import Header from './TakeoverHeader.svelte';
import Title from './TakeoverTitle.svelte';
import Trigger from './TakeoverTrigger.svelte';

export const Takeover: typeof Root & {
	Trigger: typeof Trigger;
	Content: typeof Content;
	Header: typeof Header;
	Title: typeof Title;
	Close: typeof Close;
} = Object.assign(Root, { Trigger, Content, Header, Title, Close });
