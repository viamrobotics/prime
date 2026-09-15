---
paths:
  - "**/*.ts"
---

# TypeScript

Assumes `strict: true`. See the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
for anything this rule does not cover.

## Rule — follow without deliberation

### Type definitions

- **`interface` for object shapes, since they extend.** `type` for unions and computed types.

```typescript
interface ButtonOptions {
  variant: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
```

### Never `any`

- **Never type untyped external data as `any`.** Use `unknown` and narrow with a type guard.

```typescript
// BAD
const data: any = JSON.parse(raw);

// GOOD
const data: unknown = JSON.parse(raw);
if (isPayload(data)) {
  console.log(data.name);
}
```

### More decisions

- **Exhaustive switches.** Give a switch over a discriminated union a `default` branch typed
  `never`, so a new variant fails at compile time instead of at runtime.
- **`@ts-expect-error`, not `@ts-ignore`.** `@ts-expect-error` fails once the error stops
  occurring. `@ts-ignore` suppresses forever.
- **Never drop a caught error. Attach it as `cause`.** Inside a `catch`, throwing anything without
  passing the error you caught loses the stack and the underlying message.
  `throw new Error('...', { cause: err })` keeps it. This covers throwing a **new** error, which is
  the common case, not only re-throwing the same object. A custom error class has to accept a
  `cause` and forward it to `super`, or none of its call sites can obey this rule.

```typescript
// BAD — the original error is gone
try {
  parse(raw);
} catch {
  throw new ConfigError('config is invalid');
}

// GOOD — the caller can still see what actually failed
try {
  parse(raw);
} catch (err) {
  throw new ConfigError('config is invalid', { cause: err });
}
```

### Where other rules apply

- Whether a comment should exist, and what form it takes: see `code-comments.md` if that rule
  is installed.
- Naming, function size, magic values, and dead code: see `code-cleanliness.md` if that rule is
  installed.
- How the sentence inside a comment reads: see `prose-voice.md` if that rule is installed.
- Formatting: the repo's own formatter owns it, not this rule.
- Import order: the repo's linter owns it only where an import-order rule is configured. Where
  none is configured, nothing enforces it and this rule makes no claim about it.
