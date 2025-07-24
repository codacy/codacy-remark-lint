Warn when shortcut reference links are used.

Shortcut references render as links when a definition is found, and as
plain text without definition.
Sometimes, you don’t intend to create a link from the reference, but this
rule still warns anyway.
In that case, you can escape the reference like so: `\[foo]`.