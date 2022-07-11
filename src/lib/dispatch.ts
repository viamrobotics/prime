export const dispatch = (element: HTMLElement, name: string, detail?: object) => {
  return element.dispatchEvent(new CustomEvent(name, {
    composed: true,
    bubbles: true,
    detail,
  }))
}
