<!--
@component
An 8px dot showing a state, gray when there is none. It is a `role="img"` named by an `aria-label`, an `aria-labelledby`, or a `label` it applies as its `aria-label`. One is required. With `working`, `working` replaces the dot with an animated glyph in the state's color.

```svelte
<StatusDot state="success" label="Online" />
<StatusDot variant="hollow" label="Not started" />
<StatusDot state="danger" variant="hollow" working label="Reconnecting" />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { AccessibleName } from '../accessible-name.ts';
	import type { StatusDotState, StatusDotVariant } from './status-dot.ts';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-label' | 'aria-labelledby'> {
		/** Which state to show. Leave it out for the gray dot. */
		state?: StatusDotState;
		/** `hollow` draws a ring in the state's color with no fill. @default 'solid' */
		variant?: StatusDotVariant;
		/** Replaces the dot with an animated glyph in the state's color, on the same 8px box. @default false */
		working?: boolean;
	}

	const STATE_CLASSES: Record<StatusDotState, string> = {
		info: 'status-dot-info',
		warning: 'status-dot-warning',
		success: 'status-dot-success',
		danger: 'status-dot-danger',
		disabled: 'status-dot-disabled'
	};

	const {
		state,
		variant = 'solid',
		working = false,
		label,
		'aria-label': ariaLabel,
		class: extraClasses,
		...restProps
	}: Props & AccessibleName = $props();
</script>

<span
	{...restProps}
	role="img"
	aria-label={label ?? ariaLabel}
	class={[
		'status-dot',
		state && STATE_CLASSES[state],
		variant === 'hollow' && 'status-dot-hollow',
		extraClasses
	]}
>
	{#if working}
		<span class="progress-dots" aria-hidden="true"></span>
	{/if}
</span>
