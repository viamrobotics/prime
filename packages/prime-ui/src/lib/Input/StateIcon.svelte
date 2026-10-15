<!--
@component
Shows the validation-state icon for the enclosing [`Input`](./Input.svelte).
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Icon from '../Icon/Icon.svelte';
	import { InputStates, stateIcon } from './state.ts';
	import { useInput } from './useInput.svelte.ts';

	const { class: extraClasses, ...restProps }: SVGAttributes<SVGElement> = $props();

	const input = useInput();

	const icon = $derived(input.state === InputStates.None ? undefined : stateIcon[input.state]);
</script>

{#if icon}
	<Icon {...restProps} icon={icon.icon} class={[icon.class, extraClasses]} />
{/if}
