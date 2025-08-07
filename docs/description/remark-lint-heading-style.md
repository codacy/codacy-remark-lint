Warn when a heading does not conform to a given style.

Options: `'consistent'`, `'atx'`, `'atx-closed'`, or `'setext'`,
default: `'consistent'`.

`'consistent'` detects the first used heading style and warns when
subsequent headings use different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats headings as ATX by default.
This can be configured with the
[`setext`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionssetext)
and
[`closeAtx`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionscloseatx)
options.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.