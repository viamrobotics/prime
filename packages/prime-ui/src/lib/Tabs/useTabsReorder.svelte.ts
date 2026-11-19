import { getContext, setContext, tick } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

import { moveTo, reorderedMessage, sameOrder } from './reorder.ts';

const key = Symbol('TabsReorder');

interface TabsReorderOptions {
	reorderable: () => boolean;
	order: { get: () => string[] | undefined; set: (next: string[]) => void };
	registered: () => readonly string[];
}

/** What a `Tabs.List` shares with its triggers for moving tabs. */
export interface TabsReorderContext {
	/** Whether the list lets its tabs move. */
	readonly reorderable: boolean;
	/** The tab values in strip order: the bound `order`, or the triggers' registration order. */
	readonly order: readonly string[];
	/** The status region's text. */
	readonly announcement: string;
	/** Track a trigger's element by its value, so a move can focus and name it. Returns the untrack function. */
	track: (value: string, element: HTMLElement) => () => void;
	elementOf: (value: string) => HTMLElement | undefined;
	/** Move a tab to `index`, then read `order` back. A refused or impossible move changes nothing. */
	move: (value: string, index: number, options: { focus: boolean }) => void;
}

const labelOf = (element: HTMLElement | undefined) =>
	element?.getAttribute('aria-label') ?? element?.textContent?.trim() ?? '';

export const provideTabsReorder = (options: TabsReorderOptions): TabsReorderContext => {
	const elements = new SvelteMap<string, HTMLElement>();
	let announcement = $state('');

	const order = () => options.order.get() ?? [...options.registered()];

	// A live region ignores a text it already holds, so a repeated message gains a trailing no-break space.
	const announce = (message: string) => {
		announcement = message === announcement ? `${message}\u00a0` : message;
	};

	return setContext<TabsReorderContext>(key, {
		get reorderable() {
			return options.reorderable();
		},
		get order() {
			return order();
		},
		get announcement() {
			return announcement;
		},
		track: (value, element) => {
			elements.set(value, element);
			return () => {
				if (elements.get(value) === element) elements.delete(value);
			};
		},
		elementOf: (value) => elements.get(value),
		move: (value, index, { focus }) => {
			const before = order();
			const next = moveTo(before, value, index);
			if (!next) return;
			options.order.set(next);
			const after = order();
			if (sameOrder(before, after) || !after.includes(value)) return;
			const message = reorderedMessage(
				labelOf(elements.get(value)),
				after.indexOf(value) + 1,
				after.length
			);
			void tick().then(() => {
				if (focus) elements.get(value)?.focus();
				announce(message);
			});
		}
	});
};

/** The enclosing `Tabs.List`'s reorder state, or `undefined` outside one. */
export const useTabsReorder = (): TabsReorderContext | undefined =>
	getContext<TabsReorderContext | undefined>(key);
