<!--
@component
An 8px dot showing a state, gray when there is none. It is a `role="img"` named by `label`, and `working` replaces the dot with an animated glyph in the state's color.

```svelte
<StatusDot state="success" label="Online" />
<StatusDot variant="hollow" label="Not started" />
<StatusDot state="danger" variant="hollow" working label="Reconnecting" />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { StatusDotState, StatusDotVariant } from './status-dot.ts';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Which state to show. Leave it out for the gray dot. */
		state?: StatusDotState;
		/** `hollow` draws a ring in the state's color with no fill. @default 'solid' */
		variant?: StatusDotVariant;
		/** Replaces the dot with an animated glyph in the state's color, on the same 8px box. @default false */
		working?: boolean;
		/** The accessible name. A dot has no text of its own, so this is required. */
		label: string;
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
		class: extraClasses,
		...restProps
	}: Props = $props();
</script>

<span
	{...restProps}
	role="img"
	aria-label={label}
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
