export interface KeyToken {
  kind: "key" | "separator";
  text: string;
}

const SEPARATOR = /\s+([/+])\s+/;

/**
 * Splits key notation into keys and the separators between them. ` / ` separates
 * alternatives and ` + ` joins a chord, each with a space on both sides, so a key named
 * `/` or `+` stays a key.
 */
export function tokenizeKeys(keys: string): KeyToken[] {
  return keys
    .trim()
    .split(SEPARATOR)
    .map((text, index) => ({
      kind: index % 2 === 0 ? "key" : "separator",
      text,
    }));
}
