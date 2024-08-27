Warn when list looseness is incorrect, such as being tight when it should
  be loose, and vice versa.

  According to the [`markdown-style-guide`](http://www.cirosantilli.com/markdown-style-guide/),
  if one or more list items in a list spans more than one line, the list is
  required to have blank lines between each item.
  And otherwise, there should not be blank lines between items.

  By default, all items must be spread out (a blank line must be between
  them) if one or more items are multiline (span more than one line).
  Otherwise, the list must be tight (no blank line must be between items).

  If you pass `{checkBlanks: true}`, all items must be spread out if one or
  more items contain blank lines.
  Otherwise, the list must be tight.