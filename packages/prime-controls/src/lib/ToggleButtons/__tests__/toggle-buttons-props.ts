import type { ComponentProps } from 'svelte';

import type { ToggleButtons } from '../toggle-buttons.ts';

type ToggleButtonsProps = ComponentProps<typeof ToggleButtons>;

export const labeled: ToggleButtonsProps = { label: 'Space' };

export const named: ToggleButtonsProps = { 'aria-label': 'Space' };

export const labelledby: ToggleButtonsProps = { 'aria-labelledby': 'space-label' };

// @ts-expect-error a group needs a label or an accessible name
export const unnamed: ToggleButtonsProps = { value: 'local' };
