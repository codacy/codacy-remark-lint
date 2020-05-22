This is a [remark-lint](https://github.com/wooorm/remark-lint) rule.

On some keyboards, for instance the default Swiss German keyboard layout `de_CH` [QWERTZ](https://en.wikipedia.org/wiki/QWERTZ) layout, the `#` symbol is obtained using `alt-3`. Because `alt-space` inserts a [non-breaking space](https://en.wikipedia.org/wiki/Non-breaking_space), it seems easy to insert `#<non-breaking space>` by mistake while writing Markdown heading `# title`.

This leads to headings getting parsed as normal Markdown paragraphs, here `a` and `c` are normal headings, `b` and `d` have probably been typed too fast without releasing the `alt` key between `#` and `space`:

![Markdown](./a.png)

![Preview](./b.png)

This `remark-lint` rule prevents this from ever happening by throwing an error whenever such situations are detected.