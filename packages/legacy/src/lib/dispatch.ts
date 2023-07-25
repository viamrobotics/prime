export const dispatcher = () => {
  return (
    event: Event | { target: HTMLElement },
    name: string,
    detail?: object
  ) => {
    if (event.target === null) {
      return;
    }

    event.target.dispatchEvent(
      new CustomEvent(name, {
        composed: true,
        bubbles: true,
        detail,
      })
    );

    if ('stopPropagation' in event) {
      event.stopPropagation();
    }
  };
};
