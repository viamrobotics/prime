<!--
  @component

  For labelling inputs.

```svelte
<Label for="email">Email</Label>
<Input.Root id="email" type="email" />
```
 -->

<script lang="ts">
	import { Label, type WithChildren } from 'bits-ui';

	interface Props extends WithChildren<Label.RootProps> {
		/** Whether or not the label should render as disabled */
		disabled?: boolean;
		/** Whether or not the label should render as required */
		required?: boolean;
	}

	const { required = false, disabled = false, children, ...rest }: Props = $props();
</script>

<Label.Root
	{...rest}
	class={[
		'text-xs',
		!disabled && 'text-subtle-1',
		disabled && 'cursor-not-allowed text-disabled-dark',
		required && 'after:ml-1 after:text-danger-dark after:content-["*"]'
	]}
>
	{@render children?.()}
</Label.Root>
