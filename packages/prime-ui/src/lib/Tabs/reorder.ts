const STEP_BY_ARROW: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export const REORDER_KEYSHORTCUTS = 'Alt+Shift+ArrowLeft Alt+Shift+ArrowRight';

export const reorderStepOf = (
	event: Pick<KeyboardEvent, 'key' | 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey'>
): number | undefined => {
	if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return undefined;
	return STEP_BY_ARROW[event.key];
};

export const moveTo = (
	order: readonly string[],
	value: string,
	index: number
): string[] | undefined => {
	const from = order.indexOf(value);
	if (from < 0 || index < 0 || index >= order.length || index === from) return undefined;
	const next = order.filter((existing) => existing !== value);
	next.splice(index, 0, value);
	return next;
};

export const sameOrder = (previous: readonly string[], next: readonly string[]): boolean =>
	previous.length === next.length && previous.every((value, index) => value === next[index]);

export const reorderedMessage = (label: string, position: number, total: number): string =>
	`${label} moved to position ${position} of ${total}.`;
