---
paths:
  - '**/*.test.ts'
  - '**/*.test.tsx'
  - '**/*.test.mts'
  - '**/*.spec.ts'
  - '**/*.spec.tsx'
  - '**/*.spec.mts'
---

# Testing — TypeScript

Language-specific guidance for TypeScript test files. See `testing.md` for the runner-agnostic
rules on placement, structure, and naming that this guide assumes. The examples below are
Vitest and TypeScript, but the principles they illustrate apply to any test runner with a
`describe`/`it` shape.

## Rule — follow without deliberation

- **Pick one suffix per package, `.test.ts` or `.spec.ts`, and never mix them within one.**
  Two conventions mean every glob in the package has to list both, and one of them
  eventually gets missed.
- **Exclude tests from the build.** A test under a compiled source root is emitted into the
  published output and imports the test runner, which is a dev dependency. Add the exclude to
  the build config, then check the output directory for a `__tests__` after building. Checked
  mechanically, once you point the checker at the built output directory.
- **Write a type test when the type IS the product.** A published package's public surface, a
  generic whose inference is the feature, or a discriminated union whose exhaustiveness callers
  rely on. Ordinary application code does not need one, since a runtime test already covers the
  values that flow through it. Use Vitest's built-in `expectTypeOf`, or `tsd`.
- **Enable Vitest's `typecheck` for a type test to run at all.** Vitest strips types by default
  rather than checking them, the same trap `CLAUDE.md` warns about for the whole repo. Without
  `typecheck: { enabled: true }` in the Vitest config, a file full of `expectTypeOf` assertions
  reports green while checking nothing. Checked mechanically, and only against Vitest's own
  `expectTypeOf`, not `tsd`.

## Checked mechanically

`test-layout.mjs` catches a package mixing `.test.` and `.spec.` suffixes (shared with
`testing-javascript.md`) and a test file leaked into the build output. `test-config.mjs`
catches a file using `expectTypeOf` with no vitest config enabling `typecheck`. Whether a type
test is worth writing at all stays a human read.

## Examples

**Bad — one assertion that cannot fail, one that restates the implementation:**

```ts
it('calculates the total', () => {
  const items = [{ price: 3 }, { price: 4 }];

  const total = calculateTotal(items);

  expect(total).toBeDefined();
  expect(total).toBe(items.reduce((sum, item) => sum + item.price, 0));
});
```

**Good — the expected value written out:**

```ts
it('sums the item prices', () => {
  expect(calculateTotal([{ price: 3 }, { price: 4 }])).toBe(7);
});
```

`7` is a fact about the behavior. The `reduce` was a second copy of the implementation, so it
agreed with the code even when both were wrong, and `toBeDefined` passed on `NaN`.

**Bad — asserting the call instead of the result:**

```ts
it('applies the discount', () => {
  const applyDiscount = vi.spyOn(pricing, 'applyDiscount');

  checkout({ items: [{ price: 100 }] }, { coupon: 'SAVE10' });

  expect(applyDiscount).toHaveBeenCalledWith(100, 10);
});
```

**Good — asserting what the caller gets:**

```ts
it('takes 10 percent off the total for a SAVE10 coupon', () => {
  const result = checkout({ items: [{ price: 100 }] }, { coupon: 'SAVE10' });

  expect(result.total).toBe(90);
});
```

The first test passes when `applyDiscount` returns the wrong number, and fails when the discount
moves into a helper with a different name. The second is the reverse on both counts.

**Bad — prefixed name, comments carrying the meaning, four behaviors in one test:**

```ts
test('DR1: doctor states', () => {
  const root = useInstalledRepo('monorepo');

  // healthy after init
  expect(runCli(['doctor', root]).status).toBe(0);

  // A local edit is reported as `yours` and still exits 0.
  appendFileSync(join(root, '.claude/scripts/guard.mjs'), '// tweak\n');
  expect(runCli(['doctor', root]).status).toBe(0);

  // missing file → error
  rmSync(join(root, '.claude/scripts/guard.mjs'));
  expect(runCli(['doctor', root]).status).toBe(1);
});
```

