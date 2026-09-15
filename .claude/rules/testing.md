---
paths:
  - '**/*.test.ts'
  - '**/*.test.tsx'
  - '**/*.test.mts'
  - '**/*.test.js'
  - '**/*.test.mjs'
  - '**/*.spec.ts'
  - '**/*.spec.tsx'
  - '**/*.spec.mts'
  - '**/*.spec.js'
  - '**/*.spec.mjs'
---

# Testing

This rule decides whether a test is worth writing, where it lives, what it covers, and how it
is named. It applies to any
test runner with a `describe`/`it` shape. For suffix conventions, build-exclusion advice, and
runnable examples, see `testing-typescript.md` or `testing-javascript.md`, whichever guide
this repo installed.

The rule assumes a test you are writing. When you are changing behavior instead, the test
that covers it is part of the change, not a follow-up.

## Rule — follow without deliberation

### Whether the test is worth writing

- **A test earns its place by failing when the behavior breaks.** That is the whole bar. Check
  it: introduce the bug the test is supposed to catch, run the test, confirm it goes red, then
  revert. A test that stays green under a deliberate bug is not weak coverage, it is zero
  coverage, and deleting it loses nothing.
- **A flaky test is quarantined and fixed at the root, never deleted to reach green.**
  Common causes: isolation (shared state), unsettled async, and a real clock (time).
- **Do not run that check when the bug would kill the process instead of failing an
  assertion.** A guard against a native panic, a stack overflow, or an out-of-memory has that
  shape. Removing it ends the run rather than reddening a test, so it proves nothing a reader
  can distinguish from an unrelated crash, and the revert may never happen because the process
  that would have done it is gone. Pin the guard's observable result instead: that the call
  returns the error, with the test surviving to assert it. That version is falsifiable the
  ordinary way, because deleting the guard changes a returned value.
- **Never write a test to move the coverage number.** Coverage reports which lines ran, not
  which behaviors are pinned, and a line runs fine under a test that asserts nothing about it.
  Find the decision nothing covers and test that. The number follows.
- **Assert the value, not that a value exists.** `toBeDefined`, `toBeTruthy`, and `length > 0`
  pass on almost every wrong answer. Name the result you expect. If you cannot say what it
  should be, you do not yet understand the behavior well enough to pin it. `toBeCloseTo` with
  no digit count is a tolerance the test never chose. Write the digits, derive them from the
  calculation, and use it only for the result of floating arithmetic. An integer, a count, or
  a constant passed through is exact and takes `toBe`. The derivation (absolute tolerance,
  `0.005` at the default, exact state for a deterministic sim) lives in the simulation guide.
  `not.toThrow()` or an `isFinite` sweep as the only assertion is an existence assertion in
  disguise. It passes on every finite wrong value.
- **Write the expected value as a literal.** Computing it with the same expression the code
  uses, or by calling the same library the code calls, makes the test agree with the
  implementation by construction. It then passes on every bug the two share, which is most of
  them.
- **Do not test code you did not write.** That a validation library rejects a malformed string,
  or that a framework fires its own lifecycle hook, is covered by that project's suite. Test the
  schema you declared and what your code does with the result.
- **Do not test what the type checker or the linter already refuses.** A test that passes a
  string where the signature says number, calls a function with a missing argument, or checks
  that a required field is a `number` tests the compiler, not the code. Turn the checker on and
  delete the test. What static cannot see, a decision over values or an effect at a boundary,
  is what a runtime test is for.
- **Skip the passthrough.** A getter that returns a field, a re-export, a wrapper that forwards
  its arguments unchanged. There is no decision to get wrong, so there is nothing to pin. A
  wrapper that supplies a default, reorders arguments, or swallows an error is not a
  passthrough, and that decision is worth a test.
