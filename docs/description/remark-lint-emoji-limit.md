This rule for [remark-lint][] enforces that there is at most one emoji in
each paragraph:

```
{
    "plugins": [
        "remark-preset-lint-recommended",
        "remark-lint-emoji-limit"
    ]
}
```

If you want to set the limit higher, you can do so by setting a `max` property
accordingly:

```
{
    "plugins": [
        // ...
        ["remark-lint-emoji-limit", ["warn", {
            "max": 2
        }]]
    ]
}
```

This would allow for up to two emojis per paragraph.

[remark-lint]: https://github.com/wooorm/remark-lint