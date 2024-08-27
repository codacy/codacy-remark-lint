Warn for too many consecutive blank lines.
  Knows about the extra line needed between a list and indented code, and two
  lists.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  always uses one blank line between blocks if possible, or two lines when
  needed.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.