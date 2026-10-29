const REORDER_STEP_BY_ARROW = new Map([
	['ArrowLeft', -1],
	['ArrowRight', 1]
]);

export function targetIndexFor(key: string, index: number, count: number) {
	switch (key) {
		case 'ArrowRight':
			return (index + 1) % count;
		case 'ArrowLeft':
			return (index - 1 + count) % count;
		case 'Home':
			return 0;
		case 'End':
			return count - 1;
		default:
			return undefined;
	}
}

export function reorderStepOf(
	event: Pick<KeyboardEvent, 'key' | 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey'>
) {
	if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return undefined;
	return REORDER_STEP_BY_ARROW.get(event.key);
}
