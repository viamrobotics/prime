<!--
@component
The up and down buttons at the right edge of a [`NumberField`](./NumberField.svelte)'s frame. They
stand in for the browser's own spin buttons, which sit inside the input and so land left of a
suffix. A press steps once, and a held press repeats. Like the native ones they are for a pointer
only: they take no focus and are hidden from assistive technology, since the input is already a
spinbutton that steps on ArrowUp and ArrowDown. They show while the frame is hovered or holds
focus, and always under a coarse pointer, which has no hover. Otherwise they keep their box, so
the field never changes width. A disabled input, including one in a disabled `<fieldset>`, hides
them and leaves them inert.
-->
<script lang="ts">
	import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
	import { Icon } from '@viamrobotics/prime-ui';

	type Direction = 1 | -1;

	interface Props {
		/** Called once per press, then again on each repeat while the press is held. */
		onstep: (direction: Direction, modifiers: { shiftKey: boolean; altKey: boolean }) => void;

		/** A disabled or read-only field keeps the stepper's box and hides it. */
		isLocked: boolean;
	}

	const { onstep, isLocked }: Props = $props();

	const HOLD_DELAY_MS = 400;
	const REPEAT_INTERVAL_MS = 60;
	const BUTTONS: { direction: Direction; name: string; icon: string }[] = [
		{ direction: 1, name: 'Step up', icon: mdiChevronUp },
		{ direction: -1, name: 'Step down', icon: mdiChevronDown }
	];

	let stopHold: (() => void) | undefined;

	function handlePointerdown(
		event: PointerEvent & { currentTarget: HTMLButtonElement },
		direction: Direction
	) {
		// A button inside a disabled fieldset is `:disabled`, as the input beside it is.
		if (event.button !== 0 || event.currentTarget.matches(':disabled')) return;
		// Keeps focus where it is, as a native spin button does.
		event.preventDefault();
		stopHold?.();
		onstep(direction, event);

		const controller = new AbortController();
		let interval: ReturnType<typeof setInterval> | undefined;
		const timeout = setTimeout(() => {
			interval = setInterval(() => onstep(direction, event), REPEAT_INTERVAL_MS);
		}, HOLD_DELAY_MS);
		stopHold = () => {
			clearTimeout(timeout);
			clearInterval(interval);
			controller.abort();
			stopHold = undefined;
		};

		// Window listeners end the hold wherever the pointer is released.
		const options = { signal: controller.signal };
		window.addEventListener('pointerup', stopHold, options);
		window.addEventListener('pointercancel', stopHold, options);
		window.addEventListener('blur', stopHold, options);
	}

	$effect(() => () => stopHold?.());
</script>

<!-- The negative margins fill the frame's padding, so the buttons span its height without growing it. -->
<span
	aria-hidden="true"
	data-number-stepper
	class={[
		'-my-1 -mr-1.5 flex h-6 w-4 shrink-0 flex-col opacity-0 transition-opacity motion-reduce:transition-none',
		'group-focus-within/number-field:opacity-100 group-hover/number-field:opacity-100 pointer-coarse:opacity-100',
		'group-has-[input:disabled]/number-field:invisible',
		isLocked && 'invisible'
	]}
>
	{#each BUTTONS as { direction, name, icon } (direction)}
		<button
			type="button"
			tabindex="-1"
			aria-label={name}
			data-step={direction}
			class="flex flex-1 items-center justify-center rounded-xs text-subtle-1 hover:bg-light hover:text-default"
			onpointerdown={(event) => handlePointerdown(event, direction)}
		>
			<Icon {icon} size="xs" />
		</button>
	{/each}
</span>