- **Asserting that a mock was called is not an assertion about behavior.** `toHaveBeenCalledWith`
  pins how the code reached its result, so it breaks on a refactor that kept the result correct
  and passes when the collaborator's contract changed underneath. Assert what the caller
  observes. Keep `toHaveBeenCalled*` only where the call is the effect: it crosses a boundary
  (a request that must reach a server, a line that must reach stderr, a command that must
  reach the other process), or it is a callback the test itself supplied as the subject's
  output channel (`onclose`, a registered `run`). Never on a spy over a real in-process
  collaborator whose resulting state the test can read, and never on a function the test
  stubbed earlier, since the subject's use of the answer is the assertion. A call count is an
  assertion only when the count is the behavior (a dedupe, a cache, a retry budget). Pin only
  the arguments the behavior is about and `expect.anything()` the rest.
- **When a test fails, fix the code or rewrite the test deliberately.** Loosening an assertion
  until it passes turns one real failure into permanent green, and the next reader cannot tell
  that happened. If the behavior genuinely changed, state the new behavior in the name and in
  the assertion.

### Placement

- **Tests colocate in one dedicated test directory beside the code they cover, named the
  same way everywhere in the repo.** The default name is `__tests__`. A repo that already
  uses another name (`__test__`, `tests`) declares it once and never mixes two. A test for
  `src/core/drift.ts` is `src/core/__tests__/drift.test.ts` under the default. Close enough
  to find without a search, in a directory of its own so it does not clutter the module
  listing. Checked mechanically: the checker takes the configured directory name and checks
  only that a test file sits inside it. Whether it is beside the right subject stays a human
  read, since a real corpus check found 40% of test files name a tree or a concept rather
  than one sibling file, which is a judgment call, not a path match.
- **Split by SUBJECT, not by layer, and setup does not count toward the
  subject.** A test that builds a repo, runs one command, then checks the result is about that
  command. Counting the setup makes everything look cross-cutting and nothing colocates. One
  file per subject, a `describe` per concern, and never a parallel `.e2e.test.ts` tier that
  splits one subject across two places. Checked mechanically: only the `.e2e.test.ts` tier.
  Whether a file is genuinely split by subject is still a human read.
- **Assume every test has an owner.** "This one is cross-cutting" is almost always a misreading.
  An entry point is a unit, and so is a test that drives several components as long as one of
  them is the subject. Before filing something as ownerless, name the source file it is about
  and confirm that file does not exist. A test about a whole built tree is owned by that tree,
  so it goes in `<that-tree>/__tests__/`.
- **Shared fixtures and setup are not tests, so they do not go in the test directory.** Put
  them in a plainly named `test/` directory. The distinction is worth holding: the test
  directory means tests live here, `test/` means testing infrastructure lives here. A test
  directory containing no tests misleads every reader who greps it.

### What to test, and at which level

- **A test's layer is named by what it doubles.** Not by how many modules it imports, what
  directory it lives in, what suffix it carries, or which runner executes it. The default test
  runs the subject with its real in-process collaborators and doubles only what leaves the
  process. Below it is static (the type checker and the linter). Above it are a process test
  (the built artifact run as a child process) and a browser test (a component or scene under
  browser mode). No ratio between them is named.
- **Pin a decision at the lowest layer that can observe it.** If a decision is pure, test the
  function that makes it at the default. Driving the whole program to observe one branch is
  slower, and the failure names the program rather than the decision. A bug caught only above
  the default is also a missing test at the default.
- **A process test or a browser test proves wiring, once.** Cover that the pieces are connected
  and that the real boundaries work, such as exit codes, file writes, and rendered output.
  Branch coverage belongs to the default.
- **Extract a pure function when a test wants one.** A decision buried in an I/O function can
  be lifted out with the I/O left at the call site. Let the test drive the extraction rather
  than restructuring code no test asked about.
- **Real implementations by default.** A double stands in only for a boundary, which is
  network, IPC, the file system when the test cannot own a temp dir, process exit, stdout and
  stderr, the clock, and randomness, and it replaces the one function at the root of that
  boundary (`fetch`, `invoke`, `fs.accessSync`), not the own module that wraps it, overriding
  one function on the real module before replacing the module. An in-process collaborator may
  be doubled only when it is unaffordable (slow, nondeterministic, or a large dependency tree
  such as a navmesh or a loader), and then only as a fake: a working implementation with
  state, owned beside the real one, with its own tests or a contract test run against both.
  Never a mock or stub of an own module for any other reason, since the test then no longer
  knows whether the two halves still agree.
