<!--
@component
A horizontal progress bar. Determinate when `value` is set, indeterminate otherwise, when the fill
slides along the track unless the viewer prefers reduced motion. It is a `progressbar` with the
aria value attributes, named by an `aria-label`, an `aria-labelledby`, or a `label` it applies as its `aria-label`. One is required, because a progressbar has no visible text to name it.

```svelte
<Progress value={uploaded} max={total} label="Upload" />
<Progress label="Connecting" />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { AccessibleName } from '../accessible-name.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby'> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** How far along, from `0` to `max`. Leave it out for an indeterminate bar. */
		value?: number;
		/** The value that fills the bar. @default 100 */
		max?: number;
	}

	const {
		value,
		max = 100,
		label,
		'aria-label': ariaLabel,
		class: extraClasses,
		...restProps
	}: Props & AccessibleName = $props();

	const clamped = $derived(value === undefined ? undefined : Math.min(Math.max(value, 0), max));
	const percent = $derived.by(() => {
		if (clamped === undefined) return undefined;
		return max > 0 ? (clamped / max) * 100 : 0;
	});
</script>

<div
	{...restProps}
	role="progressbar"
	class={['progress', extraClasses]}
	aria-label={label ?? ariaLabel}
	aria-valuemin="0"
	aria-valuemax={max}
	aria-valuenow={clamped}
>
	<div class="progress-fill" style:width={percent === undefined ? undefined : `${percent}%`}></div>
</div>
