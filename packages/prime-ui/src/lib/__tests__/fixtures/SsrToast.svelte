<script lang="ts">
	import Toast from '../../Toast/Toast.svelte';
	import { provideToast } from '../../Toast/useToast.svelte.ts';

	provideToast({ placement: 'bottom-end' });
</script>

<Toast label="Messages" />
