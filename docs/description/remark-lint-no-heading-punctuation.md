Warn when a heading ends with a group of characters.

Options: `string`, default: `'.,;:!?'`.

Note: these are added to a regex, in a group (`'[' + char + ']'`), be
careful to escape the string correctly.