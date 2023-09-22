import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  offset,
  arrow as floatingArrow,
} from '@floating-ui/dom';
import { setContext, getContext } from 'svelte';
import { derived, writable, type Readable } from 'svelte/store';

import { useUniqueId } from '$lib/unique-id';

export type TooltipLocation = 'top' | 'bottom' | 'right' | 'left';

export type TooltipVisibility = 'invisible' | 'visible';

export interface TooltipStylesStore extends Readable<TooltipStyles> {
  id: string;
  setHovered: (isHovered: boolean) => void;
  setTarget: (target?: HTMLElement) => void;
  setTooltip: (
    location: TooltipLocation,
    visibility: TooltipVisibility,
    tooltip?: HTMLElement,
    arrow?: HTMLElement
  ) => void;
}

export interface TooltipElements {
  target?: HTMLElement;
  tooltip?: HTMLElement;
  arrow?: HTMLElement;
}

export interface TooltipStyles {
  tooltip: {
    visibility?: string | undefined;
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

interface State {
  location?: TooltipLocation;
  visibility?: TooltipVisibility;
  target?: HTMLElement | undefined;
  tooltip?: HTMLElement | undefined;
  arrow?: HTMLElement | undefined;
  isHovered?: boolean;
}

const CONTEXT_KEY = Symbol('tooltip');

export const provideTooltipStyles = (): TooltipStylesStore => {
  const store = createStylesStore();

  setContext(CONTEXT_KEY, store);

  return store;
};

export const useTooltipStyles = (): TooltipStylesStore => {
  const store = getContext<TooltipStylesStore | undefined>(CONTEXT_KEY);

  if (!store) {
    throw new Error('Usage: tooltip styles context required');
  }

  return store;
};

const createStylesStore = (): TooltipStylesStore => {
  const id = useUniqueId('tooltip');
  const state = writable<State>({});
  const styles = derived<typeof state, TooltipStyles>(
    state,
    ($state, set) => {
      const { target, tooltip } = $state;

      return target && tooltip
        ? autoUpdate(target, tooltip, () => updateStyle($state, set))
        : () => undefined;
    },
    { tooltip: {}, arrow: {} }
  );

  return {
    id,
    subscribe: styles.subscribe,
    setHovered: (isHovered) =>
      state.update((previous) => ({ ...previous, isHovered })),
    setTarget: (target) =>
      state.update((previous) => ({ ...previous, target })),
    setTooltip: (location, visibility, tooltip, arrow) =>
      state.update((previous) => ({
        ...previous,
        location,
        visibility,
        tooltip,
        arrow,
      })),
  };
};

const updateStyle = (
  state: State,
  set: (styles: TooltipStyles) => void
): void => {
  void calculateStyle(state).then((styles) => set(styles));
};

const calculateStyle = async (state: State): Promise<TooltipStyles> => {
  const { target, tooltip, arrow, location = 'top' } = state;

  if (!target || !tooltip || !arrow) {
    return { tooltip: {}, arrow: {} };
  }

  const { x, y, placement, middlewareData } = await computePosition(
    target,
    tooltip,
    {
      placement: location,
      middleware: [
        offset(7),
        flip({ fallbackAxisSideDirection: 'start' }),
        shift({ padding: 5 }),
        floatingArrow({ element: arrow }),
      ],
    }
  );

  const { x: arrowX, y: arrowY } = middlewareData.arrow!;
  const side = placement.split('-')[0] as TooltipLocation;
  const staticSide = (
    { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as const
  )[side];

  const visibility =
    state.visibility === 'visible' || state.isHovered ? 'visible' : 'hidden';

  return {
    tooltip: {
      visibility,
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
