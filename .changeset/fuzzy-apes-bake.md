---
'eslint-config-widen': patch
---

Ignore unused variables in destructuring patterns when they start with an
underscore. This has worked historically for JavaScript, but it was not working
properly in TypeScript files.
