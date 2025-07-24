Warn for violating fenced code markers.

Options: `` '`' ``, `'~'`, or `'consistent'`, default: `'consistent'`.

`'consistent'` detects the first used fenced code marker style and warns
when subsequent fenced code blocks use different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats fences using ``'`'`` (grave accent) by default.
Pass
[`fence: '~'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsfence)
to use `~` (tilde) instead.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.