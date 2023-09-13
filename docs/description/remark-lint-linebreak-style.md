Warn when linebreaks violate a given or detected style.

  Options: either `'unix'` (for `\n`, denoted as `␊`), `'windows'` (for `\r\n`,
  denoted as `␍␊`), or `'consistent'` (to detect the first used linebreak in
  a file).  Default: `'consistent'`.

  ## Fix

  [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
  always uses unix linebreaks.

  See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
  on how to automatically fix warnings for this rule.