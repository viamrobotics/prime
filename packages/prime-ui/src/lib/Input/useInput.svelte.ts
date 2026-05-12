import { getContext, setContext } from 'svelte';
import { InputStates, type InputState } from './input-state';

const CONTEXT_KEY = Symbol('input-context');

export const provideInput = (state: () => InputState) => {
	const current = $derived(state());
	const isInfo = $derived(current === InputStates.INFO);
	const isWarn = $derived(current === InputStates.WARN);
	const isError = $derived(current === InputStates.ERROR);

	return setContext(CONTEXT_KEY, {
		get state() {
			return current;
		},
		get isInfo() {
			return isInfo;
		},
		get isWarn() {
			return isWarn;
		},
		get isError() {
			return isError;
		}
	});
};

export const useInput = () => {
	const context = getContext<ReturnType<typeof provideInput>>(CONTEXT_KEY);
	if (!context) {
		throw new Error('useInput must be used within a component wrapped by provideInput');
	}

	return context;
};
