export function joinDescribedBy(
	ids: readonly (string | false | null | undefined)[]
): string | undefined {
	return ids.filter(Boolean).join(' ') || undefined;
}

/**
 * The id of the hidden hint description beside the control with `controlId`, which the control
 * lists in `aria-describedby`.
 */
export function hintIdFor(controlId: string): string {
	return `${controlId}-hint`;
}
