Warn for violating importance (strong) markers.

  Options: `'consistent'`, `'*'`, or `'_'`, default: `'consistent'`.

  `'consistent'` detects the first used importance style and warns when
  subsequent importance sequences use different styles.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  formats importance using an `*` (asterisk) by default.
  Pass
  [`strong: '_'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsstrong)
  to use `_` (underscore) instead.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.