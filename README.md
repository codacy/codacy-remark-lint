# codacy-remark-lint

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/65d66b1b6f134ef6b7225d2b66a8987d)](https://www.codacy.com/gh/codacy/codacy-remark-lint?utm_source=github.com&utm_medium=referral&utm_content=codacy/codacy-remark-lint&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/65d66b1b6f134ef6b7225d2b66a8987d)](https://www.codacy.com/gh/codacy/codacy-remark-lint?utm_source=github.com&utm_medium=referral&utm_content=codacy/codacy-remark-lint&utm_campaign=Badge_Coverage)
[![CircleCI](https://circleci.com/gh/codacy/codacy-remark-lint.svg?style=svg)](https://circleci.com/gh/codacy/codacy-remark-lint)
[![Docker Version](https://images.microbadger.com/badges/version/codacy/codacy-remark-lint.svg)](https://microbadger.com/images/codacy/codacy-remark-lint "Get your own version badge on microbadger.com")

Docker engine to allow Codacy to have [remark-lint](https://github.com/remarkjs/remark-lint) support.

## Usage

You can create the docker by doing:

```sh
yarn run docker:build
```

The docker is ran with the following command:

```sh
docker run -it -v $srcDir:/src  <DOCKER_NAME>:<DOCKER_VERSION>
```

## Agent Playbook: Updating This Repository End-to-End

This section is written for an AI coding agent (or a human) tasked with updating this repo — most commonly bumping the wrapped `remark-lint` version or one of its many rule plugins, but also base image / orb / dependency bumps. Follow it top to bottom; it tells you what to change, how to regenerate derived files, how to test locally, and how to interpret CI so you can iterate on failures without guessing.

### 1. What this repository is

This is a **Codacy engine**: a Node.js/TypeScript wrapper (entry point `src/index.ts`, built via `tsc`) that packages the [remark-lint](https://github.com/remarkjs/remark-lint) markdown-linting ecosystem as a Docker image Codacy's platform can run against a customer's repository. Unlike a single-tool wrapper, this repo bundles **dozens of independently-versioned npm packages** — `remark-lint` itself plus ~90 `remark-lint-*` rule plugins (declared individually in `package.json` `dependencies`) — each contributing one or more "patterns" (lint rules).

The `docs/` directory is not just documentation — it is **machine-consumed configuration**:

- `docs/patterns.json` — the full list of remark-lint patterns Codacy knows about, their parameters/defaults, and which are enabled out of the box. Generated file, do not hand-edit.
- `docs/description/description.json` + `docs/description/*.md` — human-readable titles/descriptions per pattern, used in the Codacy UI. Generated file, do not hand-edit.
- `docs/tool-description.md` — short blurb about the tool. Generated (overwritten) by the same script, but its content is a hardcoded string in the generator rather than scraped from anything.
- `docs-tests/*.md` — fixtures used by `codacy-plugins-test` to validate the engine actually flags/doesn't-flag real markdown samples for specific patterns.

All of the generated artifacts above come from **`docs:gen`** (`npm`/`yarn` script → `build/main/codacy-docs.js`, compiled from `src/codacy-docs.ts`, which in turn calls `src/docs/documentation-builder.ts`). The generator does **not** hit the network: it scans the locally-installed `node_modules/remark-lint-*` packages (i.e. whatever versions `yarn install` resolved from `package.json`/`yarn.lock`), extracts each rule's JSDoc via `dox` (see `src/docs/util`), and reports the overall tool `version` in `patterns.json` from `package.json`'s `dependencies['remark-lint']`. This means you **must run `yarn install` and `yarn run build` before `yarn run docs:gen`** — the generator reads compiled output and installed packages, not source.

### 2. Files that encode versions — check all of these on every update

| File | What it controls | What to check |
|---|---|---|
| `package.json` → `dependencies['remark-lint']` | The core tool version reported in `docs/patterns.json` | Bump to the target version; this is the value `codacy-docs.js` copies verbatim (minus a leading `^`) into `patterns.json`. |
| `package.json` → `dependencies['remark-lint-*']` (each of the ~90 rule plugins) | Individually versioned rule packages, each contributing one or more patterns | Bump only the ones in scope for the task; each is resolved and re-scanned independently by the doc generator. |
| `package.json` → `dependencies['remark-preset-lint-recommended']` / `remark-preset-lint-consistent` | Which patterns are `enabled: true` by default in `docs/patterns.json` | `documentation-builder.ts` parses these presets' own `index.js` to build the enabled-by-default list — a preset bump can silently change which patterns are on/off. |
| `yarn.lock` | Locked resolutions for every dependency above | Must be regenerated (`yarn install`) whenever `package.json` versions change; commit it alongside. |
| `Dockerfile` → `ARG NODE_IMAGE_VERSION` | Node.js base image for both build and runtime stages | Bump only if required by a new dependency's minimum Node version. |
| `.circleci/config.yml` → `codacy/base` orb | Shared CircleCI steps | Check the latest published version. |
| `.circleci/config.yml` → `codacy/plugins-test` orb | Runs `codacy-plugins-test` in CI | Same as above. |
| `src/patterns/disabledPatterns.ts` | Patterns explicitly disabled at runtime regardless of what `patterns.json` reports as enabled | Review if a version bump renames/removes a pattern referenced here. |
| `src/docs/documentation-builder.ts` → `ignoredRules` | Rule packages installed but deliberately excluded from doc generation (deprecated/broken/etc.) | Review if a bump reintroduces or renames one of these. |

### 3. Step-by-step update procedure

1. **Bump the version(s)** in `package.json` as scoped by the task (core `remark-lint`, one or more `remark-lint-*` plugins, and/or a preset).
2. **Install and lock**: `yarn install` (regenerates `yarn.lock`; commit it).
3. **Build**: `yarn run build` (runs `tsc` for both `build:main` and `build:module` — the doc generator needs `build/main/codacy-docs.js` to exist).
4. **Regenerate the docs**: `yarn run docs:gen`. Review the diff in `docs/patterns.json` and `docs/description/*` for new/removed/renamed patterns, changed defaults, or changed enabled-by-default status, and check `docs-tests/*.md` fixtures still reference valid pattern IDs.
5. **Lint/format/test the TypeScript source**: `yarn run test` (runs `build` again, then `tslint`, `prettier --list-different`, `remark`-lints this repo's own markdown, and the `ava` unit tests via `nyc`).
6. **Build the Docker image**: `yarn run docker:build` (`docker build --no-cache --tag codacy/codacy-remark-lint:dev .`).
7. **Run `codacy-plugins-test` locally** before pushing — clone https://github.com/codacy/codacy-plugins-test and run its Docker-based test commands against your local `codacy/codacy-remark-lint:dev` image, exercising both `docs/multiple-tests/*` and `docs-tests/*` fixtures.
8. **Iterate on failures**, re-running only the relevant command after each fix.
9. **Commit** the version bump(s), `yarn.lock`, and regenerated docs files together in one change.
10. **Push and open a PR.**
11. **Poll the PR's real CI checks until they all pass — local validation is NOT the finish line.** After every push, run `gh pr checks <pr-url>` and keep re-polling (short sleep while any check is `pending`) until all checks finish. If a check fails, fetch its actual log (don't guess), find the true root cause, fix it, push again (never `--no-verify`, never force-push), and re-poll. Repeat until every check is green. **The CI environment's toolchain can differ from your local one**, so a clean local run does not guarantee CI passes. Only stop iterating when every check passes, or you hit a genuine product/infra decision that needs a human.

### 4. Common failure modes and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| `docs/patterns.json` diff shows unrelated patterns changing `enabled` | A preset (`remark-preset-lint-recommended`/`-consistent`) version changed which rules it requires | Confirm against the preset's own changelog/`index.js`; this is expected when bumping presets, not a bug. |
| A `docs/description/*.md` file appears/disappears | A rule plugin was added/removed from `package.json`, or added to/removed from `ignoredRules` in `documentation-builder.ts` | Confirm intentional; update `ignoredRules` if the new version is deprecated/broken, as prior bumps (e.g. `remark-lint-code`, `remark-lint-no-long-code`) have done. |
| `docs:gen` throws or produces stale content | Ran before `yarn install`/`yarn run build`, so `node_modules` or `build/main/codacy-docs.js` doesn't reflect the new versions | Always run install → build → docs:gen in that order. |

### 5. Definition of done

- Version bump(s) reflected in `package.json` and `yarn.lock`.
- `docs/patterns.json`, `docs/description/description.json`, and `docs/description/*.md` regenerated via `yarn run docs:gen` and committed, with any fixture inconsistencies in `docs-tests/`/`docs/multiple-tests/` resolved.
- `yarn run build` and `yarn run test` (tslint, prettier, markdown lint, `ava` unit tests) pass locally.
- Docker image builds successfully via `yarn run docker:build`.
- `codacy-plugins-test` commands all pass locally against the freshly built image.
- **After pushing and opening/updating the PR, every CI check on it is green.** Poll `gh pr checks <pr-url>` and iterate on any failure until all pass.

## Docs

[Tool Developer Guide](https://support.codacy.com/hc/en-us/articles/207994725-Tool-Developer-Guide)

## Test

We use the [codacy-plugins-test](https://github.com/codacy/codacy-plugins-test) to test our external tools integration.
You can follow the instructions there to make sure your tool is working as expected.

## Generate Docs

```sh
yarn run docs:gen
```

## Limitations

- `remark-validate-links` is only supported with `repository: false`, details
on the [official documentation](https://github.com/remarkjs/remark-validate-links/tree/main#configuration):

```json
{
  "plugins": [
    [
      "remark-validate-links",
      {
        "repository": false
      }
    ]
  ]
}
```

## What is Codacy

[Codacy](https://www.codacy.com/) is an Automated Code Review Tool
that monitors your technical debt, helps you improve your code quality,
teaches best practices to your developers,
and helps you save time in Code Reviews.

### Among Codacy's features

- Identify new Static Analysis issues
- Commit and Pull Request Analysis with GitHub, BitBucket/Stash, GitLab (and also direct git repositories)
- Auto-comments on Commits and Pull Requests
- Integrations with Slack, HipChat, Jira, YouTrack
- Track issues in Code Style, Security, Error Proneness, Performance, Unused Code and other categories

Codacy also helps keep track of Code Coverage, Code Duplication,
and Code Complexity.

Codacy supports PHP, Python, Ruby, Java, JavaScript, and Scala, among others.

### Free for Open Source

Codacy is free for Open Source projects.
