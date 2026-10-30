import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import DockLeft from '../DockLeft.svelte';
import DockRight from '../DockRight.svelte';

const DOCK_LEFT_PATH =
	'M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM8 19V5H5V19H8ZM10 19H19V5H10V19Z';

const DOCK_RIGHT_PATH =
	'M19 21C19.55 21 20.0208 20.8042 20.4125 20.4125C20.8042 20.0208 21 19.55 21 19V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5V19C3 19.55 3.19583 20.0208 3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H19ZM16 19V5H19V19H16ZM14 19H5V5H14V19Z';

describe('dock glyphs', () => {
	it.each([
		{ name: 'DockLeft', component: DockLeft, expected: DOCK_LEFT_PATH },
		{ name: 'DockRight', component: DockRight, expected: DOCK_RIGHT_PATH }
	])('$name renders the v1 path', ({ component, expected }) => {
		const { container } = render(component);

		const paths = container.querySelectorAll('svg path');
		expect(paths).toHaveLength(1);
		expect(paths[0]?.getAttribute('d')).toBe(expected);
	});
});
