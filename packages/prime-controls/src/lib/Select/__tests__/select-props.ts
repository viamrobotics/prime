import type { ComponentProps, Snippet } from 'svelte';

import type { Select } from '../select.ts';

type SelectProps = ComponentProps<typeof Select>;

declare const parts: Snippet;

export const composed: SelectProps = { children: parts };

export const childless: SelectProps = { 'aria-label': 'Mode', placeholder: 'Pick a mode' };

export const childlessLabelledby: SelectProps = { 'aria-labelledby': 'mode-label' };

// @ts-expect-error children and an accessible name cannot mix
export const composedWithName: SelectProps = { children: parts, 'aria-label': 'Mode' };

// @ts-expect-error children and a placeholder cannot mix
export const composedWithPlaceholder: SelectProps = { children: parts, placeholder: 'Pick a mode' };

// @ts-expect-error a childless select needs an accessible name
export const childlessUnnamed: SelectProps = { placeholder: 'Pick a mode' };
