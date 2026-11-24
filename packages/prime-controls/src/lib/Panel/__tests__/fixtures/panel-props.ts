import type { ComponentProps } from 'svelte';

import type Panel from '../../Panel.svelte';

type PanelProps = ComponentProps<typeof Panel>;

export const titled: PanelProps = { title: 'Camera' };

export const named: PanelProps = { 'aria-label': 'Camera' };

export const labelledby: PanelProps = { 'aria-labelledby': 'camera-title' };

// @ts-expect-error a panel needs a title, aria-label, or aria-labelledby
export const unnamed: PanelProps = {};
