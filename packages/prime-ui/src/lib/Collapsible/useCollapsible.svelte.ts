import { getContext, setContext } from 'svelte';

const key = Symbol('Collapsible');

interface CollapsibleOptions {
	open: () => boolean;
}

/** What a `Collapsible` shares with the parts inside it. */
export interface CollapsibleContext {
	/** Whether the content is shown. */
	readonly open: boolean;
}

export const provideCollapsible = (options: CollapsibleOptions): CollapsibleContext =>
	setContext<CollapsibleContext>(key, {
		get open() {
			return options.open();
		}
	});

/** The enclosing `Collapsible`, or `undefined` when a part is rendered on its own. */
export const useCollapsible = (): CollapsibleContext | undefined =>
	getContext<CollapsibleContext | undefined>(key);
