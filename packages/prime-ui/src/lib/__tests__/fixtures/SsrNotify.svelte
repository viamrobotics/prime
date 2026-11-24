<script lang="ts">
	import Notify from '../../Notify/Notify.svelte';
	import { provideNotify } from '../../Notify/useNotify.svelte.ts';

	provideNotify({ placement: 'top-end' });
</script>

<Notify label="Alerts" />
