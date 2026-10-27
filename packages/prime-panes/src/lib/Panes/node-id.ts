const ID_BYTE_COUNT = 16;

export function createNodeId(): string {
	if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
	const bytes = crypto.getRandomValues(new Uint8Array(ID_BYTE_COUNT));
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