**Good — one behavior each, the name carries what the comment used to:**

```ts
describe('doctor', () => {
  let root: string;

  beforeEach(() => {
    root = useInstalledRepo('monorepo');
  });

  it('exits 0 on a freshly initialized repo', () => {
    expect(runCli(['doctor', root]).status).toBe(0);
  });

  it('exits 0 when a houserules file was edited locally, since nothing can acknowledge the edit', () => {
    appendFileSync(join(root, '.claude/scripts/guard.mjs'), '// tweak\n');
    expect(runCli(['doctor', root]).status).toBe(0);
  });

  it('exits 1 when a houserules file is missing', () => {
    rmSync(join(root, '.claude/scripts/guard.mjs'));
    expect(runCli(['doctor', root]).status).toBe(1);
  });
});
```

The one surviving explanation is in the third name, because "exits 0 on a local edit" is
genuinely surprising. The rule it encodes is stated, not narrated.

**Bad — driving the whole program to check one pure decision:**

```ts
it('errors on an unknown module', () => {
  const root = useRepo('monorepo');
  const result = runCli(['init', '--modules=nope', root]);
  expect(result.status).toBe(1);
  expect(result.stderr).toMatch(/Unknown module/);
});
```

**Good — the decision as a unit, plus one end-to-end test that it is wired in:**

```ts
// src/__tests__/plan.test.ts
describe('resolveModuleIds, given a context whose only default is core', () => {
  it('names the offending module when the id does not exist', () => {
    expect(() => resolveModuleIds(ctx, 'nope')).toThrow(
      /Unknown module "nope"/,
    );
  });

  it.each([
    { flag: '', expected: ['core'] },
    { flag: 'output-prose', expected: ['core', 'output-prose'] },
    { flag: 'output-prose,-output-prose', expected: ['core'] },
  ])('resolves "$flag" to $expected', ({ flag, expected }) => {
    expect(resolveModuleIds(ctx, flag)).toEqual(expected);
  });
});
```

Note what the case table pins: a bare id ADDS to the defaults rather than replacing them, and
a leading `-` removes. Those cases were written by reading the implementation, not by guessing
from the flag's name. Guessing is how a test ends up asserting a syntax the code never had.

**Bad — mocking a collaborator the test should be exercising for real:**

```ts
vi.mock('../parse-config', () => ({ parseConfig: () => ({ strict: true }) }));

it('runs in strict mode', () => {
  expect(loadSettings('./config.json').strict).toBe(true);
});
```

Nothing here would fail if `parseConfig` stopped returning `strict`.

**Good — mock the file system, run the real parser:**

```ts
it('runs in strict mode when the config file sets it', () => {
  vi.spyOn(fs, 'readFileSync').mockReturnValue('{"strict": true}');

  expect(loadSettings('./config.json').strict).toBe(true);
});
```

**Bad — a conditional hiding a second case:**

```ts
it('formats the total', () => {
  const result = format(items);
  if (items.length === 0) {
    expect(result).toBe('empty');
  } else {
    expect(result).toMatch(/^\$/);
  }
});
```

**Good — the two cases named:**

```ts
it('returns "empty" for no items', () => {
  expect(format([])).toBe('empty');
});

it('prefixes a currency total with $', () => {
  expect(format([{ price: 3 }])).toMatch(/^\$/);
});
```

**Bad — a generic's inference has no test, so it regresses silently:**

```ts
function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}

it('returns the first item', () => {
  expect(firstOf([1, 2, 3])).toBe(1);
});
```

A change that widens the return type to `T` (dropping `| undefined`) still passes this test.
The runtime value is unaffected either way, so nothing here would catch a caller losing the
`undefined` case on an empty array.

**Good — the inferred type pinned alongside the runtime value:**

```ts
it('returns the first item', () => {
  expect(firstOf([1, 2, 3])).toBe(1);
});

it('types the result as possibly undefined', () => {
  expectTypeOf(firstOf([1, 2, 3])).toEqualTypeOf<number | undefined>();
});
```

The second test fails the moment the signature drops `| undefined`, even though every runtime
value stays the same.
