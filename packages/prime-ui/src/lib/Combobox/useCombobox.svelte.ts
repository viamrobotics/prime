import { getContext, setContext, type Snippet } from 'svelte';

import type { SelectOption } from '../Select/option.ts';

const key = Symbol('Combobox');

/** Decides whether an option stays in the list for the typed text. */
export type ComboboxFilter = (option: SelectOption, query: string) => boolean;

interface ComboboxOptions {
	items: () => readonly SelectOption[] | undefined;
	filter: () => ComboboxFilter;
	query: { get: () => string; set: (next: string) => void };
	text: () => string;
	required: () => boolean;
}

/** What a `Combobox` shares with the parts inside it. */
export interface ComboboxContext {
	/** The root's `items`, every option whatever the typed text. */
	readonly items: readonly SelectOption[];
	/** The `items` the root's filter keeps for the current `query`. `Combobox.Items` renders these. */
	readonly matches: readonly SelectOption[];
	/** The text typed since the list last opened, `''` while it is closed. */
	query: string;
	/** What the input shows: the typed text while the user types, otherwise the selected label. */
	readonly text: string;
	/** The root's `required`, resolved against the enclosing field. */
	readonly required: boolean;
	/** The rendered input, which `Combobox.Content` positions against. Set by `Combobox.Input`. */
	input: HTMLInputElement | null;
	/** The message `Combobox.Empty` registers while mounted, which the root announces. */
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

	return setContext<ComboboxContext>(key, {
		get items() {
			return options.items() ?? [];
		},
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

/** The enclosing `Combobox`, or `undefined` when a part is rendered on its own. */
export const useCombobox = (): ComboboxContext | undefined =>
	getContext<ComboboxContext | undefined>(key);
