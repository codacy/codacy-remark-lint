import fs from 'fs-extra';
import path from 'path';
import rule, { Rule } from './util/rule';

const remarkLintPath = './node_modules';

const defaultPresetRules: ReadonlyArray<string> = [
  'remark-preset-lint-consistent',
  'remark-preset-lint-recommended'
];

// Will keep here the rules we want to ignore for now (e.g., deprecated, not working, etc)
const ignoredRules: ReadonlyArray<string> = [];

export function getAllRules(): ReadonlyArray<Rule> {
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

export function remarkPresetLintRecommended(): ReadonlyArray<string> {
  const presetPatternRequireNameRegex = /require\(\'(.+)\'\)/;

  const defaultsList = defaultPresetRules.reduce(
    (listOfDefaultPatterns: ReadonlyArray<string>, preset: string) => {
      const presetDefinitionFileLocation = path.join(
        remarkLintPath,
        preset,
        'index.js'
      );
      const presetDefinitionFileContent = fs
        .readFileSync(presetDefinitionFileLocation)
        .toString();

      const presetPatternIds = presetDefinitionFileContent
        .split('\n')
        .map((line: string) => {
          const patternName = line.match(presetPatternRequireNameRegex);
          if (patternName) {
            return patternName[1];
          }
          return undefined;
        })
        .filter(
          (ruleId) =>
            ruleId !== undefined &&
            ruleId !== 'remark-lint' &&
            !ignoredRules.includes(ruleId)
        ) as ReadonlyArray<string>;

      return listOfDefaultPatterns.concat(...presetPatternIds);
    },
    []
  );

  return defaultsList;
}
