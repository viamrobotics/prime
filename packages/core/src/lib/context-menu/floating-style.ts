import { computePosition } from '@floating-ui/dom';
import { derived, writable, type Readable } from 'svelte/store';

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
  const { controlElement: control, menuElement: menu } = state;

  if (control && menu) {
    void calculateStyle(control, menu).then((style) => set(style));
  }
};

const calculateStyle = async (
  controlElement: HTMLElement,
  menuElement: HTMLElement
): Promise<Style> => {
  const { x, y } = await computePosition(controlElement, menuElement, {
    placement: 'bottom-start',
    middleware: [],
  });

  return { left: `${x}px`, top: `${y}px` };
};
