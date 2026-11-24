<!--
@component
A file chooser on a native `<input type="file">`, drawn as one framed row: a prompt, the chosen
file names, and a button that clears them. The native input covers the row, so a click, a drop,
the keyboard, and form submission are the browser's. Inside a [`Field`](../Field/Field.svelte) it
takes its `id` (the field's `controlId`), `disabled`, `required`, `state`, `aria-describedby`, and its
name from there.

```svelte
<Field label="Audio file" class="flex flex-col gap-1">
	<Label />
	<FileInput accept=".wav,.mp3" class="w-64" bind:value />
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

	import { mdiClose, mdiUpload } from '@mdi/js';

	import type { FieldState } from '../Field/state.ts';

	import { accessibleNameWarning } from '../accessible-name-warning.ts';
	import Icon from '../Icon/Icon.svelte';
	import { holdsFiles, toFileList } from './file-list.ts';
	import { useInputControl } from './useInputControl.svelte.ts';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'files' | 'type' | 'children' | 'class' | 'placeholder' | 'readonly'
	> {
		/**
		 * The chosen files, in the order the browser lists them. Without `multiple` it holds at most
		 * one. A cleared input is an empty array.
		 */
		value?: File[];

		/** Text shown while no file is chosen. @default 'No file chosen' */
		placeholder?: string;

		/** Accessible name of the button that clears the choice. @default 'Clear selection' */
		clearLabel?: string;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;

		/**
		 * Replaces the prompt, an upload icon and "Choose file", or "Choose files" with `multiple`.
		 * It is decoration, hidden from assistive technology, which reads the native input.
		 */
		children?: Snippet;

		/** Classes for the root element, the frame that holds the native input. */
		class?: ClassValue;
	}

	let {
		id,
		value = $bindable(),
		placeholder = 'No file chosen',
		clearLabel = 'Clear selection',
		state: fieldState,
		disabled,
		required,
		multiple,
		'aria-describedby': describedBy,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		class: extraClasses,
		children,
		onchange,
		...restProps
	}: Props = $props();

	const control = useInputControl({
		id: () => id,
		disabled: () => disabled,
		required: () => required,
		state: () => fieldState,
		describedBy: () => describedBy,
		ariaLabel: () => ariaLabel,
		ariaLabelledBy: () => ariaLabelledBy
	});

	let input = $state<HTMLInputElement>();

	const files = $derived(value ?? []);
	const names = $derived(files.map((file) => file.name).join(', '));

	const syncNativeInput = () => {
		if (!input || holdsFiles(input.files, files)) return;
		input.files = toFileList(files);
	};

	// Carries a value written from outside to the native input, so a cleared file can be chosen again.
	$effect(syncNativeInput);

	// A form reset empties the native input without a change event, so `value` follows it here.
	$effect(() => {
		const form = input?.form;
		if (!form) return;

		let pendingReset: ReturnType<typeof setTimeout> | undefined;

		const followReset = (event: Event) => {
			// The browser resets its controls after this event's listeners, unless one cancels it.
			pendingReset = setTimeout(() => {
				if (event.defaultPrevented) return;
				value = [];
				syncNativeInput();
			});
		};

		form.addEventListener('reset', followReset);
		return () => {
			form.removeEventListener('reset', followReset);
			clearTimeout(pendingReset);
		};
	});

	const choose: HTMLInputAttributes['onchange'] = (event) => {
		value = Array.from(event.currentTarget.files ?? []);
		// A function binding may have refused the write, which leaves the native input ahead of `value`.
		syncNativeInput();
		onchange?.(event);
	};

	const clear = () => {
		value = [];
		syncNativeInput();
		// The clear button unmounts with the last file, so focus moves to the input before it is lost.
		input?.focus();
	};
</script>

<div
	class={[
		'relative inline-flex input items-center gap-2 focus-ring-within has-[>input:enabled:active]:bg-light',
		extraClasses
	]}
>
	<input
		{...restProps}
		{...control.attributes}
		bind:this={input}
		type="file"
		{multiple}
		onchange={choose}
		{@attach accessibleNameWarning('FileInput')}
		class="absolute inset-0 size-full cursor-pointer opacity-0 file:cursor-pointer disabled:cursor-not-allowed disabled:file:cursor-not-allowed"
	/>
	<span aria-hidden="true" class="flex shrink-0 items-center gap-1 border-r border-light pr-2">
		{#if children}
			{@render children()}
		{:else}
			<Icon icon={mdiUpload} size="sm" />
			{multiple ? 'Choose files' : 'Choose file'}
		{/if}
	</span>
	<span
		class={[
			'min-w-0 flex-1 truncate',
			files.length === 0 && !control.attributes.disabled && 'text-subtle-2'
		]}
	>
		{names || placeholder}
	</span>
	{#if files.length > 0}
		<button
			type="button"
			aria-label={clearLabel}
			disabled={control.attributes.disabled}
			onclick={clear}
			class={[
				'relative -my-1 -mr-1 flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-sm',
				'text-subtle-2 focus-ring hover:text-default active:text-default',
				'disabled:cursor-not-allowed disabled:text-disabled-dark'
			]}
		>
			<Icon icon={mdiClose} size="sm" />
		</button>
	{/if}
</div>
