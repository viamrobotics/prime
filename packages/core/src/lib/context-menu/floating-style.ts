import {
  computePosition,
  offset as offsetMiddleware,
  type Placement,
} from '@floating-ui/dom';
import { derived, writable, type Readable } from 'svelte/store';

export type { Placement as FloatingMenuPlacement } from '@floating-ui/dom';

export interface FloatingStyle extends Readable<Style | undefined> {
  register: (state: State) => void;
}

export interface Style {
  top: string | undefined;
  left: string | undefined;
}

export interface State {
  controlElement?: HTMLElement | undefined;
  menuElement?: HTMLElement | undefined;
  placement?: Placement;
  offset?: number;
}

export const floatingStyle = (): FloatingStyle => {
  const state = writable<State>({});
  const styles = derived(state, updateStyle);

  return {
    subscribe: styles.subscribe,
    register: state.set,
  };
};

const updateStyle = (state: State, set: (style: Style) => void) => {
  const {
    controlElement: control,
    menuElement: menu,
    placement,
    offset,
  } = state;

  if (control && menu && placement !== undefined && offset !== undefined) {
    void calculateStyle(control, menu, placement, offset).then((style) => {
      set(style);
    });
  }
};

const calculateStyle = async (
  controlElement: HTMLElement,
  menuElement: HTMLElement,
  placement: Placement,
  offset: number
): Promise<Style> => {
  const { x, y } = await computePosition(controlElement, menuElement, {
    placement,
    middleware: [offsetMiddleware(offset)],
  });

  return { left: `${x}px`, top: `${y}px` };
};
