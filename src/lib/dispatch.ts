import { createEventDispatcher } from 'svelte';

export const dispatcher = () => {
  const dispatch = createEventDispatcher();

  return (name: string, detail?: object) => dispatch(name, detail ?? {});
};
