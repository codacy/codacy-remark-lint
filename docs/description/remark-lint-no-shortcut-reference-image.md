Warn when shortcut reference images are used.

  Shortcut references render as images when a definition is found, and as
  plain text without definition.
  Sometimes, you don’t intend to create an image from the reference, but this
  rule still warns anyway.
  In that case, you can escape the reference like so: `!\[foo]`.