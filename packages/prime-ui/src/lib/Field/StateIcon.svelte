<!--
@component
Shows the icon for a `Field`'s state, or for its own `state` prop outside a field. Renders
nothing for `none`. Place it after the input inside an `Input.Group`, or anywhere in the
field.

```svelte
<Field state="error">
	<Label>Email</Label>
	<Input.Group>
		<Input type="email" bind:value />
		<Field.StateIcon />
	</Input.Group>
</Field>
```
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Icon from '../Icon/Icon.svelte';
	import { fieldState, FieldStates, stateIcon, type FieldState } from './state.ts';
	import { useField } from './useField.svelte.ts';

	interface Props extends SVGAttributes<SVGElement> {
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	const { state, class: extraClasses, ...restProps }: Props = $props();

	const field = useField();

	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const icon = $derived(fieldState.isNone(currentState) ? undefined : stateIcon[currentState]);
</script>

{#if icon}
	<Icon {...restProps} icon={icon.icon} class={[icon.class, extraClasses]} />
{/if}
