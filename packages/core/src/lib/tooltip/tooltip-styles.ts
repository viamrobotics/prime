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
import noop from 'lodash/noop';

import { useUniqueId } from '$lib/unique-id';

export type TooltipLocation = 'top' | 'bottom' | 'right' | 'left';

export type TooltipVisibility = 'invisible' | 'visible';

export interface TooltipContext {
  id: string;
  styles: Readable<TooltipStyles>;
  isVisible: Readable<boolean>;
  setHovered: (isHovered: boolean) => void;
  setTarget: (target: HTMLElement | undefined) => void;
  setTooltip: (options: {
    location: TooltipLocation;
    visibility: TooltipVisibility;
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
  visibility?: TooltipVisibility;
  target?: HTMLElement | undefined;
  tooltip?: HTMLElement | undefined;
  arrow?: HTMLElement | undefined;
  isHovered?: boolean;
}

const CONTEXT_KEY = Symbol('tooltip');
const INITIAL_STYLE: Readonly<TooltipStyles> = { tooltip: {}, arrow: {} };

export const provideTooltipContext = (): TooltipContext => {
  const context = createContext();

  setContext(CONTEXT_KEY, context);

  return context;
};

export const useTooltip = (): TooltipContext => {
  const context = getContext<TooltipContext | undefined>(CONTEXT_KEY);

  if (!context) {
    throw new Error('Usage: tooltip context required');
  }

  return context;
};

const createContext = (): TooltipContext => {
  const id = useUniqueId('tooltip');
  const state = writable<State>({});
  const isVisible = derived(
    state,
    ($state) => $state.visibility === 'visible' || Boolean($state.isHovered)
  );
  const styles = derived<Readable<State>, TooltipStyles>(
    state,
    ($state, set) => {
      const { target, tooltip } = $state;

      return target && tooltip
        ? autoUpdate(target, tooltip, () => updateStyle($state, set))
        : noop;
    },
    INITIAL_STYLE
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

const updateStyle = (
  state: State,
  set: (styles: TooltipStyles) => void
): void => {
  void calculateStyle(state).then((styles) => set(styles));
};

const calculateStyle = async (state: State): Promise<TooltipStyles> => {
  const { target, tooltip, arrow, location = 'top' } = state;

  if (!target || !tooltip || !arrow) {
    return INITIAL_STYLE;
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
