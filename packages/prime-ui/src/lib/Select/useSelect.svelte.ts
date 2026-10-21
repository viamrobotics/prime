import { getContext, setContext } from 'svelte';

import type { SelectOption } from './option.ts';

const key = Symbol('Select');

interface SelectOptions {
	items: () => readonly SelectOption[] | undefined;
}

/** What a `Select` shares with the parts inside it. */
export interface SelectContext {
	/** The root's `items`, the single source of truth `Select.Items` renders from. */
	readonly items: readonly SelectOption[];
}

export const provideSelect = (options: SelectOptions): SelectContext =>
	setContext<SelectContext>(key, {
		get items() {
			return options.items() ?? [];
		}
	});

/** The enclosing `Select`, or `undefined` when a part is rendered on its own. */
export const useSelect = (): SelectContext | undefined =>
	getContext<SelectContext | undefined>(key);
