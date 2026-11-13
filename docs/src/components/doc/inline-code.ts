const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Escapes `text` for HTML and turns each backtick span into a `<code>` element. */
export const inlineCode = (text: string) =>
  escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
