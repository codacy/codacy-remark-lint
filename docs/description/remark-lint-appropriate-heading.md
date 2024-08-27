> Check that the top-level heading matches the directory name

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [standard-readme](//github.com/RichardLitt/standard-readme).

This rule checks that the top title is in the right position, and that it references the current directory name.

_Options:_ `exact`, `slug`, default: `exact`

With default options, `exact`, checks that the exact lowercase title matches the directory name.
With options `slug`, checks that the slugified title matches the directory name.

Invalid, `~/example/a.md`:

```markdown
Paragraph

# Example
```

Invalid, `~/example/b.md`:

```markdown
Paragraph
```

Invalid, `~/example/c.md`:

```markdown
# Not “Example”
```

Valid, `~/example/d.md`:

```markdown
# Example
```

Valid, `~/some-example/e.md`, with option `slug`:

```markdown
# Some Example
```

```markdown
# Some-Example
```