import Root from './Field.svelte';
import StateIcon from './StateIcon.svelte';

export const Field: typeof Root & { StateIcon: typeof StateIcon } = Object.assign(Root, {
	StateIcon
});
