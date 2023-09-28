import { nanoid } from 'nanoid/non-secure';

/**
 * Returns a unique ID with an optional prefix
 *
 * ```ts
 * // some-component.svelte
 * import { uniqueId } from './unique-id';
 * const myId = uniqueId(); // returns 'uid_XXXXX`
 * const myOtherId = uniqueId('other'); // returns 'other_XXXXX`
 * ```
 */
export const uniqueId = (prefix = 'uid'): string => {
  return `${prefix}_${nanoid()}`;
};
