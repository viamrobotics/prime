<script lang="ts">
	import { Input } from '$lib';
</script>

<div class="space-y-10">
	<header>
		<h1 class="text-xl font-semibold tracking-tight">Input</h1>
	</header>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">Basics</h2>
		<div class="border-light grid max-w-md grid-cols-1 gap-3 rounded border bg-white p-6">
			<Input.Root placeholder="Empty with placeholder" />
			<Input.Root value="Filled value" />
			<Input.Root placeholder="Disabled" disabled />
			<Input.Root value="Read-only value" readonly />
			<Input.Root type="number" value={42} />
			<Input.Root type="password" value="secret" />
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-sm font-semibold tracking-wide uppercase">States (with Icon)</h2>
		<div class="border-light grid max-w-md grid-cols-1 gap-3 rounded border bg-white p-6">
			<Input.Root state="info" value="state=info">
				<Input.Icon />
			</Input.Root>
			<Input.Root state="warn" value="state=warn">
				<Input.Icon />
			</Input.Root>
			<Input.Root state="error" value="state=error">
				<Input.Icon />
			</Input.Root>
		</div>
	</section>
</div>
