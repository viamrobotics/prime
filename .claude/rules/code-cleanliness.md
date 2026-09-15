---
paths:
  - '**/*.ts'
  - '**/*.tsx'
  - '**/*.mts'
  - '**/*.js'
  - '**/*.jsx'
  - '**/*.mjs'
  - '**/*.cjs'
  - '**/*.svelte'
  - '**/*.svelte.ts'
  - '**/*.svelte.js'
---

# Code Cleanliness

This rule decides how the code you write reads: naming, function size, magic values, and
dead code. The principles are language-agnostic. The examples are TypeScript. Deeper
design and structure principles, such as when to introduce an abstraction, live in the
reference doc linked below.

## Rule — follow without deliberation

### Naming

- **Prefer intention-revealing names over short ones.** A name should say what a thing is
  or does, not save keystrokes. No single letters outside a tight loop index.
- **Spell out abbreviations.** An unexplained abbreviation forces every future reader to
  guess what it stands for.
- **Name booleans as predicates.** `isActive`, `hasProduct`, not `active` or `productFlag`.
  A predicate name reads correctly at the call site: `if (isActive)`.
- **Constants are `SCREAMING_SNAKE`, types are `PascalCase`.** These casings are the
  convention readers scan by, so breaking them costs a re-read.
- **Generics get a descriptive `T`-prefixed name, never a bare `T`.** `TRequest`, not `T`.
  A bare letter carries no meaning once a generic function has more than one type
  parameter.
- **Write acronyms as words.** `generateUserUrl`, not `generateUserURL`. Mixed-case
  acronyms break camelCase parsing at a glance.
- **If a comment is needed to explain a name, rename instead.** A name that needs a
  footnote is the wrong name.

### Function size

- **One function, one nameable task.** If you cannot name what a function does in a short
  phrase without "and", it is doing more than one thing.
- **Past 20 to 30 lines, look again.** It may mix abstraction, or be one task a
  split would only fragment.
- **Prefer early return over nested conditionals.** Nesting is what makes a function
  expensive to read, since the reader has to hold every enclosing condition in mind at
  once.
- **Prefer required parameters over optional ones.** A function that takes a bag of
  optional flags is usually two functions, or a discriminated union that makes the valid
  combinations explicit.

### Magic values

- **No unexplained literal in an expression.** A reader hitting `if (retries > 4)` has to
  guess whether 4 is a limit or a typo. Name it, or put it in an `as const` table.
- **Loop bounds and array indices of 0 and 1 are exempt.** `arr[0]`, `i < arr.length`, and
  `for (let i = 0; ...)` are idiomatic and naming them adds noise instead of clarity.

### Dead and speculative code

- **Delete unused exports.** An export nothing imports is dead weight a future reader has
  to rule out as unused before trusting it is unused.
- **Delete unreachable branches.** A branch nothing can hit is a lie about the code's
  behavior.
- **Delete speculative handling for cases the product does not have.** It adds a path to
  test and reason about for no behavior anyone needs. Version control remembers it.

### Catch-all files

- **Never create `types.ts`, `constants.ts`, `utils.ts`, `shared.ts`, or `helpers.ts`.**
  These names describe how a file was filled, not what it is responsible for, so nothing
  is ever out of place in one. They accumulate unrelated behavior until every module
  imports them and none can be read on its own.
- **Put the code in the unit that uses it.** A type, constant, or helper with one consumer
  belongs in that consumer. Proximity is what makes it findable, and a grep for the symbol
  lands the reader somewhere that explains it.
- **Genuinely shared code gets its own module, named for its responsibility.** Name it for
  what it does, not for the fact that several places need it. `retry-policy.ts` and
  `currency-format.ts` say what they hold. `utils.ts` says only that someone had nowhere
  else to put it.
- **The test is whether you can name the file's job without "and".** If you cannot, it is
  two modules. This is the one-nameable-task rule from Function size applied one level up,
  and it is the Single Responsibility Principle. See `../reference/design-principles.md`.

### Where other rules apply

- Whether and how to comment: see `code-comments.md`.
- Formatting: the repo's own formatter owns it, not this rule.
- Import order: the repo's linter owns it only where an import-order rule is configured. Where
  none is configured, nothing enforces it and this rule makes no claim about it.
- Deeper design principles, such as when duplication should become an abstraction: see
  `../reference/design-principles.md`.

### What is checked automatically

Where the repo's ESLint config has them on: unreachable branches, `PascalCase` type names,
`T`-prefixed generics, and nesting depth past `max-depth` are errors. Catch-all filenames are
caught by `.claude/scripts/catch-all-filename.mjs`, where installed. `/tidy` runs both over your
diff. A function past the length threshold surfaces as a candidate to judge, not a pass or fail.
Everything else in this rule, including booleans read as predicates, magic values, abbreviations,
and dead or speculative code beyond unreachable branches, is not yet automated.

## Examples

**Bad — cryptic name and unexplained abbreviation:**

```ts
function calc(u: User, t: number): number {
  return u.bal - t;
}
```

**Good — intention-revealing names:**

```ts
function calculateRemainingBalance(user: User, withdrawal: number): number {
  return user.balance - withdrawal;
}
```

**Bad — one function doing three things, nested three deep:**

```ts
function processOrder(order: Order) {
  if (order.items.length > 0) {
    if (order.customer) {
      if (order.customer.isVerified) {
        // charge, update inventory, send confirmation email, all inline
      }
    }
  }
}
```

**Good — early return, extracted steps:**

```ts
function processOrder(order: Order) {
  if (order.items.length === 0) return;
  if (!order.customer?.isVerified) return;

  chargeCustomer(order);
  updateInventory(order);
  sendConfirmationEmail(order);
}
```

**Bad — magic values with no explanation:**

```ts
if (retryCount > 4) {
  throw new Error('Too many retries');
}
```

**Good — named constant:**

```ts
const MAX_RETRIES = 4;

if (retryCount > MAX_RETRIES) {
  throw new Error('Too many retries');
}
```

**Bad — dead branch for a case the product does not have:**

```ts
function formatCurrency(amount: number, currency: 'USD' | 'EUR') {
  if (currency === 'USD') return `$${amount}`;
  if (currency === 'EUR') return `€${amount}`;
  // GBP support was never added, but this branch was left "just in case"
  return `£${amount}`;
}
```

**Good — deleted, matching the actual union:**

```ts
function formatCurrency(amount: number, currency: 'USD' | 'EUR') {
  if (currency === 'USD') return `$${amount}`;
  return `€${amount}`;
}
```

**Bad — catch-all files nothing can be out of place in:**

```
src/
  types.ts        // every type in the app
  utils.ts        // formatting, retry, date math, a JSON guard
  constants.ts    // timeouts next to feature flags next to copy strings
  checkout/
    index.ts
```

**Good — each file named for one job, most of it next to its consumer:**

```
src/
  retry-policy.ts       // the retry constants and the backoff that uses them
  currency-format.ts
  checkout/
    index.ts
    checkout-types.ts   // the types only checkout uses, beside checkout
```
