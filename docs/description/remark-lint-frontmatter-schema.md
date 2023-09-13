<!-- [![Build Status](https://img.shields.io/github/workflow/status/JulianCataldo/remark-lint-frontmatter-schema/release/master.svg)](https://github.com/remark-lint-frontmatter-schema/actions/workflows/release.yml?query=branch%3Amain) -->

![Downloads](https://img.shields.io/npm/dt/remark-lint-frontmatter-schema)

<!-- [![Renovate](https://img.shields.io/badge/Renovate-enabled-17a2b8?logo=renovatebot)](https://app.renovatebot.com/dashboard) -->

Validate **Markdown** frontmatter **YAML** against an associated **JSON schema** with this **remark-lint** rule plugin.

Supports:

- **Types validation**, pattern, enumerations,… and all you can get with JSON Schema
- **Code location** problems indicator (for IDE to underline)
- **Auto-fixes** with suggestions
- **C**ommand **L**ine **I**nterface reports
- **VS Code** integration (see below)
- **Global patterns** or **in-file** schemas associations
- In JS framework **MD / MDX pipelines**

# Demo

<div align="center">

**🕹  Preview it online!**](https://astro-content.dev/__content)

<sup><sub>(w. Astro Content — Editor)</sub></sup>

</div>

---

**Jump to**:

- [👉  **Play with pre-configured ./demo**](#play-with-pre-configured-demo)
  - [Base](#base)
  - [VS Code (optional)](#vs-code-optional)
  - [CLI / IDE (VS Code) — **Static** linting](#cli--ide-vs-code--static-linting)
    - [Workspace](#workspace)
    - [Schema example](#schema-example)
      - [🆕  Add references to external definitions (advanced)](#add-references-to-external-definitions-advanced)
    - [Schemas associations](#schemas-associations)
      - [Inside frontmatter](#inside-frontmatter)
      - [Globally, with patterns](#globally-with-patterns)
    - [CLI usage](#cli-usage)
    - [Bonus](#bonus)
      - [Validate your schema with _JSON meta schema_](#validate-your-schema-with-json-meta-schema)
      - [ESLint MDX plugin setup](#eslint-mdx-plugin-setup)
        - [Known issues](#known-issues)
  - [MD / MDX pipeline — **Runtime** validation](#md--mdx-pipeline--runtime-validation)
    - [Custom pipeline](#custom-pipeline)
      - [Implementation living example](#implementation-living-example)
      - [Important foot-notes for custom pipeline](#important-foot-notes-for-custom-pipeline)
    - [Framework](#framework)
      - [Astro](#astro)
      - [Gatsby](#gatsby)

---


---


---


---