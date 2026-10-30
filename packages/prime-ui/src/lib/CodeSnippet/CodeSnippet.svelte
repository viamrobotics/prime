<!--
@component
A read-only block of highlighted code with a copy button.

```svelte
<CodeSnippet language="json" code={'{ "enabled": true }'} />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiCheck, mdiContentCopy } from '@mdi/js';
	import { onDestroy, type Snippet } from 'svelte';

	import type { CodeSnippetLanguage } from './language.ts';

	import Icon from '../Icon/Icon.svelte';
	import { highlight } from './highlight.ts';

	interface Props extends HTMLAttributes<HTMLElement> {
		/** The code to render, verbatim. */
		code: string;
		/** The grammar `code` is highlighted with. */
		language: CodeSnippetLanguage;
		/**
		 * Wraps long lines instead of scrolling them horizontally.
		 * @default false
		 */
		wrapLines?: boolean;
		/** A caption rendered beneath the code. */
		caption?: Snippet;
	}

	const COPIED_MS = 2000;

	const {
		code,
		language,
		wrapLines = false,
		caption,
		class: className,
		...restProps
	}: Props = $props();

	const COPY_STATES = {
		idle: { label: 'Copy code', icon: mdiContentCopy, status: '' },
		copied: { label: 'Copied', icon: mdiCheck, status: 'Copied' },
		failed: { label: 'Copy failed', icon: mdiContentCopy, status: 'Copy failed' }
	} as const;

	let copyState = $state<keyof typeof COPY_STATES>('idle');
	let timer: ReturnType<typeof setTimeout> | undefined;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			copyState = 'copied';
		} catch {
			copyState = 'failed';
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			copyState = 'idle';
		}, COPIED_MS);
	};

	onDestroy(() => clearTimeout(timer));

	const html = $derived(highlight(code, language));
</script>

<!-- eslint-disable svelte/no-at-html-tags -- prism escapes <, >, and & in its output -->
<figure class={className} {...restProps}>
	<div class="relative">
		<pre
			class={[
				'code-snippet bg-light p-2 text-code',
				wrapLines ? 'whitespace-pre-wrap' : 'overflow-x-auto whitespace-pre'
			]}><code>{@html html}</code></pre>
		<button
			type="button"
			class="absolute top-1 right-1 icon-button"
			aria-label={COPY_STATES[copyState].label}
			onclick={copy}
		>
			<Icon icon={COPY_STATES[copyState].icon} />
		</button>
		<span role="status" class="sr-only">{COPY_STATES[copyState].status}</span>
	</div>
	{#if caption}
		<figcaption>{@render caption()}</figcaption>
	{/if}
</figure>

<style>
	.code-snippet
		:global(
			:is(
				.token.comment,
				.token.prolog,
				.token.doctype,
				.token.cdata,
				.token.shebang,
				.token.hashbang
			)
		) {
		color: var(--color-code-comment);
	}
	.code-snippet :global(:is(.token.keyword, .token.atrule, .token.important)) {
		color: var(--color-code-keyword);
	}
	.code-snippet
		:global(
			:is(
				.token.builtin,
				.token.class-name,
				.token.type-definition,
				.token.generic,
				.token.namespace,
				.token.lifetime-annotation
			)
		) {
		color: var(--color-code-type);
	}
	.code-snippet
		:global(
			:is(
				.token.function,
				.token.function-name,
				.token.function-definition,
				.token.macro,
				.token.decorator,
				.token.annotation
			)
		) {
		color: var(--color-code-function);
	}
	.code-snippet
		:global(
			:is(
				.token.string,
				.token.char,
				.token.template-string,
				.token.triple-quoted-string,
				.token.string-literal,
				.token.attr-value,
				.token.regex,
				.token.url
			)
		) {
		color: var(--color-code-string);
	}
	.code-snippet :global(:is(.token.number, .token.constant, .token.symbol)) {
		color: var(--color-code-number);
	}
	.code-snippet :global(.token.boolean) {
		color: var(--color-code-boolean);
	}
	.code-snippet :global(.token.null) {
		color: var(--color-code-null);
	}
	.code-snippet :global(:is(.token.property, .token.attr-name, .token.tag, .token.selector)) {
		color: var(--color-code-property-keys);
	}
</style>
