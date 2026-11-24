import { getContext, setContext, untrack } from 'svelte';

import type { FieldContext } from './context.ts';

import { FieldStates, type FieldState } from './state.ts';

const FIELD_KEY = Symbol('Field');

type Maybe<TValue> = TValue | null | undefined;

interface FieldOptions {
	controlId: () => string;
	disabled: () => boolean;
	required: () => boolean;
	state: () => FieldState | undefined;
	labelText: () => string | undefined;
	ariaLabel: () => string | undefined;
	ariaLabelledBy: () => string | undefined;
}

const createRegistry = () => {
	let ids = $state.raw<string[]>([]);
	const joined = $derived(ids.length > 0 ? ids.join(' ') : undefined);

	const register = (id: string) => {
		// Parts register from an `$effect`, which would otherwise depend on the list it appends to and loop.
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

	return setContext<FieldContext>(FIELD_KEY, {
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
		get labelText() {
			return options.labelText();
		},
		get ariaLabel() {
			return options.ariaLabel();
		},
		get ariaLabelledBy() {
			return options.ariaLabelledBy();
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

export const useField = (): FieldContext | undefined =>
	getContext<FieldContext | undefined>(FIELD_KEY);

interface ControlName {
	'aria-label': string | undefined;
	'aria-labelledby': string | undefined;
}

// The control's own name wins whole, because a field `aria-labelledby` would outrank its `aria-label`.
export const controlName = (
	field: FieldContext | undefined,
	own: { ariaLabel: Maybe<string>; ariaLabelledBy: Maybe<string> }
): ControlName => {
	const ownLabel = own.ariaLabel ?? undefined;
	const ownLabelledBy = own.ariaLabelledBy ?? undefined;
	if (ownLabel !== undefined || ownLabelledBy !== undefined) {
		return { 'aria-label': ownLabel, 'aria-labelledby': ownLabelledBy };
	}
	const labelledBy = field?.labelledBy ?? field?.ariaLabelledBy;
	if (labelledBy !== undefined) return { 'aria-label': undefined, 'aria-labelledby': labelledBy };
	return { 'aria-label': field?.labelText ?? field?.ariaLabel, 'aria-labelledby': undefined };
};
