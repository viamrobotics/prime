import { getContext, setContext } from 'svelte';

import type { SelectOption } from './option.ts';

const SELECT_KEY = Symbol('Select');

interface SelectOptions {
	items: () => readonly SelectOption[] | undefined;
}

export interface SelectContext {
	readonly items: readonly SelectOption[];
}

export const provideSelect = (options: SelectOptions): SelectContext =>
	setContext<SelectContext>(SELECT_KEY, {
		get items() {
			return options.items() ?? [];
		}
	});

export const useSelect = (): SelectContext | undefined =>
	getContext<SelectContext | undefined>(SELECT_KEY);
