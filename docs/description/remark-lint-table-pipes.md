Warn when table rows are not fenced with pipes.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  creates fenced rows with initial and final pipes by default.
  Pass
  [`looseTable: true`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsloosetable)
  to not use row fences.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.