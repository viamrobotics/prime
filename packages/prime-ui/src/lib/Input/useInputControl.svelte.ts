import { FieldStates, type FieldState } from '../Field/state.ts';
import { controlName, useField } from '../Field/useField.svelte.ts';

type Maybe<TValue> = TValue | null | undefined;

interface InputControlOptions {
	id: () => Maybe<string>;
	disabled: () => Maybe<boolean>;
	required: () => Maybe<boolean>;
	state: () => FieldState | undefined;
	describedBy: () => Maybe<string>;
	ariaLabel: () => Maybe<string>;
	ariaLabelledBy: () => Maybe<string>;
}

// The Field wiring every native input shares, one bag spread after the rest props. The `input`
// class styles from these attributes, so each one must land on the element.
export const useInputControl = (options: InputControlOptions) => {
	const field = useField();

	const state = $derived(options.state() ?? field?.state ?? FieldStates.None);
	const attributes = $derived({
		id: options.id() ?? field?.controlId,
		disabled: options.disabled() ?? field?.disabled ?? false,
		required: options.required() ?? field?.required ?? false,
		'aria-describedby': options.describedBy() ?? field?.describedBy,
		...controlName(field, {
			ariaLabel: options.ariaLabel(),
			ariaLabelledBy: options.ariaLabelledBy()
		}),
		'aria-invalid': state === FieldStates.Error || undefined,
		'data-field-state': state === FieldStates.None ? undefined : state
	});

	return {
		get attributes() {
			return attributes;
		}
	};
};
