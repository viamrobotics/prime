<!--
@component

A component that renders SVG icons from the @mdi/js package
```svelte
  <Icon
    name='camera-outline'
    size='xl'
  />
```
-->
<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';

	import {
		type CustomIcon,
		type IconName,
		IconPathsByName,
		type IconSize,
		IconSizes
	} from './icons.ts';

	interface Props extends HTMLAttributes<SVGElement> {
		/** The name of the icon. */
		name: IconName;
		/** The size of the icon. */
		size?: IconSize;
	}

	const { name, size = 'base', class: extraClasses, ...restProps }: Props = $props();

	let allPaths = $state<CustomIcon[]>([]);
	let IconComponent = $state<Component<SVGAttributes<SVGElement>>>();

	$effect.pre(() => {
		const pathValue = IconPathsByName[name];
		if (typeof pathValue === 'string') {
			allPaths = [{ path: pathValue }];
			IconComponent = undefined;
		} else if (Array.isArray(pathValue)) {
			allPaths = pathValue.map((icon) => ({
				path: icon.path,
				opacity: 'opacity' in icon ? icon.opacity : undefined
			}));
			IconComponent = undefined;
		} else if (typeof pathValue === 'function') {
			IconComponent = pathValue;
			allPaths = [];
		}
	});
</script>

<!--
  Accessibility approach for icon svgs taken from:
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
-->
{#if IconComponent}
	<IconComponent class={[IconSizes[size], extraClasses]} />
{:else}
	<svg
		class={[IconSizes[size], extraClasses]}
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
		{...restProps}
	>
		{#each allPaths as { path: dAttribute, opacity }, path (path)}
			<path d={dAttribute} {opacity} fill-rule="evenodd" fill="currentColor" />
		{/each}
	</svg>
{/if}
