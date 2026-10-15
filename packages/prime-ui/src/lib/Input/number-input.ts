import Root from './NumberInput.svelte';
import StateIcon from './StateIcon.svelte';

export const NumberInput: typeof Root & { StateIcon: typeof StateIcon } = Object.assign(Root, {
	StateIcon
});
