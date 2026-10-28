import { describe, expect, it } from 'vitest';

import { createAttachedElements } from '../attached-elements.ts';

const element = () => ({}) as HTMLElement;

describe('createAttachedElements', () => {
	it('has no latest element before any attach', () => {
		expect(createAttachedElements().latest).toBeUndefined();
	});

	it('reports the attached element as latest', () => {
		const attached = createAttachedElements();
		const first = element();
		attached.attach(first);
		expect(attached.latest).toBe(first);
	});

	it('reports the most recently attached element as latest', () => {
		const attached = createAttachedElements();
		attached.attach(element());
		const second = element();
		attached.attach(second);
		expect(attached.latest).toBe(second);
	});

	it('falls back to the previous element when the latest detaches', () => {
		const attached = createAttachedElements();
		const first = element();
		attached.attach(first);
		const detachSecond = attached.attach(element());
		detachSecond();
		expect(attached.latest).toBe(first);
	});

	it('keeps the latest when an earlier element detaches', () => {
		const attached = createAttachedElements();
		const detachFirst = attached.attach(element());
		const second = element();
		attached.attach(second);
		detachFirst();
		expect(attached.latest).toBe(second);
	});

	it('has no latest after every element detaches', () => {
		const attached = createAttachedElements();
		const detach = attached.attach(element());
		detach();
		expect(attached.latest).toBeUndefined();
	});

	it('keeps the original position when the same element attaches again', () => {
		const attached = createAttachedElements();
		const first = element();
		const second = element();
		attached.attach(first);
		attached.attach(second);
		attached.attach(first);
		expect(attached.latest).toBe(second);
	});
});
