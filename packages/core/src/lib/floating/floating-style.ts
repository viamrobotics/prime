/** Reactive store wrapper around floating-ui/dom. */
import {
  computePosition,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  type Placement,
  type Side,
  type ComputePositionConfig,
  type ReferenceElement,
} from '@floating-ui/dom';

import { derived, writable, type Readable } from 'svelte/store';
import noop from 'lodash/noop';

export type {
  Placement as FloatingPlacement,
  ReferenceElement as FloatingReferenceElement,
} from '@floating-ui/dom';

export interface FloatingStyleStore
  extends Readable<FloatingStyle | undefined> {
  register: (state: State) => void;
}

export interface FloatingStyle {
  top?: string | undefined;
  left?: string | undefined;
  arrow?: ArrowStyle | undefined;
}

export interface ArrowStyle {
  top?: string | undefined;
  left?: string | undefined;
  right?: string | undefined;
  bottom?: string | undefined;
}

export interface State {
  referenceElement?: ReferenceElement | undefined;
  floatingElement?: HTMLElement | undefined;
  arrowElement?: Element | undefined;
  placement?: Placement;
  offset?: number;
  flip?: boolean;
  shift?: number;
  auto?: boolean;
}

export const floatingStyle = (options: State = {}): FloatingStyleStore => {
  const state = writable<State>(options);
  const style = derived(state, updateStyle);

  return {
    subscribe: style.subscribe,
    register: (update: Partial<State>) => {
      state.update((prevState) => ({ ...prevState, ...update }));
    },
  };
};

const updateStyle = (state: State, set: (style: FloatingStyle) => void) => {
  const { referenceElement, floatingElement, auto } = state;
  let cleanup = noop;

  if (isBrowser && auto && referenceElement && floatingElement) {
    cleanup = autoUpdate(referenceElement, floatingElement, () => {
      void calculateStyle(state).then((style) => set(style));
    });
  } else {
    void calculateStyle(state).then((style) => set(style));
  }

  return cleanup;
};

const calculateStyle = async (state: State): Promise<FloatingStyle> => {
  const { referenceElement, floatingElement } = state;

  if (!referenceElement || !floatingElement) {
    return {};
  }

  const { x, y, placement, middlewareData } = await computePosition(
    referenceElement,
    floatingElement,
    getConfig(state)
  );

  let arrowStyle;

  if (middlewareData.arrow) {
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    const side = placement.split('-')[0] as Side;
    const staticSide = (
      { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as const
    )[side];

    arrowStyle = {
      left: arrowX === undefined ? undefined : `${arrowX}px`,
      top: arrowY === undefined ? undefined : `${arrowY}px`,
      [staticSide]: '-5px',
    };
  }

  return { left: `${x}px`, top: `${y}px`, arrow: arrowStyle };
};

const getConfig = (state: State): ComputePositionConfig => {
  const { arrowElement, placement, offset, flip, shift } = state;

  return {
    placement: placement ?? 'top',
    middleware: [
      offset !== undefined && offsetMiddleware(offset),
      flip &&
        flipMiddleware({
          fallbackAxisSideDirection: 'start',
          crossAxis: shift === undefined,
        }),
      shift !== undefined && shiftMiddleware({ padding: shift }),
      arrowElement && arrowMiddleware({ element: arrowElement }),
    ],
  };
};

const isBrowser = Boolean(
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  typeof window !== 'undefined' && window.IntersectionObserver
);
