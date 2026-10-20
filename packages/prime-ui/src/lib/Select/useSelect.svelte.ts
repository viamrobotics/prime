import { getContext, setContext } from 'svelte';

import type { SelectOption } from './option.ts';

const key = Symbol('Select');

interface SelectOptions {
	items: () => readonly SelectOption[] | undefined;
	disabled: () => boolean;
}

/** What a `Select` shares with the parts inside it. */
export interface SelectContext {
	/** The root's `items`, the single source of truth `Select.Items` renders from. */
	readonly items: readonly SelectOption[];
	/** The root's resolved `disabled`, so `Select.Trigger` can frame itself like a disabled `Input`. */
	readonly disabled: boolean;
}

export const provideSelect = (options: SelectOptions): SelectContext =>
	setContext<SelectContext>(key, {
		get items() {
			return options.items() ?? [];
		},
		get disabled() {
			return options.disabled();
		}
	});

/** The enclosing `Select`, or `undefined` when a part is rendered on its own. */
export const useSelect = (): SelectContext | undefined =>
	getContext<SelectContext | undefined>(key);
