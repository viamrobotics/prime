import { afterEach, describe, expect, it } from 'vitest';

import { classifyPress, claimPresses, markAsGrip } from '../classify-press.ts';
import { dragIgnore } from '../drag-ignore.ts';

import type { PressKind } from '../classify-press.ts';

const mounted: HTMLElement[] = [];

function create<TTag extends keyof HTMLElementTagNameMap>(
	tag: TTag,
	parent?: Element
): HTMLElementTagNameMap[TTag] {
	const element = document.createElement(tag);
	(parent ?? document.body).append(element);
	if (!parent) mounted.push(element);
	return element;
}

function press(target: Element, boundary: Element): PressKind {
	let kind: PressKind | undefined;
	boundary.addEventListener('pointerdown', (event) => (kind = classifyPress(event, boundary)), {
		once: true
	});
	target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
	if (kind === undefined) throw new Error('press did not reach the boundary');
	return kind;
}

afterEach(() => {
	for (const element of mounted.splice(0)) element.remove();
});

describe('classifyPress', () => {
	it('holds a press on a button', () => {
		const boundary = create('div');
		expect(press(create('button', boundary), boundary)).toBe('held');
	});

	it.each(['a', 'select'] as const)('holds a press on a %s', (tag) => {
		const boundary = create('div');
		expect(press(create(tag, boundary), boundary)).toBe('held');
	});

	it('holds a press on a role=button element', () => {
		const boundary = create('div');
		const control = create('div', boundary);
		control.setAttribute('role', 'button');
		expect(press(control, boundary)).toBe('held');
	});

	it('holds a press on content inside a button', () => {
		const boundary = create('div');
		const label = create('span', create('button', boundary));
		expect(press(label, boundary)).toBe('held');
	});

	it('drags a press on plain content immediately', () => {
		const boundary = create('div');
		expect(press(create('div', boundary), boundary)).toBe('immediate');
	});

	it('drags a press on the boundary itself immediately', () => {
		const boundary = create('div');
		expect(press(boundary, boundary)).toBe('immediate');
	});

	it('drags a press on a tab button immediately', () => {
		const boundary = create('div');
		const tab = create('button', boundary);
		tab.dataset.tabPaneId = 'cam-a';
		expect(press(tab, boundary)).toBe('immediate');
	});

	it.each(['input', 'textarea'] as const)('ignores a press on a %s', (tag) => {
		const boundary = create('div');
		expect(press(create(tag, boundary), boundary)).toBe('ignored');
	});

	it('ignores a press on a contenteditable element', () => {
		const boundary = create('div');
		const editable = create('div', boundary);
		editable.setAttribute('contenteditable', '');
		expect(press(editable, boundary)).toBe('ignored');
	});

	it('ignores a press inside a claimPresses element', () => {
		const boundary = create('div');
		const claiming = create('div', boundary);
		claimPresses(claiming);
		expect(press(create('button', claiming), boundary)).toBe('ignored');
	});

	it('ignores a press inside dragIgnore content', () => {
		const boundary = create('div');
		const ignoring = create('div', boundary);
		dragIgnore(ignoring);
		expect(press(create('span', ignoring), boundary)).toBe('ignored');
	});

	it('classifies a press as a grip when it lands on a marked element', () => {
		const boundary = create('div');
		const grip = create('button', boundary);
		markAsGrip(grip);
		expect(press(grip, boundary)).toBe('grip');
	});

	it('classifies a press inside a grip as a grip', () => {
		const boundary = create('div');
		const grip = create('button', boundary);
		markAsGrip(grip);
		expect(press(create('span', grip), boundary)).toBe('grip');
	});

	it('stops classifying as a grip once the mark is removed', () => {
		const boundary = create('div');
		const grip = create('button', boundary);
		markAsGrip(grip)();
		expect(press(grip, boundary)).toBe('held');
	});

	it('ignores a text field inside a grip', () => {
		const boundary = create('div');
		const grip = create('div', boundary);
		markAsGrip(grip);
		expect(press(create('input', grip), boundary)).toBe('ignored');
	});

	it('does not let elements outside the boundary change the kind', () => {
		const outer = create('button');
		const boundary = create('div', outer);
		expect(press(create('div', boundary), boundary)).toBe('immediate');
	});
});
