/** Reactive store wrapper around floating-ui/dom. */
import {
  computePosition,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  size as sizeMiddleware,
  type Placement,
  type Side,
  type ComputePositionConfig,
  type ReferenceElement,
  type OffsetOptions,
  type FlipOptions,
  type ShiftOptions,
  type SizeOptions,
  type Strategy,
} from '@floating-ui/dom';

import { derived, writable, type Readable } from 'svelte/store';
import { noop } from 'lodash-es';

export type {
  Placement as FloatingPlacement,
  Strategy as FloatingStrategy,
  ReferenceElement as FloatingReferenceElement,
  OffsetOptions as FloatingOffsetOptions,
  FlipOptions as FloatingFlipOptions,
  ShiftOptions as FloatingShiftOptions,
  SizeOptions as FloatingSizeOptions,
} from '@floating-ui/dom';

export interface FloatingStyleStore
  extends Readable<FloatingStyle | undefined> {
  register: (state: State) => void;
}

export interface FloatingStyle {
  top?: string;
  left?: string;
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
  placement?: Placement | undefined;
  offset?: OffsetOptions | undefined;
  flip?: FlipOptions | undefined;
  shift?: ShiftOptions | undefined;
  size?: SizeOptions | undefined;
  strategy?: Strategy | undefined;
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
  const { arrowElement, placement, offset, flip, shift, size, strategy } =
    state;

  return {
    strategy: strategy ?? 'absolute',
    placement: placement ?? 'top',
    middleware: [
      offset !== undefined && offsetMiddleware(offset),
      flip !== undefined && flipMiddleware(flip),
      shift !== undefined && shiftMiddleware(shift),
      arrowElement && arrowMiddleware({ element: arrowElement }),
      size !== undefined && sizeMiddleware(size),
    ],
  };
};

const isBrowser = Boolean(
  typeof window !== 'undefined' &&
    typeof window.IntersectionObserver === 'function' &&
    typeof window.ResizeObserver === 'function'
);
