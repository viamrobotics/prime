export const checkKeyboardEvent = (event: KeyboardEvent, keys: string[]) =>
  keys.includes(event.key);
