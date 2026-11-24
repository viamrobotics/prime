import type { FieldState } from './state.ts';

/** What a `Field` shares with the label, control, and hints inside it. */
export interface FieldContext {
	/** Id the field assigns to its control. `Label` points its `for` here. */
	readonly controlId: string;
	readonly disabled: boolean;
	readonly required: boolean;
	readonly state: FieldState;
	/** The field's `label`. A `Label` with no children renders it, and with no `Label` placed the control takes it as its `aria-label`. */
	readonly labelText: string | undefined;
	/** The field's `aria-label`, which the control takes as its own. */
	readonly ariaLabel: string | undefined;
	/** The field's `aria-labelledby`, which the control takes when no `Label` is placed. */
	readonly ariaLabelledBy: string | undefined;
	/** Space-joined ids of the registered labels, for `aria-labelledby`. */
	readonly labelledBy: string | undefined;
	/** Space-joined ids of the registered hints, for `aria-describedby`. */
	readonly describedBy: string | undefined;
	/** Register a label by id. Returns the unregister function. */
	label: (id: string) => () => void;
	/** Register a hint by id. Returns the unregister function. */
	describe: (id: string) => () => void;
}
