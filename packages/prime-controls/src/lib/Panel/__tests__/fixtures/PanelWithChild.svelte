<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import Panel from '../../Panel.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof Panel>, 'children'>;

	const props: Props = $props();
</script>

<span id="outer-name">Outside name</span>
<Panel {...props}>
	<span data-testid="child">Child</span>
</Panel>
