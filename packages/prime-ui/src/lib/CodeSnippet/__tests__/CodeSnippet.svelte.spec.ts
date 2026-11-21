import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import CodeSnippet from '../CodeSnippet.svelte';
import DarkCodeSnippet from './DarkCodeSnippet.svelte';
import NarrowCodeSnippet from './NarrowCodeSnippet.svelte';
import WrapCodeSnippet from './WrapCodeSnippet.svelte';

const code = '{ "name": "viam", "count": 3 }';
const COPIED_MS = 2000;
const longLine = 'const roverName = "a very long string that cannot fit in a narrow box";';

const darkColorOf = (utility: string) => {
	const wrapper = document.createElement('div');
	wrapper.className = 'dark';
	const probe = document.createElement('span');
	probe.className = utility;
	wrapper.append(probe);
	document.body.append(wrapper);
	const color = getComputedStyle(probe).color;
	wrapper.remove();
	return color;
};

describe('CodeSnippet', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('paints string and number tokens with the code colors', () => {
		const { container } = render(CodeSnippet, { props: { code, language: 'json' } });

		expect(textColor(container.querySelector('.token.string')!)).toBe(
			colorOf('text-code-string', 'color')
		);
		expect(textColor(container.querySelector('.token.number')!)).toBe(
			colorOf('text-code-number', 'color')
		);
	});

	it('resolves token colors to the dark values inside a dark scope', () => {
		const { container } = render(DarkCodeSnippet, { props: { code } });
		const string = textColor(container.querySelector('.token.string')!);
		const number = textColor(container.querySelector('.token.number')!);

		expect(string).toBe(darkColorOf('text-code-string'));
		expect(number).toBe(darkColorOf('text-code-number'));
		expect(string).not.toBe(colorOf('text-code-string', 'color'));
		expect(number).not.toBe(colorOf('text-code-number', 'color'));
	});

	it('paints keyword, comment, and type tokens with the code colors', () => {
		const { container } = render(CodeSnippet, {
			props: { code: '// ready\nclass Rover {}\nconst speed: number = 1;', language: 'typescript' }
		});

		expect(textColor(container.querySelector('.token.keyword')!)).toBe(
			colorOf('text-code-keyword', 'color')
		);
		expect(textColor(container.querySelector('.token.comment')!)).toBe(
			colorOf('text-code-comment', 'color')
		);
		expect(textColor(container.querySelector('.token.class-name')!)).toBe(
			colorOf('text-code-type', 'color')
		);
		expect(textColor(container.querySelector('.token.builtin')!)).toBe(
			colorOf('text-code-type', 'color')
		);
	});

	it('renders the code verbatim inside the pre', () => {
		const { container } = render(CodeSnippet, { props: { code, language: 'json' } });

		expect(container.querySelector('pre')!.textContent).toBe(code);
	});

	it('has a copy button with an accessible name', async () => {
		render(CodeSnippet, { props: { code, language: 'json' } });

		await expect.element(page.getByRole('button', { name: 'Copy code' })).toBeVisible();
	});

	it('clicking copy writes the code to the clipboard', async () => {
		render(CodeSnippet, { props: { code, language: 'json' } });

		await userEvent.click(page.getByRole('button', { name: 'Copy code' }));

		expect(await navigator.clipboard.readText()).toBe(code);
	});

	it('reads Copied after a copy, then reverts to Copy code', async () => {
		render(CodeSnippet, { props: { code, language: 'json' } });

		await userEvent.click(page.getByRole('button', { name: 'Copy code' }));
		await expect.element(page.getByRole('button', { name: 'Copied' })).toBeVisible();

		await expect
			.element(page.getByRole('button', { name: 'Copy code' }), { timeout: COPIED_MS + 1500 })
			.toBeVisible();
	});

	it('announces Copied through a status region after a copy', async () => {
		render(CodeSnippet, { props: { code, language: 'json' } });

		await userEvent.click(page.getByRole('button', { name: 'Copy code' }));

		await expect.element(page.getByRole('status')).toHaveTextContent('Copied');
	});

	it('reads Copy failed when the clipboard write rejects', async () => {
		vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('denied'));
		render(CodeSnippet, { props: { code, language: 'json' } });

		await userEvent.click(page.getByRole('button', { name: 'Copy code' }));

		await expect.element(page.getByRole('button', { name: 'Copy failed' })).toBeVisible();
	});

	it('announces Copy failed through a status region when the write rejects', async () => {
		vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('denied'));
		render(CodeSnippet, { props: { code, language: 'json' } });

		await userEvent.click(page.getByRole('button', { name: 'Copy code' }));

		await expect.element(page.getByRole('status')).toHaveTextContent('Copy failed');
	});

	it('renders the caption beneath the code', async () => {
		const { container } = render(NarrowCodeSnippet, { props: { code: 'a', hasCaption: true } });

		await expect.element(page.getByText('rover.ts')).toBeVisible();
		expect(container.querySelector('figure > figcaption')!.textContent!.trim()).toBe('rover.ts');

		const pre = container.querySelector('pre')!;
		const caption = container.querySelector('figure > figcaption')!;
		expect(
			caption.getBoundingClientRect().top,
			'the caption starts below the code'
		).toBeGreaterThanOrEqual(pre.getBoundingClientRect().bottom);
	});

	it.each([
		[false, 'pre'],
		[true, 'pre-wrap']
	])('wrapLines=%s sets white-space to %s', (wrapLines, whiteSpace) => {
		const { container } = render(WrapCodeSnippet, { props: { wrapLines } });

		expect(getComputedStyle(container.querySelector('pre')!).whiteSpace).toBe(whiteSpace);
	});

	it('names an overflowing snippet Code and makes it a tab stop', async () => {
		const { container } = render(NarrowCodeSnippet, { props: { code: longLine } });

		await expect.element(page.getByRole('region', { name: 'Code' })).toBeVisible();
		expect(container.querySelector('pre')!.tabIndex).toBe(0);
	});

	it('names an overflowing captioned snippet by its caption', async () => {
		render(NarrowCodeSnippet, { props: { code: longLine, hasCaption: true } });

		await expect.element(page.getByRole('region', { name: 'rover.ts' })).toBeVisible();
	});

	it('gives a snippet that fits no region role and no tab stop', async () => {
		const { container } = render(NarrowCodeSnippet, { props: { code: 'a' } });
		const pre = container.querySelector('pre')!;

		await expect.poll(() => pre.hasAttribute('role'), { message: 'pre has no role' }).toBe(false);
		expect(pre.hasAttribute('tabindex'), 'pre is not a tab stop').toBe(false);
	});

	it('drops the region role and tab stop when wrapLines turns on', async () => {
		const { container, rerender } = render(NarrowCodeSnippet, { props: { code: longLine } });
		const pre = container.querySelector('pre')!;
		await expect.element(page.getByRole('region', { name: 'Code' })).toBeVisible();

		await rerender({ code: longLine, wrapLines: true });

		await expect.poll(() => pre.hasAttribute('role'), { message: 'pre has no role' }).toBe(false);
		expect(pre.hasAttribute('tabindex'), 'pre is not a tab stop').toBe(false);
	});

	it('gives a wrapLines snippet with a long line no region role and no tab stop', async () => {
		const { container } = render(NarrowCodeSnippet, { props: { code: longLine, wrapLines: true } });
		const pre = container.querySelector('pre')!;

		await expect.poll(() => pre.hasAttribute('role'), { message: 'pre has no role' }).toBe(false);
		expect(pre.hasAttribute('tabindex'), 'pre is not a tab stop').toBe(false);
	});
});
