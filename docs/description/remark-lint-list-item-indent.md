Warn when the spacing between a list item’s bullet and its content violates
a given style.

Options: `'tab-size'`, `'mixed'`, or `'space'`, default: `'tab-size'`.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
uses `'tab-size'` (named `'tab'` there) by default to ensure Markdown is
seen the same way across vendors.
This can be configured with the
[`listItemIndent`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionslistitemindent)
option.
This rule’s `'space'` option is named `'1'` there.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.