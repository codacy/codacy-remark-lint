Warn for literal URLs in text.
  URLs are treated as links in some Markdown vendors, but not in others.
  To make sure they are always linked, wrap them in `<` (less than) and `>`
  (greater than).

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  never creates literal URLs and always uses `<` (less than) and `>`
  (greater than).

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.