<!--
@component
Renders a curated icon by name (see `icons.ts`), or with a passed Svelte component.

```svelte
<Icon icon="viam-service" size="lg" />
```
-->
<script lang="ts" module>
	import type { IconSize } from './icons.js';

	const sizes = {
		xs: 'size-3',
		sm: 'size-3.5',
		base: 'size-4',
		lg: 'size-5',
		xl: 'size-6',
		'2xl': 'size-7',
		'3xl': 'size-8',
		'4xl': 'size-9'
	} as const;
</script>

<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import { iconMap, type CustomIcon, type IconType } from './icons.js';

	interface Props extends SVGAttributes<SVGElement> {
		/** A curated icon name, or a Svelte icon component to render directly. */
		icon: IconType;

		/** Size token. @default 'base' */
		size?: IconSize;
	}

	const { icon, size = 'base', class: extraClasses = '', ...restProps }: Props = $props();

	const paths = $derived.by<CustomIcon[]>(() => {
		if (typeof icon !== 'string') return [];
		if (!(icon in iconMap)) return [];

		const mapped = iconMap[icon];
		if (typeof mapped === 'string') return [{ path: mapped }];
		if (Array.isArray(mapped)) return mapped;
		return [];
	});
</script>

{#if typeof icon === 'string'}
	<svg
		{...restProps}
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
		class={[sizes[size], extraClasses]}
		data-testid={`icon-${icon}`}
	>
		{#each paths as { path, opacity } (path)}
			<path d={path} {opacity} fill-rule="evenodd" fill="currentColor" />
		{/each}
	</svg>
{:else}
	{@const IconComponent = icon}
	<IconComponent {...restProps} class={[sizes[size], extraClasses]} />
{/if}
