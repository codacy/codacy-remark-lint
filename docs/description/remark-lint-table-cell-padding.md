Warn when table cells are incorrectly padded.

Options: `'consistent'`, `'padded'`, or `'compact'`, default: `'consistent'`.

`'consistent'` detects the first used cell padding style and warns when
subsequent cells use different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats tables with padding by default.
Pass
[`spacedTable: false`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsspacedtable)
to not use padding.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.