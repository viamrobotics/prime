export const CLOSE_KEYSHORTCUT = 'Delete';

export const isCloseKey = (
	event: Pick<KeyboardEvent, 'key' | 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey'>
): boolean =>
	event.key === CLOSE_KEYSHORTCUT &&
	!event.altKey &&
	!event.shiftKey &&
	!event.ctrlKey &&
	!event.metaKey;

export const closedMessage = (label: string): string => `${label} closed.`;
