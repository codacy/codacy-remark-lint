> [remark-lint] plugin to ensure that external URLs in your Markdown are alive.


Checks all of the following:

```md
Checks [links](https://www.github.com).

Checks images: ![horse](/path/to/horse.jpg)

Checks definitions: see the [walrus].

[walrus]: /path/to/walrus.jpg
```

Uses [check-links] to check URLs for liveness.

A few details to keep in mind:

- By default, relative URLs are skipped. To check relative URLs, set `gotOptions.baseUrl` (see below).
- Ignores absolute URLs with protocols other than `http:` and `https:`.
- [check-links] memoizes results, so on any given run each URL will only be pinged once; subsequent checks will be returned from the cache.