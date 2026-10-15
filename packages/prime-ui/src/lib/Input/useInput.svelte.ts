import { getContext, setContext } from 'svelte';

import { InputStates, type InputState } from './state.ts';

const key = Symbol('Input');

export const provideInput = (state: () => InputState | undefined) => {
	const currentState = $derived(state() ?? InputStates.None);

	return setContext(key, {
		get state() {
			return currentState;
		}
	});
};

export const useInput = () => {
	const context = getContext<ReturnType<typeof provideInput>>(key);
	if (!context) throw new Error('useInput must be used within a provideInput context');
	return context;
};
