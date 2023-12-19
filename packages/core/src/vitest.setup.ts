import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

/**
 * `Element.scrollIntoView` is not implemented/stubbed in `jsdom` so we stub it
 * out here:
 *
 * https://github.com/jsdom/jsdom/issues/1695
 */
Element.prototype.scrollIntoView = vi.fn();

/**
 * `PointerEvent` does not exist in `jsdom` so this polyfill is based off this
 * comment on the PR to add it:
 *
 * https://github.com/jsdom/jsdom/pull/2666#issuecomment-691216178
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    public height: number | undefined;
    public isPrimary: boolean | undefined;
    public pointerId: number | undefined;
    public pointerType: string | undefined;
    public pressure: number | undefined;
    public tangentialPressure: number | undefined;
    public tiltX: number | undefined;
    public tiltY: number | undefined;
    public twist: number | undefined;
    public width: number | undefined;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId;
      this.width = params.width;
      this.height = params.height;
      this.pressure = params.pressure;
      this.tangentialPressure = params.tangentialPressure;
      this.tiltX = params.tiltX;
      this.tiltY = params.tiltY;
      this.pointerType = params.pointerType;
      this.isPrimary = params.isPrimary;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  global.PointerEvent = PointerEvent as any;
}

afterEach(() => {
  cleanup();
});
