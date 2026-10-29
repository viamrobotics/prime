import Root from './Select.svelte';
import Content from './SelectContent.svelte';
import Group from './SelectGroup.svelte';
import GroupHeading from './SelectGroupHeading.svelte';
import Item from './SelectItem.svelte';
import Items from './SelectItems.svelte';
import Portal from './SelectPortal.svelte';
import ScrollDownButton from './SelectScrollDownButton.svelte';
import ScrollUpButton from './SelectScrollUpButton.svelte';
import Trigger from './SelectTrigger.svelte';
import Value from './SelectValue.svelte';
import Viewport from './SelectViewport.svelte';

export const Select: typeof Root & {
	Trigger: typeof Trigger;
	Value: typeof Value;
	Portal: typeof Portal;
	Content: typeof Content;
	Viewport: typeof Viewport;
	Item: typeof Item;
	Items: typeof Items;
	Group: typeof Group;
	GroupHeading: typeof GroupHeading;
	ScrollUpButton: typeof ScrollUpButton;
	ScrollDownButton: typeof ScrollDownButton;
} = Object.assign(Root, {
	Trigger,
	Value,
	Portal,
	Content,
	Viewport,
	Item,
	Items,
	Group,
	GroupHeading,
	ScrollUpButton,
	ScrollDownButton
});
