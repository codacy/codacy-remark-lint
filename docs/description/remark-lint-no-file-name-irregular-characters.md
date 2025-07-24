Warn when file names contain irregular characters: characters other than
alphanumericals (`a-zA-Z0-9`), hyphen-minus (`-`), and dots (`.`, full
stops).

Options: `RegExp` or `string`, default: `'\\.a-zA-Z0-9-'`.

If a string is given, it will be wrapped in
`new RegExp('[^' + preferred + ']')`.

Any match by the wrapped or given expressions creates a message.