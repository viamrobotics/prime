import Root from './Input.svelte';
import StateIcon from './StateIcon.svelte';

export const Input: typeof Root & { StateIcon: typeof StateIcon } = Object.assign(Root, {
	StateIcon
});
