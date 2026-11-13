<!--
@component
A compact number field for tool panels: a native `<input type="number">` that steps by keyboard and,
when it has a visible `label`, scrubs by dragging that label sideways. A scrub writes `value` on
every pointer move, so a function binding sees each intermediate value and can throttle or veto.
ArrowUp and ArrowDown step by `step`, and a scrub moves `step` per pixel. Hold Shift for 10 times
that and Alt for a tenth. Both clamp to `min` and `max`, while typing stays unclamped.

```svelte
<NumberField label="Speed" min={0} max={10} step={0.1} bind:value />
```
-->
<script lang="ts">
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

	import { NumberInput } from '@viamrobotics/prime-ui';

	import { CONTROL_LABEL_CLASS } from '../control-label.ts';
	import { type Bounds, clamp, settle, startingValue, stepMultiplier } from './number-step.ts';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'min' | 'max' | 'step' | 'type' | 'children' | 'class'
	> {
		/** Current value. An empty field is `undefined`. */
		value?: number;

		/**
		 * Visible label, rendered before the input. Dragging it sideways scrubs the value. Without
		 * it, pass `aria-label` or `aria-labelledby`, and the field does not scrub.
		 */
		label?: string;

		/** The minimum value a scrub or a key press reaches. */
		min?: number;

		/** The maximum value a scrub or a key press reaches. */
		max?: number;

		/**
		 * The amount one key press or one pixel of scrub moves the value. Shift multiplies it by 10
		 * and Alt by 0.1. @default 1
		 */
		step?: number;

		/**
		 * Where the visible `label` sits. `'outside'` puts it before the input. `'inset'` draws it
		 * inside the input's left edge as a prefix, which fits a short label such as one axis
		 * letter. @default 'outside'
		 */
		labelPlacement?: 'outside' | 'inset';

		/** Classes for the root element, which holds the label and the input. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		labelPlacement = 'outside',
		min,
		max,
		step = 1,
		id: providedId,
		class: extraClasses,
		disabled,
		readonly,
		onkeydown,
		...restProps
	}: Props & AccessibleName = $props();

	type AccessibleName =
		| { label: string }
		| { 'aria-label': string }
		| { 'aria-labelledby': string };

	const PLACEMENT_CLASSES = {
		outside: {
			root: 'flex items-center gap-1',
			label: 'flex min-h-6 min-w-6 shrink-0 items-center',
			input: 'min-w-0 flex-1 input-compact'
		},
		inset: {
			root: 'relative flex items-center',
			label:
				'absolute top-1/2 left-px flex h-6 min-w-6 -translate-y-1/2 items-center justify-center',
			// `input-compact` sets its padding on a doubled class, which outranks a plain `pl-*` utility.
			input: 'min-w-0 flex-1 input-compact pl-7!'
		}
	} as const;

	const SCRUB_THRESHOLD_PX = 4;
	const STEP_KEYS: Record<string, number> = { ArrowUp: 1, ArrowDown: -1 };

	const generatedId = $props.id();
	const id = $derived(providedId ?? generatedId);
	const bounds: Bounds = {
		get min() {
			return min;
		},
		get max() {
			return max;
		}
	};
	const isLocked = $derived(Boolean(disabled) || Boolean(readonly));
	const placementClasses = $derived(PLACEMENT_CLASSES[labelPlacement]);

	function write(next: number) {
		if (next !== value) value = next;
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		onkeydown?.(event);
		const direction = STEP_KEYS[event.key];
		if (event.defaultPrevented || direction === undefined || isLocked) return;

		event.preventDefault();
		const multiplier = stepMultiplier(event);
		const base = startingValue(value, bounds);
		write(settle(base + direction * step * multiplier, step, multiplier, bounds));
	}

	function swallowNextClick(label: HTMLLabelElement) {
		const controller = new AbortController();
		label.addEventListener(
			'click',
			(event) => {
				event.preventDefault();
				event.stopPropagation();
			},
			{ capture: true, once: true, signal: controller.signal }
		);
		// The click follows the release in the same task, so one that never comes must not swallow a later click.
		setTimeout(() => controller.abort());
	}

	function handleLabelPointerdown(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
		const label = event.currentTarget;
		if (event.button !== 0 || isLocked || label.control?.matches(':disabled')) return;

		const pointerId = event.pointerId;
		const pressX = event.clientX;
		let lastX = pressX;
		let isScrubbing = false;
		let accumulated = startingValue(value, bounds);
		const controller = new AbortController();
		const options = { capture: true, signal: controller.signal };

		function handlePointermove(move: PointerEvent) {
			if (move.pointerId !== pointerId) return;
			if (!isScrubbing && Math.abs(move.clientX - pressX) < SCRUB_THRESHOLD_PX) return;

			isScrubbing = true;
			const multiplier = stepMultiplier(move);
			accumulated = clamp(accumulated + (move.clientX - lastX) * step * multiplier, bounds);
			lastX = move.clientX;
			write(settle(accumulated, step, multiplier, bounds));
		}

		function handlePointerend(end: PointerEvent) {
			if (end.pointerId !== pointerId) return;
			controller.abort();
			if (isScrubbing) swallowNextClick(label);
		}

		// Window listeners follow the pointer off the label, and attach synchronously so the first move is not missed.
		window.addEventListener('pointermove', handlePointermove, options);
		window.addEventListener('pointerup', handlePointerend, options);
		window.addEventListener('pointercancel', handlePointerend, options);
	}
</script>

<div class={[placementClasses.root, extraClasses]}>
	{#if label}
		<label
			for={id}
			class={[
				placementClasses.label,
				CONTROL_LABEL_CLASS,
				!isLocked && 'cursor-ew-resize touch-none select-none'
			]}
			onpointerdown={handleLabelPointerdown}
		>
			{label}
		</label>
	{/if}
	<NumberInput
		{...restProps}
		{id}
		{min}
		{max}
		{step}
		{disabled}
		{readonly}
		bind:value
		onkeydown={handleKeydown}
		class={placementClasses.input}
	/>
</div>
