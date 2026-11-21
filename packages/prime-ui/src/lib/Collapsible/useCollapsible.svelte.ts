import { getContext, setContext } from 'svelte';

const key = Symbol('Collapsible');

interface CollapsibleOptions {
	open: () => boolean;
}

export interface CollapsibleContext {
	readonly open: boolean;
}

export const provideCollapsible = (options: CollapsibleOptions): CollapsibleContext =>
	setContext<CollapsibleContext>(key, {
		get open() {
			return options.open();
		}
	});

// Undefined when a part is rendered outside a Collapsible.
export const useCollapsible = (): CollapsibleContext | undefined =>
	getContext<CollapsibleContext | undefined>(key);
