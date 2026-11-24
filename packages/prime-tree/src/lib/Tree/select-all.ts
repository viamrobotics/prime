const isEditable = (target: EventTarget | null) =>
	target instanceof HTMLElement &&
	(target.isContentEditable || target.closest('input, textarea, select') !== null);

export function isSelectAllKey(event: KeyboardEvent): boolean {
	if (event.defaultPrevented || event.altKey || event.shiftKey) return false;
	if (!event.ctrlKey && !event.metaKey) return false;
	return event.key.toLowerCase() === 'a' && !isEditable(event.target);
}
