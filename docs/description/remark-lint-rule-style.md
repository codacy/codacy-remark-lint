Warn when the thematic breaks (horizontal rules) violate a given or
  detected style.

  Options: `string`, either a corect thematic breaks such as `***`, or
  `'consistent'`, default: `'consistent'`.

  `'consistent'` detects the first used thematic break style and warns when
  subsequent rules use different styles.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  has three settings that define how rules are created:

  *   [`rule`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsrule)
      (default: `*`) — Marker to use
  *   [`ruleRepetition`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsrulerepetition)
      (default: `3`) — Number of markers to use
  *   [`ruleSpaces`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsrulespaces)
      (default: `true`) — Whether to pad markers with spaces

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.