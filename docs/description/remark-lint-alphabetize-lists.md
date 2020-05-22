This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [free-programming-books-lint](https://github.com/vhf/free-programming-books-lint) to enforce [free-programming-books](https://github.com/vhf/free-programming-books) [formatting guidelines](https://github.com/vhf/free-programming-books/blob/master/CONTRIBUTING.md#formatting).

This rule ensures that all list items are in alphabetical order

```Text
<!-- Invalid -->

# Section
- B
- [A](#C)

<!-- Valid -->

# Section
- [A](#C)
- B
```