export function createAttachedElements() {
	const elements = new Set<HTMLElement>();

	return {
		attach(element: HTMLElement) {
			elements.add(element);
			return () => elements.delete(element);
		},
		includes(candidate: EventTarget) {
			return [...elements].some((element) => element === candidate);
		},
		get latest() {
			return [...elements].at(-1);
		}
	};
}
