This rule for [remark-lint][] enforces that heading have a certain number of
words. By default, heading must have at least 2 words and at most 10. You can
configure this length like this:

```
{
    "plugins": [
        "remark-preset-lint-recommended",
        ["remark-lint-heading-length", ["error", {
            "min": 3,
            "max": 12
        }]]
    ]
}
```

This would enforce at least 3 and at most 12 words within the heading of your
Markdown files.

[remark-lint]: https://github.com/wooorm/remark-lin