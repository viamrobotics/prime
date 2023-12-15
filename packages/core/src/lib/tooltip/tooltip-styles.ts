import { setContext, getContext } from 'svelte';
import { derived, writable, type Readable } from 'svelte/store';

import {
  floatingStyle,
  type FloatingStyle,
  type FloatingPlacement,
} from '$lib/floating';
import { uniqueId } from '$lib/unique-id';
import { noop } from 'lodash-es';

export type TooltipVisibility = 'invisible' | 'visible';

export interface TooltipContext {
  id: string;
  style: Readable<FloatingStyle | undefined>;
  isVisible: Readable<boolean>;
  setHovered: (isHovered: boolean) => void;
  setVisibility: (visibility: TooltipVisibility | undefined) => void;
  setHoverDelayMS: (hoverDelayMS: number) => void;
  setTarget: (target: HTMLElement | undefined) => void;
  setTooltip: (options: {
    tooltip: HTMLElement | undefined;
    arrow: HTMLElement | undefined;
    placement: FloatingPlacement;
  }) => void;
}

export interface TooltipElements {
  target?: HTMLElement;
  tooltip?: HTMLElement;
  arrow?: HTMLElement;
}

const CONTEXT_KEY = Symbol('tooltip');

/**
 * Create and provide a context for the components of a tooltip.
 *
 * @returns tooltip ID, styles, and reactive actions
 */
export const provideTooltipContext = (): TooltipContext => {
  const context = createContext();

  setContext(CONTEXT_KEY, context);

  return context;
};

/**
 * Use a provided tooltip context inside a tooltip component.
 *
 * @returns tooltip ID, styles, and reactive actions
 */
export const useTooltip = (): TooltipContext => {
  const context = getContext<TooltipContext | undefined>(CONTEXT_KEY);

  if (!context) {
    throw new Error('Usage: tooltip context required');
  }

  return context;
};

/** Create a context for a single tooltip */
const createContext = (): TooltipContext => {
  const id = uniqueId('tooltip');
  const isHovered = writable(false);
  const visibility = writable<TooltipVisibility | undefined>();
  const hoverDelayMS = writable<number>();
  const isVisible = derived(
    [isHovered, visibility, hoverDelayMS],
    ([$isHovered, $visibility, $hoverDelayMS], set) => {
      let cleanup = noop;

      if ($visibility === 'visible') {
        set(true);
      } else if ($visibility === 'invisible' || !$isHovered) {
        set(false);
      } else {
        const timeoutID = setTimeout(() => set(true), $hoverDelayMS);
        cleanup = () => clearTimeout(timeoutID);
      }

      return cleanup;
    },
    false
  );
  const style = floatingStyle({ offset: 7, shift: 5, flip: true, auto: true });

  return {
    id,
    isVisible,
    style,
    setHovered: isHovered.set,
    setVisibility: visibility.set,
    setHoverDelayMS: hoverDelayMS.set,
    setTarget: (target) => style.register({ referenceElement: target }),
    setTooltip: ({ tooltip, arrow, placement }) => {
      style.register({
        placement,
        floatingElement: tooltip,
        arrowElement: arrow,
      });
    },
  };
};
