import Root from './RadioGroup.svelte';
import Item from './RadioGroupItem.svelte';

export const RadioGroup: typeof Root & { Item: typeof Item } = Object.assign(Root, {
	Item
});
