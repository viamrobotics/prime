<script lang="ts">
	import { Icon, Input, Label } from '$lib';
</script>

<div class="max-w-2xl space-y-4">
	<h1 class="text-2xl font-semibold tracking-tight">prime-ui sandbox</h1>

	<section class="max-w-md space-y-4 border border-light bg-white p-6">
		<header class="flex items-center gap-2">
			<Icon name="robot-outline" size="lg" />
			<h2 class="text-base font-medium">Create a machine</h2>
		</header>

		<div class="flex flex-col gap-1">
			<Label for="machine-name" required>Name</Label>
			<p class="text-xs text-gray-6">Must contain only letters, numbers, and dashes.</p>
			<Input.Root id="machine-name" placeholder="my-machine" />
		</div>
	</section>
</div>
