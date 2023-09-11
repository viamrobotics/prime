/**
 * Returns an event handler that will prevent default behavior and stop
 * immediate propagation of an event if `prevent` is true. Useful to layer
 * disabled behavior onto native event forwarding.
 *
 * Note: it's important that the usage be reactive such that the handler
 * will be updated if disabled's value changes.
 *
 * ```svelte
 * export let disabled = false;
 * $: handleDisabled = preventHandler(disabled);
 * <control on:input on:input|capture={handleDisabled} />
 * ```
 *
 * @param prevent Whether or not the event should not emit
 * @returns
 */
export const preventHandler = (prevent: boolean) => (event: Event) => {
  if (prevent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
};

/**
 * Returns a keyboard event handler that will prevent default behavior and stop
 * immediate propagation of an event if `disabled` is true. Useful to layer
 * disabled behavior onto native keyboard event forwarding.
 *
 * Note: it's important that the usage be reactive such that the handler
 * will be updated if disabled's value changes.
 *
 * ```svelte
 * export let disabled = false;
 * $: handleDisabled = preventKeyboardHandler(disabled);
 * <control on:keydown on:keydown|capture={handleDisabled} />
 * ```
 *
 * @param disabled Whether or not the event should not emit
 * @param allowedCodes A list of KeyboardEvent codes to always allow
 * @returns
 */
export const preventKeyboardHandler =
  (disabled: boolean, allowedCodes = ['Tab']) =>
  (event: KeyboardEvent) => {
    if (disabled && !allowedCodes.includes(event.code)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
