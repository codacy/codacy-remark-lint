Warn when list item checkboxes violate a given style.

  Options: `Object` or `'consistent'`, default: `'consistent'`.

  `'consistent'` detects the first used checked and unchecked checkbox
  styles and warns when subsequent checkboxes use different styles.

  Styles can also be passed in like so:

  ```js
  {checked: 'x', unchecked: ' '}
  ```

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  formats checked checkboxes using `x` (lowercase X) and unchecked checkboxes
  as `·` (a single space).

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.