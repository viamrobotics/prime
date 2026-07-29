---
paths:
  - "**/*.ts"
---

# TypeScript Best Practices

`strict: true`. See the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/).

## Type Definitions

`interface` for object shapes, since they extend. `type` for unions and computed types.

```typescript
interface ButtonOptions {
  variant: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

type ConnectionStatus = "connected" | "disconnected" | "connecting";
```

## NEVER Use `any`

**NEVER** type untyped external data as `any`. Use `unknown` and narrow with a type guard:

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

`code-comments.md` decides _whether_ to comment. TSDoc decides the shape.

- `/** */` on exported API, `//` for inline rationale. Editors surface the former on hover, so it is documentation, not narration.
- Never restate a type in prose. `@param value - the string to parse` adds nothing over `value: string`. Describe the constraint or the failure mode instead.
- Reach for `@param`, `@returns`, or `@example` when the signature leaves something open: units, ranges, thrown errors, a non-obvious `undefined` return. Not by default.
- `@deprecated` on anything consumers still import, naming the replacement.

```typescript
/**
 * @returns undefined when `value` is not a base-10 integer.
 * @example safeParseInt('42') // 42
 */
export const safeParseInt = (value: string): number | undefined => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};
```

## Verify Your Work

```
pnpm check
pnpm test
```
