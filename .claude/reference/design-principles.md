---
description: Design principles behind the code-cleanliness rule. Simplicity, duplication, and structure, with sources.
---

# Design Principles

This doc is pull-only. Read it when making an abstraction or structure decision, not on
every turn. The resident rule is `code-cleanliness.md`. This is where its reasoning lives,
so read it before deciding whether to extract, split, or leave something duplicated.

## Simplicity

### KISS

Keep the implementation as simple as the requirements allow. Signs of a violation, usable
as a checklist:

- An interface created before a second implementation exists.
- An abstraction layer added "just in case".
- Excessive optional parameters.
- Deeply nested conditionals.
- Needing to understand several classes to understand one component.
- More boilerplate than business logic.

Techniques: prioritize readability over machine optimization, let abstractions emerge from
real repetition, prefer composition over inheritance, keep functions to one nameable task,
use standard constructs over invented ones.

KISS can push toward duplication and away from extensibility, which puts it in direct
tension with DRY below. The resolution is the simplest sufficient code that meets all
actual requirements. Duplication is cheaper than the wrong abstraction, so when the two
pull in opposite directions, let KISS win until a third occurrence proves the abstraction
is real.

Source: https://algomaster.io/learn/lld/kiss

### YAGNI

Do not build a capability the software does not yet need to support. Fowler names four
costs a presumptive feature carries:

- **Build.** Time spent analyzing and testing something nobody uses yet.
- **Delay.** The feature users actually needed sooner ships later.
- **Carry.** The added complexity slows every other feature for the life of the codebase.
- **Repair.** By the time the feature is needed, it no longer matches how the code works.

The caveat is the load-bearing part, and most summaries drop it. Fowler: "Yagni only
applies to capabilities built into the software to support a presumptive feature, it does
not apply to effort to make the software easier to modify." Refactoring and self-testing
code are not YAGNI violations. They are what makes YAGNI safe. Skipping them is not
following YAGNI, it is inverting it.

Source: https://martinfowler.com/bliki/Yagni.html

## Duplication

### DRY

The original statement, from Hunt and Thomas: "Every piece of knowledge must have a
single, unambiguous, authoritative representation within a system." The word is
**knowledge**, not code text. Two functions that read alike but encode two independent
business rules are not a DRY violation, and merging them couples rules that should be
free to change separately.

Documented limits: premature abstraction produces rigid code, engineers stay invested in
an abstraction past the point it still fits (sunk cost), and the rule of three says
abstract once duplication has actually appeared, not in anticipation of it.

Source: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

### The rule of three

Solve it plainly the first time. Tolerate the duplication the second time. Refactor into
an abstraction on the third. An early abstraction is a guess about requirements you do not
yet know, and a guess that gets hardened into code is expensive to undo.

Sources: https://understandlegacycode.com/blog/refactoring-rule-of-three/ ·
https://www.vladimirzdrazil.com/posts/aha-principle/

### The wrong abstraction

Sandi Metz: "Duplication is far cheaper than the wrong abstraction." Her decay sequence
is worth reproducing in full because it is recognizable in a diff:

1. Someone sees duplication.
2. They extract it into a named abstraction.
3. They replace the duplicates with calls to it.
4. Time passes.
5. A new requirement is _almost_ compatible with the abstraction.
6. Someone adds a parameter and a conditional to make it fit.
7. Repeat until the abstraction is incomprehensible.
8. You inherit it.

The remedy: inline the abstraction back into each caller, work out what each caller
actually needs from the parameters it was passing, then delete the rest. Metz again:
"When the abstraction is wrong, the fastest way forward is back."

Source: https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction

### Orthogonality

Keep unrelated components independent, so a change to one does not force a change in
another. Two components are orthogonal when you can reason about, test, and change either
one without touching the other. This is a broader claim than DRY above: DRY is about not
duplicating one piece of knowledge, orthogonality is about not letting two pieces of
knowledge become coupled in the first place.

Source: Hunt and Thomas, The Pragmatic Programmer.

## Depth

### Deep modules

Prefer a deep module, a simple interface hiding substantial functionality, over a shallow
one whose interface is nearly as complex as what it implements. The interface is a cost
every caller pays. The implementation is a cost paid once, inside the module. A module
earns the complexity it carries by hiding more of it than it exposes.

This is the fuller reasoning behind `code-cleanliness.md`'s line on function size: past 20
to 30 lines, look again, because the function may mix abstraction levels or be doing one
task a split would only fragment. Splitting a function by length alone often turns one deep
module into several shallow ones, each with its own interface, and now every caller has to
understand all of them instead of one.

Source: John Ousterhout, A Philosophy of Software Design.

## Errors

### Define errors out of existence

The strongest way to handle an error is to remove the special case that would otherwise
need handling, rather than add a handler for it. An API that returns an empty result instead
of throwing when nothing matches removes a branch from every caller, instead of asking each
caller to add its own try/catch.

Source: Ousterhout, A Philosophy of Software Design.

## Structure

