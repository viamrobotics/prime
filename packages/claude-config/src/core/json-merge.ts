export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parses JSON text expected to hold an object; throws if it is anything else. */
export function parseJsonObject(text: string): Record<string, unknown> {
  const value: unknown = JSON.parse(text);
  if (!isPlainObject(value)) throw new Error("expected a JSON object");
  return value;
}

function sameElement(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Deep-merges `patch` into `target` (mutating it): nested objects recurse, arrays union
 * by structural equality (so repeated merges are idempotent), scalars overwrite.
 */
export function deepMerge(
  target: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  for (const [key, patchValue] of Object.entries(patch)) {
    const current = target[key];
    if (isPlainObject(current) && isPlainObject(patchValue)) {
      deepMerge(current, patchValue);
    } else if (Array.isArray(current) && Array.isArray(patchValue)) {
      for (const element of patchValue) {
        if (!current.some((existing) => sameElement(existing, element)))
          current.push(element);
      }
    } else {
      target[key] = patchValue;
    }
  }
  return target;
}

/**
 * Deep-removes `patch` from `target` (mutating it): scalar patch values delete their key,
 * array patch values remove structurally-equal elements, nested objects recurse. Emptied
 * objects and arrays are pruned so no hollow containers linger.
 */
export function deepRemove(
  target: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  for (const [key, patchValue] of Object.entries(patch)) {
    const current = target[key];
    if (isPlainObject(current) && isPlainObject(patchValue)) {
      deepRemove(current, patchValue);
      if (Object.keys(current).length === 0) delete target[key];
    } else if (Array.isArray(current) && Array.isArray(patchValue)) {
      const kept = current.filter(
        (el) => !patchValue.some((p) => sameElement(p, el)),
      );
      if (kept.length === 0) delete target[key];
      else target[key] = kept;
    } else if (key in target) {
      delete target[key];
    }
  }
  return target;
}
