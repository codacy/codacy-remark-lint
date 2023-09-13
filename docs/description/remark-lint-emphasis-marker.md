Warn for violating emphasis markers.

  Options: `'consistent'`, `'*'`, or `'_'`, default: `'consistent'`.

  `'consistent'` detects the first used emphasis style and warns when
  subsequent emphasis use different styles.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  formats emphasis using `_` (underscore) by default.
  Pass
  [`emphasis: '*'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsemphasis)
  to use `*` (asterisk) instead.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.