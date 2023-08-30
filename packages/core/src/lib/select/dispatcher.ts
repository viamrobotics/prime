import { createEventDispatcher } from 'svelte';

interface SearchableSelectEvents {
  /** When the search input receives a value and the options are searched, emit the search term. */
  search: string;

  /** When the optional `button` is clicked, emit. */
  buttonclick: null;
}

/** Creates a dispatcher for the common events of searchable selects */
export const createSearchableSelectDispatcher = <Events>() =>
  createEventDispatcher<Events & SearchableSelectEvents>();
