<script lang="ts">
	import { Input, Label } from '@viamrobotics/prime-ui';

	import Playground from './Playground.svelte';
	import type { Control, ControlValues } from './playground-controls.ts';

	const controls: readonly Control[] = [
		{ name: 'text', type: 'string', default: 'Full name' },
		{ name: 'required', type: 'boolean', default: false },
		{ name: 'disabled', type: 'boolean', default: false }
	];

	const code = (values: ControlValues): string => {
		const text = String(values.text ?? '');
		const attrs: string[] = ['for="example"'];
		if (values.required) attrs.push('required');
		if (values.disabled) attrs.push('disabled');

		return `<Label ${attrs.join(' ')}>\n  ${text}\n</Label>\n<Input.Root id="example" />`;
	};
</script>

<Playground componentName="Label" {controls} {code}>
	{#snippet preview(values)}
		<div class="w-full max-w-xs">
			<Label
				for="playground-label-example"
				required={values.required as boolean}
				disabled={values.disabled as boolean}
			>
				{values.text}
			</Label>
			<Input.Root id="playground-label-example" />
		</div>
	{/snippet}
</Playground>
