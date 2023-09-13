Warn when missing blank lines before block content (and frontmatter
  content).

  This rule can be configured to allow tight list items without blank lines
  between their contents by passing `{exceptTightLists: true}` (default:
  `false`).

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  always uses one blank line between blocks if possible, or two lines when
  needed.
  The style of the list items persists.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.