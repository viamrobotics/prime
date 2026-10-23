export function createAttachedElements() {
	const elements = new Set<HTMLElement>();

	return {
		attach(element: HTMLElement) {
			elements.add(element);
			return () => elements.delete(element);
		},
		get latest() {
			return [...elements].at(-1);
		}
	};
}
