import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  offset,
  arrow as arrowMiddleware,
} from '@floating-ui/dom';
import { setContext, getContext } from 'svelte';
import { derived, writable, type Readable } from 'svelte/store';
import noop from 'lodash/noop';

import { uniqueId } from '$lib/unique-id';

export type TooltipLocation = 'top' | 'bottom' | 'right' | 'left';

export type TooltipVisibility = 'invisible' | 'visible';

export interface TooltipContext {
  id: string;
  styles: Readable<TooltipStyles | undefined>;
  isVisible: Readable<boolean>;
  setHovered: (isHovered: boolean) => void;
  setTarget: (target: HTMLElement | undefined) => void;
  setTooltip: (options: {
    location: TooltipLocation;
    visibility: TooltipVisibility | undefined;
    tooltip: HTMLElement | undefined;
    arrow: HTMLElement | undefined;
  }) => void;
}

export interface TooltipElements {
  target?: HTMLElement;
  tooltip?: HTMLElement;
  arrow?: HTMLElement;
}

export interface TooltipStyles {
  tooltip: {
    top?: string | undefined;
    left?: string | undefined;
  };
  arrow: {
    top?: string | undefined;
    left?: string | undefined;
    right?: string;
    bottom?: string;
  };
}

export interface State {
  location?: TooltipLocation;
  visibility?: TooltipVisibility | undefined;
  target?: HTMLElement | undefined;
  tooltip?: HTMLElement | undefined;
  arrow?: HTMLElement | undefined;
  isHovered?: boolean;
}

const CONTEXT_KEY = Symbol('tooltip');
const INITIAL_STYLE: Readonly<TooltipStyles> = { tooltip: {}, arrow: {} };

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
  const state = writable<State>({});
  const isVisible = derived(
    state,
    ($state) =>
      $state.visibility === 'visible' ||
      Boolean($state.visibility === undefined && $state.isHovered)
  );
  const styles = derived<Readable<State>, TooltipStyles | undefined>(
    state,
    updateStyles
  );

  return {
    id,
    isVisible,
    styles,
    setHovered: (isHovered) =>
      state.update((previous) => ({ ...previous, isHovered })),
    setTarget: (target) =>
      state.update((previous) => ({ ...previous, target })),
    setTooltip: (options) =>
      state.update((previous) => ({ ...previous, ...options })),
  };
};

/**
 * Asynchronously update a tooltip's style as its state changes.
 *
 * For use as the update function of a derived store.
 * Will update the styles when state changes, and also hooks into `autoUpdate`
 * to update styles when the target or tooltip move on the page.
 *
 * @param state the current tooltip state
 * @param set a callback to set the tooltips styles when needed
 * @returns a cleanup function that will run whenever `state` is updated,
 *   or the derived store has no more subscribers
 */
const updateStyles = (
  state: State,
  set: (nextStyles: TooltipStyles) => void
): (() => void) => {
  const { target, tooltip } = state;
  let cleanup = noop;

  if (target && tooltip) {
    cleanup = autoUpdate(target, tooltip, () => {
      void calculateStyle(state).then((styles) => set(styles));
    });
  }

  return cleanup;
};

/** Given a tooltip's state, calculate its position with floating-ui. */
const calculateStyle = async (state: State): Promise<TooltipStyles> => {
  const { target, tooltip, arrow, location } = state;

  if (!target || !tooltip || !arrow || !location) {
    return INITIAL_STYLE;
  }

  const { x, y, placement, middlewareData } = await computePosition(
    target,
    tooltip,
    {
      placement: location,
      middleware: [
        offset(7),
        flip({ fallbackAxisSideDirection: 'start', crossAxis: false }),
        shift({ padding: 5 }),
        arrowMiddleware({ element: arrow }),
      ],
    }
  );

  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};
  const side = placement.split('-')[0] as TooltipLocation;
  const staticSide = (
    { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as const
  )[side];

  return {
    tooltip: {
      left: `${x}px`,
      top: `${y}px`,
    },
    arrow: {
      left: arrowX === undefined ? undefined : `${arrowX}px`,
      top: arrowY === undefined ? undefined : `${arrowY}px`,
      [staticSide]: '-5px',
    },
  };
};
