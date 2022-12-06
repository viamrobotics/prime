
import { get_current_component } from 'svelte/internal';

export const dispatcher = () => {
  const element = get_current_component() as HTMLElement;

  return (name: string, detail?: object) => element.dispatchEvent(new CustomEvent(name, {
    composed: true,
    bubbles: true,
    detail,
  }));
};