- **Stage from data, not by running another component.** Stage from a fixture, a factory, or a
  snapshot produced once (by the real program is fine) and copied per test. Never stage by
  invoking a sibling entry point, a second command, route, or whole-program runner with its own
  suite, since a regression there fails every suite that staged through it and names the wrong
  subject. When a state has no data form and is reachable only by running the pipeline the
  subject lives in, running that pipeline in Arrange is allowed when the run is deterministic,
  bounded by a step limit, and the helper or `describe` names the path taken. Data helpers are
  nouns (`fixtureWorld`, `installedRepo`), pipeline helpers are verbs (`tickUntilHit`,
  `runWholeMatch`), live in `test/`, and take a bound. A whole-program run asserts only what
  the whole program produces. The values an assertion depends on stay in the test body or the
  helper's parameters, never only inside the fixture file. Do not ask a second component
  whether the first one worked, assert the specific thing you care about.
- **Cover the failure path.** A function with an error branch and no test for it has an
  untested error branch. This is the most common real gap.
- **One behavior per test.** If the name needs "and", it is two tests. Expensive setup is not
  a reason to fuse assertions. Hoist the setup into `beforeEach`, where it constructs the
  subject and collaborators in default state and `afterEach` destroys them. A value the
  assertion depends on is set in the test body even when setup already set one, and a
  `beforeEach` whose fields most tests never read is a fixture to shrink.
- **Use a case table for one rule over many inputs.** `it.each` keeps the rule in one place and
  names each case in the output. Each row names a decision. A table whose rows all check one
  relation and none names a decision is a property: write the relation once over the domain
  (fast-check, where the repo has it), or over a seed table when the input is a seed.

### Structure

- **Arrange, Act, Assert, in that order, separated by a blank line.** Set up the inputs, perform
  the one action under test, then assert on the result. The shape should be visible at a glance
  without reading the code.
- **Blank lines carry the phases, not labels.** A `// Arrange` or `// Given` label is allowed
  only in a test long enough that whitespace no longer shows the three phases, and a test that
  long is usually two tests.
- **One Act per test.** Two actions means two behaviors, which means two tests. A test that
  arranges, acts, asserts, then acts again is a sequence, and it fails without telling you which
  step broke. If the behavior is a stepwise process (spend, spend again, spend past zero), the
  test may alternate act/assert pairs separated by blank lines, with an `expect` message on
  each pair naming the step, so the failure says which step broke.
- **Push a complicated Arrange into a named helper**, kept in the test file next to the tests
  that use it. `forgeManifestHash(root, path)` says what five lines of hashing and JSON
  rewriting are for.
- **Assert is where the test earns its keep.** A test whose Arrange dwarfs its Assert is usually
  testing setup, or is missing an extraction from the code under test.

### Naming

- **The description states the observable behavior.** After the subject in `describe`, the
  `it` reads as a sentence: `describe('deepMerge')` plus
  `it('recurses into nested objects rather than clobbering them')`. The `describe` names the
  function the file calls. A `describe('skillCheckResult')` over tests of
  `skillCheckTiltResult` is a copy-paste that misfiles every failure under it.
- **No identifier prefixes.** No `JM1:`, no case numbers, no ticket IDs. They convey nothing,
  and renumbering makes every reference stale. A unique behavioral description is the handle.
- **Name what the caller observes, not how the code does it.** `it('rejects an expired token')`
  survives a refactor. `it('calls validateExpiry')` does not.
- **Put failure-only context in the `expect` message, not a comment.** The second argument to
  `expect` prints when the assertion fails, which is the moment the context is needed.
- **A boolean assertion carries a message.** `toBe(true)`, `toBe(false)`, and `assert.ok(x)`
  print only the boolean on failure. Either name the fact in the second argument
  (`expect(ok, ok ? '' : error).toBe(true)`) or assert the value that produced the boolean.

