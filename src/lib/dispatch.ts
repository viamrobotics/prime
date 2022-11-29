
import { get_current_component } from 'svelte/internal';

export const dispatcher = () => {
  const element = get_current_component() as HTMLElement;

  return (name: string, detail?: object) => element.dispatchEvent(new CustomEvent(name, {
    composed: true,
    bubbles: true,
    detail,
  }));
};


export const dispatcherWithEventPassThrough = () => {
  const element = get_current_component() as HTMLElement;
  return <EventType extends Event>(name: string, event: EventType) => {
    const copyEvent = new Proxy(event, 
      { get: (target: object, prop: keyof object) => prop === 'composed' || prop === 'bubbles' ? true : target[prop] }
    );

    const Constructor = event.constructor as unknown as typeof Event;
    return element.dispatchEvent(new Constructor(name, copyEvent));
  };
};
