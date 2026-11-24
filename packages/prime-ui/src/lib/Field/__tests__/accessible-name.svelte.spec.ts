import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import NamedWidget from './fixtures/NamedWidget.svelte';

const controls = [
	{ control: 'Checkbox', labelable: true },
	{ control: 'Switch', labelable: true },
	{ control: 'Select.Trigger', labelable: true },
	{ control: 'Combobox.Input', labelable: true },
	{ control: 'RadioGroup', labelable: false },
	{ control: 'ToggleButtons', labelable: false },
	{ control: 'DatePicker.Field', labelable: false },
	{ control: 'DateRangePicker.Field', labelable: false }
] as const;

const namings = [
	{ naming: 'none', warnings: 1, needsLabelable: false },
	{ naming: 'field', warnings: 0, needsLabelable: false },
	{ naming: 'aria-label', warnings: 0, needsLabelable: false },
	{ naming: 'label-for', warnings: 0, needsLabelable: true }
] as const;

const cases = controls.flatMap(({ control, labelable }) =>
	namings
		.filter((row) => labelable || !row.needsLabelable)
		.map(({ naming, warnings }) => ({ control, naming, warnings }))
);

const settle = () => new Promise((resolve) => setTimeout(resolve));

describe('widget accessible name warning', () => {
	afterEach(async () => {
		vi.restoreAllMocks();
		if (document.querySelector('[role="listbox"]')) await userEvent.keyboard('{Escape}');
	});

	it.each(cases)(
		'$control named by $naming logs $warnings unnamed warnings',
		async ({ control, naming, warnings }) => {
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			render(NamedWidget, { props: { control, naming } });
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
