<script lang="ts">
	import { mdiMenuDown, mdiMenuUp } from '@mdi/js';

	import Icon from '../Icon/Icon.svelte';

	type Direction = 'up' | 'down';

	const HOLD_DELAY_MS = 400;
	const REPEAT_INTERVAL_MS = 60;
	const BUTTONS: { direction: Direction; icon: string }[] = [
		{ direction: 'up', icon: mdiMenuUp },
		{ direction: 'down', icon: mdiMenuDown }
	];

	let stopHold: (() => void) | undefined;

	const inputBeside = (button: HTMLButtonElement) =>
		button
			.closest('[data-number-stepper]')
			?.parentElement?.querySelector<HTMLInputElement>(':scope > input[type="number"]');

	const isLocked = (input: HTMLInputElement) => input.matches(':disabled') || input.readOnly;

	const stepOnce = (input: HTMLInputElement, direction: Direction) => {
		const step = input.getAttribute('step');
		// `stepUp` throws under `step="any"`, where a native spin button steps by the default step of 1.
		const isAnyStep = step?.toLowerCase() === 'any';
		if (isAnyStep) input.removeAttribute('step');
		try {
			if (direction === 'up') input.stepUp();
			else input.stepDown();
		} finally {
			if (isAnyStep) input.setAttribute('step', step);
		}
	};

	const spin = (input: HTMLInputElement, direction: Direction) => {
		if (isLocked(input)) return;
		const before = input.value;
		stepOnce(input, direction);
		if (input.value === before) return;
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		input.dispatchEvent(new Event('change', { bubbles: true }));
	};

	const press = (
		event: PointerEvent & { currentTarget: HTMLButtonElement },
		direction: Direction
	) => {
		if (event.button !== 0) return;
		// Keeps focus where it is, as a native spin button does.
		event.preventDefault();
		const input = inputBeside(event.currentTarget);
		if (!input || isLocked(input)) return;

		stopHold?.();
		spin(input, direction);

		const controller = new AbortController();
		let interval: ReturnType<typeof setInterval> | undefined;
		const timeout = setTimeout(() => {
			interval = setInterval(() => spin(input, direction), REPEAT_INTERVAL_MS);
		}, HOLD_DELAY_MS);
		stopHold = () => {
			clearTimeout(timeout);
			clearInterval(interval);
			controller.abort();
			stopHold = undefined;
		};

		const options = { signal: controller.signal };
		window.addEventListener('pointerup', stopHold, options);
		window.addEventListener('pointercancel', stopHold, options);
		window.addEventListener('blur', stopHold, options);
	};

	$effect(() => () => stopHold?.());
</script>

<!-- The spacer holds the stepper's place in the row. The box is positioned against the frame and widened by the frame's right padding, which it inherits, so it meets the border at any frame size. -->
<span aria-hidden="true" class="w-2 shrink-0 self-stretch"></span>
<span
	aria-hidden="true"
	data-number-stepper
	class={[
		'absolute inset-y-0 right-0 box-content w-2 overflow-hidden [padding-right:inherit]',
		'rounded-r-[calc(var(--radius-sm)-1px)] opacity-0 transition-opacity motion-reduce:transition-none',
		'group-focus-within/input:opacity-100 group-hover/input:opacity-100 pointer-coarse:opacity-100',
		'group-has-[>input:disabled]/input:invisible group-has-[>input[readonly]]/input:invisible'
	]}
>
	<span class="absolute inset-0 flex flex-col">
		{#each BUTTONS as { direction, icon } (direction)}
			<button
				type="button"
				tabindex="-1"
				data-step={direction}
				class="flex min-h-0 flex-1 items-center justify-center text-subtle-1 hover:bg-light hover:text-default"
				onpointerdown={(event) => press(event, direction)}
			>
				<Icon {icon} size="xs" />
			</button>
		{/each}
	</span>
</span>
