<!--
@component
A compact number field for tool panels: a native `<input type="number">` that steps by keyboard and,
when it has a visible `label`, scrubs by dragging that label sideways. A scrub writes `value` on
every pointer move, so a function binding sees each intermediate value and can throttle or veto.
ArrowUp and ArrowDown step by `step`, and a scrub moves `step` per pixel. Hold Shift for 10 times
that and Alt for a tenth. Both clamp to `min` and `max`, while typing stays unclamped. Up and down
buttons at the frame's right edge step the same way on a pointer press and repeat while held.

```svelte
<NumberField label="Speed" min={0} max={10} step={0.1} bind:value />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';
	import type { AccessibleName } from '../accessible-name.ts';

	import { type FieldState, Input, NumberInput } from '@viamrobotics/prime-ui';

	import ControlLabel from '../Hint/ControlLabel.svelte';
	import { hintIdFor, joinDescribedBy } from '../Hint/described-by.ts';
	import Hint from '../Hint/Hint.svelte';
	import { type Bounds, clamp, settle, startingValue, stepMultiplier } from './number-step.ts';
	import NumberStepper from './NumberStepper.svelte';

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

		/**
		 * Help text, shown in a tooltip from an info button beside the label, and the control's
		 * accessible description. Needs a visible `label`.
		 */
		hint?: string;

		/**
		 * Short text such as a unit, drawn after the value and part of the control's accessible
		 * description.
		 */
		suffix?: string;

		/**
		 * Content drawn after any `suffix` and before the stepper, such as an icon button that acts
		 * on this field. Content that keeps its box while hidden, as `invisible` does, keeps the
		 * input's width fixed.
		 */
		trailing?: Snippet;

		/**
		 * Contextual state. `warn` draws the `warning-dark` border. `error` draws the `danger-dark`
		 * border and sets `aria-invalid`. `info` changes no border. The input sits in a prime-ui
		 * `Input.Group`, which wears the border.
		 */
		state?: FieldState;

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
		hint,
		suffix,
		trailing,
		state,
		labelPlacement = 'outside',
		min,
		max,
		step = 1,
		id: providedId,
		class: extraClasses,
		disabled,
		readonly,
		onkeydown,
		'aria-describedby': ariaDescribedby,
		...restProps
	}: Props & AccessibleName = $props();

	const PLACEMENT_CLASSES = {
		outside: {
			root: 'flex items-center gap-2',
			label: '',
			group: 'min-w-0 flex-1 input-compact'
		},
		inset: {
			root: 'relative flex items-center',
			label: 'absolute top-1/2 left-px h-6 -translate-y-1/2 justify-center',
			// `input-compact` sets its padding on a doubled class, which outranks a plain `pl-*` utility.
			group: 'min-w-0 flex-1 input-compact pl-7!'
		}
	} as const;

	// The frame draws its own stepper as its last item, so the browser's is hidden.
	const INPUT_CLASS =
		'min-w-0 flex-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

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
	const hintId = $derived(hintIdFor(id));
	const suffixId = $derived(`${id}-suffix`);
	const describedBy = $derived(
		joinDescribedBy([
			ariaDescribedby,
			Boolean(label && hint) && hintId,
			Boolean(suffix) && suffixId
		])
	);
	const isLocked = $derived(Boolean(disabled) || Boolean(readonly));
	const placementClasses = $derived(PLACEMENT_CLASSES[labelPlacement]);

	function write(next: number) {
		if (next !== value) value = next;
	}

	function stepBy(direction: number, modifiers: { shiftKey: boolean; altKey: boolean }) {
		if (isLocked) return;
		const multiplier = stepMultiplier(modifiers);
		const base = startingValue(value, bounds);
		write(settle(base + direction * step * multiplier, step, multiplier, bounds));
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		onkeydown?.(event);
		const direction = STEP_KEYS[event.key];
		if (event.defaultPrevented || direction === undefined || isLocked) return;

		event.preventDefault();
		stepBy(direction, event);
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
	<ControlLabel
		for={id}
		{label}
		hint={labelPlacement === 'outside' ? hint : undefined}
		disabled={Boolean(disabled)}
		class={[placementClasses.label, !isLocked && 'cursor-ew-resize touch-none select-none']}
		onpointerdown={handleLabelPointerdown}
	/>
	<Input.Group class={['group/number-field', placementClasses.group]}>
		<NumberInput
			{...restProps}
			{id}
			{min}
			{max}
			{step}
			{disabled}
			{readonly}
			{state}
			aria-describedby={describedBy}
			bind:value
			onkeydown={handleKeydown}
			class={INPUT_CLASS}
		/>
		{#if suffix}
			<span id={suffixId} class="shrink-0 text-subtle-2">{suffix}</span>
		{/if}
		{@render trailing?.()}
		<NumberStepper onstep={stepBy} {isLocked} />
	</Input.Group>
	<!-- An inset label sits inside the input's left edge, so its hint goes after the input. -->
	{#if label && hint && labelPlacement === 'inset'}
		<Hint {label} {hint} descriptionId={hintId} disabled={Boolean(disabled)} class="ml-1" />
	{/if}
</div>
