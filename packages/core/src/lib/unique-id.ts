import { setContext, getContext } from 'svelte';
import { readable, type Readable, get } from 'svelte/store';

type GetCount = () => number;
type UniqueIdStore = Readable<GetCount>;

const CONTEXT_KEY = 'prime-core-uid';

/**
 * Initialize a store to  track ID counts to ensure uniqueness
 *
 * ```ts
 * // +layout.svelte
 * import { initializeUniqueIdStore } from '$lib/unique-id';
 * initializeUniqueIdStore();
 * ```
 */
export const initializeUniqueIdStore = () => {
  let count = 0;
  const uidStore: UniqueIdStore = readable(() => (count += 1));
  setContext(CONTEXT_KEY, uidStore);
};

/**
 * Returns a generator function to create unique IDs with a prefix
 *
 * ```ts
 * // some-component.svelte
 * import { useUniqueId } from './unique-id';
 *
 * const uniqueId = useUniqueId();
 * const first = uniqueId('first');     // returns first_1
 * const second = uniqueId('second');   // returns second_2
 * ```
 */
export const useUniqueId = (): ((prefix: string) => string) => {
  const uidStore = getContext<UniqueIdStore>(CONTEXT_KEY);
  const getCount = get(uidStore);

  return (prefix: string) => `${prefix}_${getCount()}`;
};
