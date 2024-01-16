export type KeyMap = Partial<Record<string, KeyEventHandler | KeyOptions>>;

export type KeyEventHandler = (event: KeyboardEvent) => unknown;

export interface KeyOptions {
  handler: KeyEventHandler;
  preventDefault?: boolean;
}

export const createHandleKey = (keyMap: KeyMap) => {
  return (event: KeyboardEvent): void => {
    const options = keyMap[event.key];
    const handler = typeof options === 'function' ? options : options?.handler;
    const preventDefault =
      typeof options === 'object' ? options.preventDefault : true;

    if (typeof handler === 'function') {
      handler(event);

      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };
};
