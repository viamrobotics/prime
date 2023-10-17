declare global {
  declare interface Window {
    // We load the library via CDN, this provides types for using it.
    Prism: import('@types/prismjs');
  }
}
