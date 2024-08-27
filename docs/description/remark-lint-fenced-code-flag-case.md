<!-- badges-end -->

# remark-lint-fenced-code-flag-case

This is a [remark-lint][1] rule to warn when fenced code blocks have
inconsistent or improperly cased language flags. Also comes with full unicode
support.

This check is useful when using [a tool like prettier that formats fenced code
blocks][2], since such tools do not consistently recognize uppercase or
mixed-case code flags. That is: code fenced with the flag `typescript` or
`markdown` will be formatted while code fenced with the flag `TypeScript` or
`MARKDOWN` may be _silently ignored_, even as syntax highlighting still works,
which results in a false sense of correctness.

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [Via API](#via-api)
  - [Via remark-cli](#via-remark-cli)
  - [Via unified configuration](#via-unified-configuration)
- [API](#api)
  - [Options](#options)
- [Examples](#examples)
  - [`ok-missing.md`](#ok-missingmd)
  - [`ok-lower.md`](#ok-lowermd)
  - [`not-ok-mixed.md`](#not-ok-mixedmd)
  - [`not-ok-upper.md`](#not-ok-uppermd)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->