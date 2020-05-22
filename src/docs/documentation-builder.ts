import fs from 'fs-extra';
import path from 'path';
import rule, { Rule } from './util/rule';

export default function allRules(): ReadonlyArray<Rule> {
  const remarkLintPath = './node_modules';
  const ignoredRules: ReadonlyArray<string> = [
    'remark-lint-code',
    'remark-lint-code-eslint'
  ];
  const parsedRules = fs
    .readdirSync(remarkLintPath)
    .filter((name) => /remark-lint-.*/.test(name))
    .map((basename: string) => {
      const base = path.resolve(remarkLintPath, basename);
      return rule(base);
    })
    .filter(
      (r) => r !== undefined && !ignoredRules.includes(r.ruleId)
    ) as ReadonlyArray<Rule>;

  return parsedRules;
}
