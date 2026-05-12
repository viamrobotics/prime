import { getContext, setContext } from 'svelte';

import { type IconName } from '../Icon/icons';
import { InputStates, type InputState } from './input-state';

const CONTEXT_KEY = Symbol('input-context');

export const provideInput = (state: () => InputState) => {
	const current = $derived(state());
	const isInfo = $derived(current === InputStates.INFO);
	const isWarn = $derived(current === InputStates.WARN);
	const isError = $derived(current === InputStates.ERROR);

	const icon = $derived.by<IconName | undefined>(() => {
		if (isInfo) {
			return 'information';
		} else if (isWarn) {
			return 'alert';
		} else if (isError) {
			return 'alert-circle';
		} else {
			return undefined;
		}
	});

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
		},
		get icon() {
			return icon;
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
