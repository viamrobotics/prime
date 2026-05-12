<!--
@component

An interactive component playground. Renders a live preview, a set of typed
prop controls, and the generated component code. Useful for documentation and
local component development.

```svelte
<Playground
	componentName="Input"
	controls={[
		{ name: 'placeholder', type: 'string', default: '' },
		{ name: 'disabled', type: 'boolean', default: false }
	]}
	preview={(values) => <Input {...values} />}
/>
```
-->
<script lang="ts">
	import { Input, Label } from '@viamrobotics/prime-ui';
	import { untrack, type Snippet } from 'svelte';

	import {
		type Control,
		type ControlValues,
		initialValues,
		renderSnippet
	} from './playground-controls.ts';

	interface Props {
		/** The component name shown in the generated code snippet. */
		componentName: string;
		/** Typed control definitions. Each becomes a knob in the controls panel. */
		controls: readonly Control[];
		/** Snippet that renders the component with the current control values. */
		preview: Snippet<[ControlValues]>;
		/** Override the default code snippet rendering. */
		code?: (values: ControlValues) => string;
	}

	const { componentName, controls, preview, code }: Props = $props();

	let values: ControlValues = $state(untrack(() => initialValues(controls)));

	const snippet = $derived(code ? code(values) : renderSnippet(componentName, controls, values));

	const reset = () => {
		values = initialValues(controls);
	};
</script>

<div class="flex flex-col gap-px overflow-hidden rounded border border-light bg-light text-default">
	<section class="bg-white p-8" aria-label="Live preview">
		<div class="flex min-h-12 items-center justify-center">
			{@render preview(values)}
		</div>
	</section>

	{#if controls.length > 0}
		<section class="bg-white p-4" aria-label="Props">
			<header class="mb-3 flex items-center justify-between">
				<h3 class="text-xs font-semibold tracking-wide uppercase">Props</h3>
				<button
					type="button"
					class="text-xs underline underline-offset-2 hover:no-underline"
					onclick={reset}
				>
					Reset
				</button>
			</header>
			<div class="flex flex-col gap-3">
				{#each controls as control (control.name)}
					{@const id = `playground-control-${control.name}`}
					<div class="flex flex-col gap-1">
						<Label for={id}>
							<span class="font-mono">{control.label ?? control.name}</span>
							{#if control.description}
								<p class="text-xs text-gray-6">{control.description}</p>
							{/if}
						</Label>
						{#if control.type === 'select'}
							<select
								{id}
								class="h-7.5 w-full appearance-none border border-light bg-white px-2 py-1.5 text-xs leading-tight"
								bind:value={values[control.name]}
							>
								{#each control.options as option (option)}
									<option value={option}>{option}</option>
								{/each}
							</select>
						{:else if control.type === 'boolean'}
							<input
								{id}
								type="checkbox"
								class="size-4"
								checked={values[control.name] === true}
								onchange={(event) => {
									values[control.name] = event.currentTarget.checked;
								}}
							/>
						{:else if control.type === 'string'}
							<Input.Root
								{id}
								type="text"
								placeholder={control.placeholder}
								value={values[control.name] as string}
								oninput={(event) => {
									values[control.name] = (event.currentTarget as HTMLInputElement).value;
								}}
							>
								<Input.Icon />
							</Input.Root>
						{:else}
							<Input.Root
								{id}
								type="number"
								min={control.min}
								max={control.max}
								step={control.step}
								value={values[control.name] as number}
								oninput={(event) => {
									const target = event.currentTarget as HTMLInputElement;
									const parsed = Number.parseFloat(target.value);
									values[control.name] = Number.isNaN(parsed) ? control.default : parsed;
								}}
							>
								<Input.Icon />
							</Input.Root>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section class="bg-white p-4" aria-label="Generated code">
		<header class="mb-3 flex items-center justify-between">
			<h3 class="text-xs font-semibold tracking-wide uppercase">Code</h3>
		</header>
		<pre class="overflow-x-auto bg-light p-3 font-mono text-xs leading-relaxed"><code
				>{snippet}</code
			></pre>
	</section>
</div>
