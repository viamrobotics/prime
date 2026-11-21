// bits-ui focuses the day with a bare `focus()` before the panel is positioned, which scrolls the page.
export const focusDayWithoutScrolling = (event: Event) => {
	const focusedDay = document.querySelector<HTMLElement>('[data-bits-day][data-focused]');
	if (!focusedDay) return;

	event.preventDefault();
	focusedDay.focus({ preventScroll: true });
};
