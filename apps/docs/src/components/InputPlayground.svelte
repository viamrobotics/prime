<script lang="ts">
	import { Input, type InputState } from '@viamrobotics/prime-ui';

	import Playground from './Playground.svelte';
	import type { Control } from './playground-controls.ts';

	const controls: readonly Control[] = [
		{
			name: 'state',
			type: 'select',
			options: ['none', 'info', 'warn', 'error'],
			default: 'none'
		},
		{
			name: 'type',
			type: 'select',
			options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
			default: 'text'
		},
		{ name: 'placeholder', type: 'string', default: 'Type something...' },
		{ name: 'disabled', type: 'boolean', default: false },
		{ name: 'readonly', type: 'boolean', default: false }
	];
</script>

<Playground componentName="Input" {controls}>
	{#snippet preview(values)}
		<div class="w-full max-w-xs">
			<Input.Root
				state={values.state as InputState}
				type={values.type as string}
				placeholder={values.placeholder as string}
				disabled={values.disabled as boolean}
				readonly={values.readonly as boolean}
			>
				<Input.Icon />
			</Input.Root>
		</div>
	{/snippet}
</Playground>
