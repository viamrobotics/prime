import { getContext, setContext, untrack } from 'svelte';

import type { TabsVariant } from './variant.ts';

const TABS_KEY = Symbol('Tabs');

interface TabsOptions {
	value: () => string | undefined;
	variant: () => TabsVariant;
}

export interface TabsContext {
	// The bound value while its tab exists, otherwise the leftmost tab's.
	readonly value: string | undefined;
	readonly variant: TabsVariant;
	// In mount order, which is the order a list with an unset `order` starts from.
	readonly triggers: readonly string[];
	register: (value: string, element: HTMLElement) => () => void;
	registerPanel: (value: string) => () => void;
}

interface TriggerEntry {
	value: string;
	element: HTMLElement;
}

// A tab that re-registers in the flush that unregistered it keeps its place, so a read between
// the two never finds it missing. Its removal waits for the microtask after that flush.
const createRegistry = <TEntry>(keyOf: (entry: TEntry) => string) => {
	let entries = $state.raw<TEntry[]>([]);
	const leaving = new Set<TEntry>();

	const removeLeaving = () => {
		if (leaving.size === 0) return;
		entries = entries.filter((entry) => !leaving.has(entry));
		leaving.clear();
	};

	const add = (entry: TEntry) => {
		const key = keyOf(entry);
		const replaced = [...leaving].find((existing) => keyOf(existing) === key);
		if (replaced === undefined) {
			entries = [...entries, entry];
			return;
		}
		leaving.delete(replaced);
		entries = entries.map((existing) => (existing === replaced ? entry : existing));
	};

	return {
		get entries() {
			return entries;
		},
		add: (entry: TEntry) => {
			untrack(() => add(entry));
			return () => {
				leaving.add(entry);
				queueMicrotask(removeLeaving);
			};
		}
	};
};

const precedes = (element: Node, other: Node) =>
	(element.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;

// Mount order drifts from strip order after a move or a front insert, so the strip's DOM decides.
const leftmostOf = (entries: readonly TriggerEntry[]) =>
	entries.reduce<TriggerEntry | undefined>(
		(leftmost, entry) =>
			leftmost === undefined || precedes(entry.element, leftmost.element) ? entry : leftmost,
		undefined
	)?.value;

export const provideTabs = (options: TabsOptions): TabsContext => {
	const triggers = createRegistry<TriggerEntry>((entry) => entry.value);
	const panels = createRegistry<string>((value) => value);

	const triggerValues = $derived(triggers.entries.map((entry) => entry.value));

	// A strip hidden behind the consumer's `{#if}` mounts no trigger, so the panels decide then.
	const selected = $derived.by(() => {
		const bound = options.value();
		if (triggers.entries.length === 0) {
			return bound !== undefined && panels.entries.includes(bound) ? bound : panels.entries[0];
		}
		return bound !== undefined && triggerValues.includes(bound)
			? bound
			: leftmostOf(triggers.entries);
	});

	return setContext<TabsContext>(TABS_KEY, {
		get value() {
			return selected;
		},
		get variant() {
			return options.variant();
		},
		get triggers() {
			return triggerValues;
		},
		register: (value, element) => triggers.add({ value, element }),
		registerPanel: panels.add
	});
};

export const useTabs = (): TabsContext | undefined => getContext<TabsContext | undefined>(TABS_KEY);
