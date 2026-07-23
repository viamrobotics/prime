# Editing Discipline

How to make changes safely, applies every session.

- **Work from the file's current state, not a stale view.** Re-read a file right before you edit it when your knowledge of it is second-hand (an earlier snapshot, a build or lint error, another tool's output) or the user may be editing it at the same time. For example, it's open in their editor. A tool's report and the file's current bytes can disagree within seconds; trust the bytes.
- **Don't rewrite what isn't yours to change.** When the user presents a file as their own finished work, or has it open mid-edit, don't silently "fix" it. Surface the problem and let them decide. Stay within the scope you were asked to touch.
