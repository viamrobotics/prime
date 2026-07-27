---
paths:
  - "**/*.ts"
---

# TypeScript Best Practices

Use TypeScript with `strict: true`. See the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/).

## Type Definitions

Prefer `interface` for object shapes (extendable), `type` for unions and computed types:

```typescript
interface ButtonOptions {
  variant: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

type ConnectionStatus = "connected" | "disconnected" | "connecting";
```

## NEVER Use `any` — Use `unknown`

**NEVER** use `any` for untyped external data. Use `unknown` and narrow with type guards:

```typescript
// BAD
const data: any = JSON.parse(raw);

// GOOD
const data: unknown = JSON.parse(raw);
if (isPayload(data)) {
  console.log(data.name); // safely typed
}
```

## Doc Comments

`code-comments.md` decides _whether_ to comment; TSDoc decides the shape when you do.

- `/** */` on exported API, `//` for inline rationale. Editors surface the former on hover, so it is documentation, not narration.
- Never restate a type in prose. `@param value - the string to parse` adds nothing over `value: string`; describe the constraint or the failure mode instead.
- Reach for `@param` / `@returns` / `@example` when the signature leaves something open (units, ranges, thrown errors, a non-obvious return of `undefined`), not by default.
- `@deprecated` on anything consumers still import, with the replacement named.

## Utility Functions

Write pure functions with JSDoc `@param`, `@returns`, and `@example` for non-obvious utilities:

```typescript
/**
 * Safely parses a string as an integer.
 * @param value - String to parse
 * @returns Parsed integer or undefined if invalid
 * @example safeParseInt('42') // 42
 */
export const safeParseInt = (value: string): number | undefined => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};
```

## Verify Your Work

```
pnpm check    # svelte-check
pnpm test     # vitest unit tests
```
