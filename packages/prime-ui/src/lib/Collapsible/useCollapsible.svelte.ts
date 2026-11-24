import { getContext, setContext } from 'svelte';

const COLLAPSIBLE_KEY = Symbol('Collapsible');

interface CollapsibleOptions {
	open: () => boolean;
}

export interface CollapsibleContext {
	readonly open: boolean;
}

export const provideCollapsible = (options: CollapsibleOptions): CollapsibleContext =>
	setContext<CollapsibleContext>(COLLAPSIBLE_KEY, {
		get open() {
			return options.open();
		}
	});

// Undefined when a part is rendered outside a Collapsible.
export const useCollapsible = (): CollapsibleContext | undefined =>
	getContext<CollapsibleContext | undefined>(COLLAPSIBLE_KEY);
