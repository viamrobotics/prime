import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import NamedControl from './fixtures/NamedControl.svelte';

const controls = ['Input', 'NumberInput', 'Textarea', 'FileInput'] as const;

const namings = [
	{ naming: 'none', warnings: 1 },
	{ naming: 'field', warnings: 0 },
	{ naming: 'aria-label', warnings: 0 },
	{ naming: 'label-for', warnings: 0 }
] as const;

const settle = () => new Promise((resolve) => setTimeout(resolve));

describe('accessible name warning', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it.each(controls.flatMap((control) => namings.map((row) => ({ control, ...row }))))(
		'$control named by $naming logs $warnings unnamed warnings',
		async ({ control, naming, warnings }) => {
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			render(NamedControl, { props: { control, naming } });
			await settle();

			expect(
				warn.mock.calls.filter(
					([message]) =>
						message ===
						`prime-ui: ${control} has no accessible name. Give its Field a label, aria-label, or aria-labelledby, or give the control one.`
				)
			).toHaveLength(warnings);
		}
	);
});
