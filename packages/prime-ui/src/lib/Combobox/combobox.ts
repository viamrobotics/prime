import Root from './Combobox.svelte';
import Content from './ComboboxContent.svelte';
import Empty from './ComboboxEmpty.svelte';
import Group from './ComboboxGroup.svelte';
import GroupHeading from './ComboboxGroupHeading.svelte';
import Input from './ComboboxInput.svelte';
import Item from './ComboboxItem.svelte';
import Items from './ComboboxItems.svelte';
import Trigger from './ComboboxTrigger.svelte';
import Viewport from './ComboboxViewport.svelte';

export const Combobox: typeof Root & {
	Input: typeof Input;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Viewport: typeof Viewport;
	Item: typeof Item;
	Items: typeof Items;
	Empty: typeof Empty;
	Group: typeof Group;
	GroupHeading: typeof GroupHeading;
} = Object.assign(Root, {
	Input,
	Trigger,
	Content,
	Viewport,
	Item,
	Items,
	Empty,
	Group,
	GroupHeading
});
