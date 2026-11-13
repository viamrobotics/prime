import type { SelectOption } from '@viamrobotics/prime-ui';

import { getContext, setContext } from 'svelte';

type ItemsGetter = () => SelectOption[] | undefined;

const ITEMS_KEY = Symbol('select-items');

export const provideSelectItems = (items: ItemsGetter) => setContext(ITEMS_KEY, items);

export const useSelectItems = (): ItemsGetter | undefined => getContext(ITEMS_KEY);
