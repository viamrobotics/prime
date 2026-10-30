import { mdiAlert, mdiAlertCircle, mdiInformation } from '@mdi/js';

export const FieldStates = {
	None: 'none',
	Info: 'info',
	Warn: 'warn',
	Error: 'error'
} as const;

/** Contextual state a `Field` shares with its control, hints, and state icon. */
export type FieldState = (typeof FieldStates)[keyof typeof FieldStates];

/**
 * Type guards for a `FieldState`. Each narrows the value it is given to that one state, so a
 * lookup keyed by state (such as `stateIcon`) needs no cast after the check. `isNone` also
 * accepts `undefined`, which every part treats as `none`.
 */
export const fieldState = {
	isNone: (state: FieldState | undefined): state is typeof FieldStates.None | undefined =>
		state === undefined || state === FieldStates.None,
	isInfo: (state: FieldState | undefined): state is typeof FieldStates.Info =>
		state === FieldStates.Info,
	isWarn: (state: FieldState | undefined): state is typeof FieldStates.Warn =>
		state === FieldStates.Warn,
	isError: (state: FieldState | undefined): state is typeof FieldStates.Error =>
		state === FieldStates.Error
};

/** Icon and color class for each state except `none`. */
export const stateIcon = {
	info: { icon: mdiInformation, class: 'text-info-dark' },
	warn: { icon: mdiAlert, class: 'text-warning-text' },
	error: { icon: mdiAlertCircle, class: 'text-danger-dark' }
} as const;
