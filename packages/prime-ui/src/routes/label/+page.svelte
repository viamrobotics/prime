<script lang="ts">
	import { Input, Label } from '$lib';
</script>

<div class="space-y-10">
	<header>
		<h1 class="text-xl font-semibold tracking-tight">Label</h1>
	</header>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">Variants</h2>
		<div class="grid max-w-md grid-cols-1 gap-4 rounded border border-light bg-white p-6">
			<div class="flex flex-col gap-1">
				<Label for="dev-basic">Basic label</Label>
				<Input.Root id="dev-basic" placeholder="Type something" />
			</div>

			<div class="flex flex-col gap-1">
				<Label for="dev-required" required>Required field</Label>
				<p class="text-xs text-gray-6">This field must be filled out to submit the form.</p>
				<Input.Root id="dev-required" placeholder="Must be filled" />
			</div>

			<div class="flex flex-col gap-1">
				<Label for="dev-disabled" disabled>Disabled label</Label>
				<Input.Root id="dev-disabled" disabled value="Read-only value" />
			</div>

			<div class="flex flex-col gap-1">
				<Label for="dev-required-disabled" required disabled>Required + disabled</Label>
				<Input.Root id="dev-required-disabled" disabled />
			</div>
		</div>
	</section>
</div>
