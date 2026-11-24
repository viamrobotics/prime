import { getContext, setContext, tick } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

import { closedMessage } from './close.ts';
import { moveTo, reorderedMessage, sameOrder } from './reorder.ts';

const TABS_REORDER_KEY = Symbol('TabsReorder');

interface TabsReorderOptions {
	reorderable: () => boolean;
	closable: () => boolean;
	order: { get: () => string[] | undefined; set: (next: string[]) => void };
	registered: () => readonly string[];
	selected: () => string | undefined;
}

export interface TabsReorderContext {
	readonly reorderable: boolean;
	readonly closable: boolean;
	// The bound `order`, or the triggers' registration order while it is unset.
	readonly order: readonly string[];
	readonly announcement: string;
	// A move focuses and names a tab through its tracked element.
	track: (value: string, element: HTMLElement) => () => void;
	elementOf: (value: string) => HTMLElement | undefined;
	// Reads `order` back after the write, so a function binding that refuses leaves focus and the announcement alone.
	move: (value: string, index: number, options: { focus: boolean }) => void;
	// Writes `order` without the tab, read back the same way as a move.
	close: (value: string) => void;
}

// A tab's accessible name: its `aria-labelledby` text, else its `aria-label`, else its own text.
export const labelOf = (element: HTMLElement | undefined) => {
	if (!element) return '';
	const labelledBy = element.getAttribute('aria-labelledby');
	if (labelledBy) {
		const text = labelledBy
			.split(/\s+/)
			.map((id) => element.ownerDocument.getElementById(id)?.textContent?.trim() ?? '')
			.filter(Boolean)
			.join(' ');
		if (text) return text;
	}
	return element.getAttribute('aria-label') ?? element.textContent?.trim() ?? '';
};

export const provideTabsReorder = (options: TabsReorderOptions): TabsReorderContext => {
	const elements = new SvelteMap<string, HTMLElement>();
	let announcement = $state('');

	const order = () => options.order.get() ?? [...options.registered()];

	// A live region ignores a text it already holds, so a repeated message gains a trailing no-break space.
	const announce = (message: string) => {
		announcement = message === announcement ? `${message}\u00a0` : message;
	};

	const focusSelected = () => {
		const selected = options.selected();
		if (selected !== undefined) elements.get(selected)?.focus();
	};

	return setContext<TabsReorderContext>(TABS_REORDER_KEY, {
		get reorderable() {
			return options.reorderable();
		},
		get closable() {
			return options.closable();
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
		},
		close: (value) => {
			const before = order();
			if (!before.includes(value)) return;
			const element = elements.get(value);
			const message = closedMessage(labelOf(element));
			const hadFocus = element?.contains(element.ownerDocument.activeElement) ?? false;
			options.order.set(before.filter((existing) => existing !== value));
			if (order().includes(value)) return;
			void tick().then(() => {
				if (hadFocus) focusSelected();
				announce(message);
			});
		}
	});
};

export const useTabsReorder = (): TabsReorderContext | undefined =>
	getContext<TabsReorderContext | undefined>(TABS_REORDER_KEY);
