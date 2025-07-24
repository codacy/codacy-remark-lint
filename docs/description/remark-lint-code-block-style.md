Warn when code blocks do not adhere to a given style.

Options: `'consistent'`, `'fenced'`, or `'indented'`, default: `'consistent'`.

`'consistent'` detects the first used code block style and warns when
subsequent code blocks uses different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats code blocks using a fence if they have a language flag and
indentation if not.
Pass
[`fences: true`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsfences)
to always use fences for code blocks.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.