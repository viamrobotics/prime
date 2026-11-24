<!--
@component
Wraps an input with leading or trailing content, such as an icon, a unit suffix, or a state
icon. The group wears the `input` class from `@viamrobotics/tailwind-config`, and the [`Input`](./Input.svelte) or
[`NumberInput`](./NumberInput.svelte) directly inside it hands over its border, padding, and
focus ring. A [`NumberInput.Stepper`](./NumberInputStepper.svelte) placed last steps the
`NumberInput`. Clicking the group's padding or any non-interactive content focuses the input. A press on a
button, a link, a form control, a `<summary>`, an element with a `tabindex`, editable content, or
an element with `role="button"` stays with that element.

A disabled or readonly input restyles the group, and the input's `error` or `warn` state colors
the group's border. The group reads the input's attributes in CSS, so restyling runs no
JavaScript. Only an `<input>` counts, so a disabled button beside it leaves the group alone.

```svelte
<Input.Group>
	<Icon icon={mdiMagnify} class="text-subtle-2" />
	<Input placeholder="Search" aria-label="Search" bind:value />
	<Field.StateIcon state="error" />
</Input.Group>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { interactiveDescendantAt } from '../interactive-descendant.ts';
	import SpinButtons from './SpinButtons.svelte';
	import { provideInputGroup } from './useInputGroup.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The input plus any content before or after it, in any order. */
		children?: Snippet;
	}

	const { class: extraClasses, children, onpointerdown, ...restProps }: Props = $props();

	let numberInputs = $state(0);
	let placedSteppers = $state(0);

	provideInputGroup({
		addNumberInput: () => {
			numberInputs += 1;
			return () => (numberInputs -= 1);
		},
		addStepper: () => {
			placedSteppers += 1;
			return () => (placedSteppers -= 1);
		}
	});

	const focusInput = (event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		onpointerdown?.(event);
		const group = event.currentTarget;
		if (event.defaultPrevented || interactiveDescendantAt(event.target, group)) return;

		event.preventDefault();
		group.querySelector('input')?.focus();
	};
</script>

<div
	{...restProps}
	onpointerdown={focusInput}
	class={[
		'group/input relative inline-flex input items-center gap-1 focus-ring-within',
		extraClasses
	]}
>
	{@render children?.()}
	{#if numberInputs > 0 && placedSteppers === 0}
		<SpinButtons />
	{/if}
</div>
