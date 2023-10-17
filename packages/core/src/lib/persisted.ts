import { writable, type Writable } from 'svelte/store';
import type { Jsonifiable } from 'type-fest';

/**
 * This singleton's purpose is for caching stores only during a browser session.
 * It is disabled on the server.
 */
const stores: Record<string, Writable<unknown> | undefined> = {};

const getStorage = (type: 'local' | 'session') => {
  return type === 'local' ? localStorage : sessionStorage;
};

const parse = <T>(value: string | null): T | null => {
  if (value === null) {
    return null
  }  

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const createPersisted = <T extends Jsonifiable>(
  key: string,
  initialValue: T | null,
  storage: ReturnType<typeof getStorage>
) => {
  initialValue = parse(storage.getItem(key)) ?? initialValue
  
  const store = writable<T | null>(initialValue, (set) => {
    storage.setItem(key, JSON.stringify(initialValue));

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        set(parse<T>(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  });

  const { subscribe, set } = store;

  return {
    set(value: T): void {
      storage.setItem(key, JSON.stringify(value));
      set(value);
    },
    update(callback: (value: T | null) => T | null): void {
      store.update((last) => {
        const value = callback(last);
        storage.setItem(key, JSON.stringify(value));
        return value;
      });
    },
    subscribe,
  } satisfies Writable<T | null>;
};

/**
 * Creates a writable store that persists in localStorage
 *
 * @param key The storage key
 * @param initialValue The initial value to put in storage if no value exists.
 * @param storageType 'local' or 'session'
 */
export const persisted = <T extends Jsonifiable>(
  key: string,
  initialValue: T | null = null,
  storageType: 'local' | 'session' = 'local'
): Writable<T | null> => {
  const browser =
    typeof window !== 'undefined' && typeof document !== 'undefined';

  if (!browser) {
    return writable<T | null>(initialValue);
  }

  const storage = getStorage(storageType);

  stores[key] ??= createPersisted(key, initialValue, storage);

  return stores[key] as Writable<T | null>;
};
