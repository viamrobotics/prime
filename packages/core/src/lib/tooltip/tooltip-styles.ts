import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  type Placement,
  type Side,
} from '@floating-ui/dom';
import { writable, type Readable } from 'svelte/store';

export type TooltipLocation = 'top' | 'bottom' | 'right' | 'left';

export type TooltipState = 'invisible' | 'visible';

export interface Styles extends Readable<TooltipStyles> {
  recalculate: (
    target: HTMLElement | undefined,
    tooltipElement: HTMLElement | undefined,
    arrowElement: HTMLElement | undefined,
    location: TooltipLocation
  ) => unknown;
}

export interface TooltipStyles {
  tooltip: {
    left?: string | undefined;
    top?: string | undefined;
  };
  arrow: {
    top?: string | undefined;
    left?: string | undefined;
    right?: string;
    bottom?: string;
    transform?: string;
  };
}

export const tooltipStyles = (): Styles => {
  const { subscribe, set } = writable<TooltipStyles>({
    tooltip: {},
    arrow: {},
  });

  const recalculate = async (
    targetElement: HTMLElement | undefined,
    tooltipElement: HTMLElement | undefined,
    arrowElement: HTMLElement | undefined,
    location: TooltipLocation
  ) => {
    if (targetElement && tooltipElement && arrowElement) {
      const nextStyles = await calculateStyle(
        targetElement,
        tooltipElement,
        arrowElement,
        location
      );
      set(nextStyles);
    }
  };

  return { subscribe, recalculate };
};

const calculateStyle = async (
  container: HTMLElement,
  tooltipElement: HTMLElement,
  arrowElement: HTMLElement,
  location: TooltipLocation
): Promise<TooltipStyles> => {
  const { x, y, placement, middlewareData } = await computePosition(
    container,
    tooltipElement,
    {
      placement: location,
      middleware: [
        offset(7),
        flip(),
        shift({ padding: 5 }),
        arrow({ element: arrowElement }),
      ],
    }
  );

  const { x: arrowX, y: arrowY } = middlewareData.arrow!;
  const [staticSide, arrowOffset, arrowRotation] = getStaticSide(placement);

  return {
    tooltip: {
      left: `${x}px`,
      top: `${y}px`,
    },
    arrow: {
      left: arrowX === undefined ? undefined : `${arrowX}px`,
      top: arrowY === undefined ? undefined : `${arrowY}px`,
      [staticSide]: `${arrowOffset}px`,
      transform: `rotate(${arrowRotation}deg)`,
    },
  };
};

const getStaticSide = (
  placement: Placement
): [staticSide: Side, arrowOffset: number, arrowRotation: number] => {
  const side = placement.split('-')[0] as Side;

  const staticSide = (
    { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as const
  )[side];

  const arrowOffset = { top: -6, right: -10, bottom: -6, left: -10 }[
    staticSide
  ];
  const arrowRotation = { top: 0, right: 90, bottom: 180, left: 270 }[
    staticSide
  ];

  return [staticSide, arrowOffset, arrowRotation];
};
