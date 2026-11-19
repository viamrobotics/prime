import { getContext, setContext } from 'svelte';

import type { TabsReorderContext } from './useTabsReorder.svelte.ts';

const key = Symbol('TabsDrag');

export interface DragPoint {
	x: number;
	y: number;
}

export interface TabsDragContext {
	readonly lifted: string | undefined;
	readonly label: string;
	readonly point: DragPoint;
	readonly isChipAtEnd: boolean;
	isChipBefore: (value: string) => boolean;
	lift: (value: string, label: string, point: DragPoint) => boolean;
	follow: (point: DragPoint) => void;
	drop: () => void;
	cancel: () => void;
}

export const provideTabsDrag = (reorder: TabsReorderContext): TabsDragContext => {
	let lifted = $state<string>();
	let liftedLabel = $state('');
	let ghostPoint = $state<DragPoint>({ x: 0, y: 0 });
	let landing = $state(0);

	const otherValues = $derived(reorder.order.filter((value) => value !== lifted));
	const slot = $derived(Math.min(landing, otherValues.length));

	const isBefore = (value: string, x: number) => {
		const rect = reorder.elementOf(value)?.getBoundingClientRect();
		return rect !== undefined && rect.left + rect.width / 2 < x;
	};

	const clear = () => {
		lifted = undefined;
		liftedLabel = '';
	};

	return setContext<TabsDragContext>(key, {
		get lifted() {
			return lifted;
		},
		get label() {
			return liftedLabel;
		},
		get point() {
			return ghostPoint;
		},
		get isChipAtEnd() {
			return lifted !== undefined && slot === otherValues.length;
		},
		isChipBefore: (value) => lifted !== undefined && otherValues[slot] === value,
		lift: (value, label, point) => {
			if (lifted !== undefined || !reorder.order.includes(value)) return false;
			landing = reorder.order.indexOf(value);
			liftedLabel = label;
			ghostPoint = point;
			lifted = value;
			return true;
		},
		follow: (point) => {
			if (lifted === undefined) return;
			ghostPoint = point;
			landing = otherValues.filter((value) => isBefore(value, point.x)).length;
		},
		drop: () => {
			const value = lifted;
			const index = slot;
			clear();
			if (value !== undefined) reorder.move(value, index, { focus: false });
		},
		cancel: clear
	});
};

export const useTabsDrag = (): TabsDragContext | undefined =>
	getContext<TabsDragContext | undefined>(key);
