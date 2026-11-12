<!--
@component
A horizontal bar of menus, such as an application's File, Edit, and View. Render a `Menubar.Menu` for each menu inside it.
Left and Right Arrow move focus between the triggers, and while one menu is open they open the neighbouring menu. The ends wrap around.

Built on [bits-ui `Menubar`](https://bits-ui.com/docs/components/menubar).

```svelte
<Menubar>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item onclick={open}>Open</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Menubar } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction, which sets the arrow keys' order. `auto` is not accepted, because the roving focus needs a concrete direction. */
		dir?: 'ltr' | 'rtl';
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Menubar.Root class={['flex items-center gap-0.5', extraClasses]} {...restProps}>
	{@render children?.()}
</Menubar.Root>
