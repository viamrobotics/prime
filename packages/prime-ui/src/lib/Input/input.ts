import Root from './Input.svelte';
import Group from './InputGroup.svelte';

export const Input: typeof Root & { Group: typeof Group } = Object.assign(Root, {
	Group
});
