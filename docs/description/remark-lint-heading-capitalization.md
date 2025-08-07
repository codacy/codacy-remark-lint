[remark-lint](https://github.com/remarkjs/remark-lint) plugin to ensure that your Markdown headings capitalization is correct.

1. Capitalize the first word, as well as all nouns, pronouns, verbs, adjectives, and adverbs.
2. Articles, conjunctions, and prepositions should remain lowercase.
3. Capitalize the first element in a hyphenated compound. The other elements are generally capitalized unless they are articles, conjunctions, or prepositions.

Some additional points to note:

- The plugin only checks the first letter of words that require capitalization.
- Words written in uppercase are automatically skipped by the plugin.