import type { SelectOption } from '../Select/option.ts';

/** Decides whether an option stays in the list for the typed text. */
export type ComboboxFilter = (option: SelectOption, query: string) => boolean;
