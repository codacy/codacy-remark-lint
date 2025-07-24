Warn when the list item marker values of ordered lists violate a given
style.

Options: `'single'`, `'one'`, or `'ordered'`, default: `'ordered'`.

When set to `'ordered'`, list item bullets should increment by one,
relative to the starting point.
When set to `'single'`, bullets should be the same as the relative starting
point.
When set to `'one'`, bullets should always be `1`.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
retains the number of the first list item bullet, and by default
increments the other items.
Pass
[`incrementListMarker: false`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsincrementlistmarker)
to not increment further list items.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.