### Never

- **No comments in a test file, as the working default.** This is a house choice, stricter
  than the literature. A test is read far more often than it is written, and it has three
  places to put meaning that a comment does not: the `describe` name, the `it` name, and a
  named helper. Use those. If you are about to write a comment, one of the three is wrong.
  - An assertion that needs explaining means the `it` name is wrong. Fix the name.
  - A setup step that needs explaining means it should be a named helper.
  - Context that only matters when the test fails goes in the second argument to `expect`,
    where it actually prints.
  - A falsification record (what bug reddens this) or a literal's derivation is failure-only
    context. Put it in the `expect` message, or in a sibling test named for it.
  - What survives is the rare domain fact a reader could not infer and no name can carry, such
    as why a malformed input is deliberately tolerated. Keep those short and about the SYSTEM,
    never about the test.
- **No file header comment on a test file.** This is stricter than `code-comments.md`'s
  exception for files that export nothing. A suite's contract is its `describe` names. A header
  restates them, then goes stale.
- **No banner or section dividers inside a test file.** Needing signposts to navigate a suite
  means it should be several suites, split by the unit under test.
- **No assertion-free test.** A test that runs code and asserts nothing passes forever and
  proves nothing. Vitest's `expect.requireAssertions` catches this and is worth turning on.
  Checked mechanically: that some config or setup file turns it on. Whether an individual
  test actually asserts something is Vitest's own runtime check, not this checker's.
- **No snapshot standing in for an assertion.** A snapshot of a large structure fails on every
  unrelated change and gets updated without being read. Assert the fields the behavior is
  about. A snapshot is allowed when the output is the product (an error message, a
  transformed source, a serialized document), it is small enough to read in review, it is
  deterministic, and it is inline or named for its content. A golden master for a generated
  table, a measured constant, or a sim trace is a characterization, not a snapshot: one
  committed expected value per scenario, the test name says it characterizes, the source of
  the value is in the name or the `expect` message, and the file is read on every change.
- **No test that reaches into private state to verify a result.** Assert what a caller can see.
  A test coupled to internals blocks the refactor it was supposed to protect.
- **No conditional in a test body.** An `if` around an assertion means the test has two cases.
  Write two tests, or a case table. A narrowing guard that throws on the discriminant an
  `expect` one line above already pinned is not a second case. Prefer `throw` to `return`
  there, so the guard reads as a guard.
- **No loop around an assertion.** A `for` over cases stops at the first failure and the output
  names the test, not the case that broke. Use `it.each` when each case is its own behavior.
  When the behavior is "all of them", collect the failures and assert once on the collection,
  so the message lists every one instead of the first. Loops in Arrange are fine. An assertion
  that stays inside a loop names the item in its message. A named helper may loop or branch
  when it asserts one fact and names the offending item, and a helper longer than the tests it
  serves carries a test of its own.
- **No test that polices a repo convention instead of production behavior.** A suite asserting
  where files live, how they are named, or how they are formatted is a lint rule wearing a test
  costume. It fails on a rename that broke nothing and passes while the product is broken. Put
  the convention in a rule, or in the linter if it must be mechanical. A test earns its place by
  telling you something about the code that ships.

### Where other rules apply

- Whether a comment should exist at all: see `code-comments.md`.
- How the sentence inside a description or comment reads: see `prose-voice.md`.
- Naming, function size, and dead code in test helpers: see `code-cleanliness.md`. Helpers are
  code and the same rules apply.

## Checked mechanically

`test-layout.mjs` takes `--test-dir <name>` (default `__tests__`) and checks colocation and
directory contents against it, the `.e2e.test.ts` tier, one suffix per package, and
build-output leakage. `test-config.mjs`, run over a repo's vitest config and setup files,
catches whether `expect.requireAssertions` is turned on anywhere, and its Svelte project
check runs only when the Svelte guide is installed. Everything else in this rule, including
whether a test would actually fail on the bug it claims to catch, is a human read.
