import Root from './ToggleButtons.svelte';
import Item from './ToggleButtonsItem.svelte';

export const ToggleButtons: typeof Root & { Item: typeof Item } = Object.assign(Root, {
	Item
});
