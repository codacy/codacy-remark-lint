Warn when the list item marker style of unordered lists violate a given
  style.

  Options: `'consistent'`, `'-'`, `'*'`, or `'+'`, default: `'consistent'`.

  `'consistent'` detects the first used list style and warns when subsequent
  lists use different styles.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  formats unordered lists using `-` (hyphen-minus) by default.
  Pass
  [`bullet: '*'` or `bullet: '+'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsbullet)
  to use `*` (asterisk) or `+` (plus sign) instead.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.