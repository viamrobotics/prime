import { getContext, setContext, untrack } from 'svelte';

import { FieldStates, type FieldState } from './state.ts';

const key = Symbol('Field');

interface FieldOptions {
	controlId: () => string;
	disabled: () => boolean;
	required: () => boolean;
	state: () => FieldState | undefined;
}

/** What a `Field` shares with the label, control, and hints inside it. */
export interface FieldContext {
	/** Id the field assigns to its control. `Label` points its `for` here. */
	readonly controlId: string;
	readonly disabled: boolean;
	readonly required: boolean;
	readonly state: FieldState;
	/** Space-joined ids of the registered labels, for `aria-labelledby`. */
	readonly labelledBy: string | undefined;
	/** Space-joined ids of the registered hints, for `aria-describedby`. */
	readonly describedBy: string | undefined;
	/** Register a label by id. Returns the unregister function. */
	label: (id: string) => () => void;
	/** Register a hint by id. Returns the unregister function. */
	describe: (id: string) => () => void;
}

const createRegistry = () => {
	let ids = $state<string[]>([]);
	const joined = $derived(ids.length > 0 ? ids.join(' ') : undefined);

	// Parts register from an $effect. Reading `ids` there would make that effect depend
	// on the list it appends to and loop, so the write happens untracked.
	const register = (id: string) => {
		untrack(() => {
			ids = [...ids, id];
		});
		return () => {
			ids = ids.filter((existing) => existing !== id);
		};
	};

	return {
		get joined() {
			return joined;
		},
		register
	};
};

export const provideField = (options: FieldOptions): FieldContext => {
	const labels = createRegistry();
	const hints = createRegistry();
	const currentState = $derived(options.state() ?? FieldStates.None);

	return setContext<FieldContext>(key, {
		get controlId() {
			return options.controlId();
		},
		get disabled() {
			return options.disabled();
		},
		get required() {
			return options.required();
		},
		get state() {
			return currentState;
		},
		get labelledBy() {
			return labels.joined;
		},
		get describedBy() {
			return hints.joined;
		},
		label: labels.register,
		describe: hints.register
	});
};

/** The enclosing `Field`, or `undefined` when the part is used on its own. */
export const useField = (): FieldContext | undefined => getContext<FieldContext | undefined>(key);
