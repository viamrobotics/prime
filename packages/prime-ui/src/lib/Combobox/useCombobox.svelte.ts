import { getContext, setContext, type Snippet } from 'svelte';

import type { SelectOption } from '../Select/option.ts';
import type { ComboboxFilter } from './filter.ts';

const COMBOBOX_KEY = Symbol('Combobox');

interface ComboboxOptions {
	items: () => readonly SelectOption[] | undefined;
	filter: () => ComboboxFilter;
	query: { get: () => string; set: (next: string) => void };
	text: () => string;
	required: () => boolean;
}

export interface ComboboxContext {
	readonly matches: readonly SelectOption[];
	query: string;
	// The typed text while the user types, otherwise the selected label.
	readonly text: string;
	readonly required: boolean;
	// Set by `Combobox.Input`. `Combobox.Content` positions against it.
	input: HTMLInputElement | null;
	// Registered by `Combobox.Empty` while mounted. The root announces it from its status region.
	emptyMessage: Snippet | undefined;
}

export const matchesLabel: ComboboxFilter = (option, query) =>
	option.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

export const provideCombobox = (options: ComboboxOptions): ComboboxContext => {
	const matches = $derived.by(() => {
		const items = options.items() ?? [];
		const query = options.query.get();
		const filter = options.filter();
		return query === '' ? items : items.filter((option) => filter(option, query));
	});

	let input = $state<HTMLInputElement | null>(null);
	let emptyMessage = $state.raw<Snippet>();

	return setContext<ComboboxContext>(COMBOBOX_KEY, {
		get matches() {
			return matches;
		},
		get query() {
			return options.query.get();
		},
		set query(next) {
			options.query.set(next);
		},
		get text() {
			return options.text();
		},
		get required() {
			return options.required();
		},
		get input() {
			return input;
		},
		set input(next) {
			input = next;
		},
		get emptyMessage() {
			return emptyMessage;
		},
		set emptyMessage(next) {
			emptyMessage = next;
		}
	});
};

export const useCombobox = (): ComboboxContext | undefined =>
	getContext<ComboboxContext | undefined>(COMBOBOX_KEY);
