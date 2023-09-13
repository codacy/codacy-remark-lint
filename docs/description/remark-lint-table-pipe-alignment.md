Warn when table pipes are not aligned.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  tries to align tables by default.
  Pass
  [`paddedTable: false`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionspaddedtable)
  to not align cells.

  Aligning cells perfectly is impossible as some characters (such as emoji or
  Chinese characters) are rendered differently in different browsers,
  terminals, and editors.
  You can pass your own
  [`stringLength`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsstringlength)
  function to customize how cells are aligned.
  In that case, this rule must be turned off.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.