SOLID is usually stated in class terms. houserules installs into repos that may have no
classes at all, so each principle below keeps its canonical name, for greppability, and
gets a restatement at module and function level.

### SRP — Single Responsibility Principle

A module has one and only one reason to change. At function level: a function does one
job and is named for that job. Smell it prevents: a change to one concern forcing an
unrelated part of the same file or function to be re-tested.

Source: https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design

### OCP — Open/Closed Principle

A module is open for extension but closed for modification. At function level: adding a
new case should mean adding code, not editing every existing branch. Smell it prevents:
an `if`/`else` or `switch` chain that grows a new branch every time a type is added.

Source: https://realpython.com/solid-principles-python/

### LSP — Liskov Substitution Principle

Anything that stands in for another implementation of the same contract must be safely
substitutable for it. At function level: two functions implementing the same interface
must accept the same inputs and honor the same failure modes. Smell it prevents: a
substitute that narrows a return type or throws where the original did not, breaking
every caller that trusted the contract.

Source: https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design

### ISP — Interface Segregation Principle

No consumer should be forced to depend on parts of an interface it does not use. At
function level: a function's parameters should be exactly what it needs, not a shared
options bag built for every caller. Smell it prevents: a config object where most fields
are irrelevant to most call sites, so every caller has to know the fields it can ignore.

Source: https://realpython.com/solid-principles-python/

### DIP — Dependency Inversion Principle

Depend on abstractions, not on concrete implementations. High-level modules must not
depend on low-level ones. At function level: a function that needs a capability takes it
as a parameter or an injected dependency, rather than importing one specific
implementation directly. Smell it prevents: a core module that cannot be tested or reused
without dragging in an unrelated concrete dependency, such as a specific database client
or filesystem.

Source: https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design

## Refactoring and legacy code

### Small, safe, test-backed steps

Refactor using a named catalog of refactorings, extract function, inline variable, rename,
in small steps backed by a passing test suite, rather than as one large rewrite with no net.
Each step should leave the tests green, so a mistake is caught at the step that introduced
it instead of after everything else has changed too.

Source: Martin Fowler, Refactoring.

### Characterization tests

Treat code with no tests as legacy code. Before changing its behavior, write a
characterization test that pins what it currently does, not what it should do. That test is
the safety net for the refactor that follows, and it gets rewritten once the behavior you
actually wanted is in place.

Source: Michael Feathers, Working Effectively with Legacy Code.

### Seams

A seam is a place you can change a program's behavior without editing the code at that
place, usually by injecting a dependency instead of importing it directly. Introduce a seam
to make tightly coupled code testable before you change it. This is the same move as
Dependency Inversion above, used as a rescue tactic on code that was not designed for it
rather than as a starting design.

Source: Feathers, Working Effectively with Legacy Code.

## Testing and review

### Static analysis as the cheapest layer

Treat static analysis and type-checking as the cheapest layer of test coverage. A type
error or a lint violation is caught before any test runs, for a fraction of the cost of
running one. Where the type system can already make an assertion, let it, instead of
writing a runtime check or a test for the same fact.

### Depending on undocumented behavior

If your code relies on a behavior a dependency does not document or test, add a test that
pins it. An untested reliance can change without warning, because the maintainer never
promised it would hold. This is sometimes called the Beyoncé Rule: if you liked it, you
should have put a test on it.

`testing.md` says not to test code you did not write, aimed at a library's own documented
contract, covered by that library's own suite. This is the opposite case. You are depending
on something outside that contract, and the test you add protects your own code, not the
library's.

### Property-based testing

Where a function has an algebraic invariant, such as `decode(encode(x)) === x`, prefer
generating inputs against that invariant over hand-picking examples. Generated inputs find
edge cases a person would not think to write down, and a failure shrinks to the smallest
input that still reproduces it.

### The purpose of code review

Code review exists for the long-term health of the codebase, not to enforce a reviewer's
personal style preference. A comment worth raising should survive being asked whether the
codebase is measurably worse if left as is. One that does not survive that question is a
preference, not a finding.

### Test Desiderata

Kent Beck's Test Desiderata names properties a good test has, among them isolated, fast,
repeatable, and self-checking, more than a dozen in total, in tension with each other. Judge
whether a test is worth keeping against the list, and never trade one property away without
gaining a better one. Use it where `testing.md`'s own bar, that a test earns its place by
failing when the behavior breaks, does not settle whether to keep or cut a specific test.

## Documentation

### Diataxis

Separate documentation into four types: tutorials, how-to guides, reference, and
explanation. Deciding which one a document is before writing it keeps that document from
trying to teach, guide, describe, and explain all at once, which is what makes most
documentation hard to read.

Source: Diataxis (diataxis.fr).

### Docs as code

Treat documentation the way you treat source: version-controlled, plain text, reviewed, and
built through the same CI as the code it describes. A doc that lives outside that pipeline
can drift from the code silently, since nothing fails when it goes stale.

### README structure

A README should follow a predictable, standard structure, so a reader always knows where to
find setup, usage, and contribution information without hunting for it. Consistent
placement is what makes a README skimmable across projects, not just within one.
