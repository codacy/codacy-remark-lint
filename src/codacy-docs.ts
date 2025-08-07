#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import {
  getAllRules,
  remarkPresetLintRecommended
} from './docs/documentation-builder';
import { Rule } from './docs/util/rule';

/* tslint:disable:no-expression-statement*/
const defaults = remarkPresetLintRecommended();

const root = path.resolve(__dirname);
const docsPath = path.resolve(`${root}/../../docs`);
const descriptionPath = path.resolve(`${docsPath}/description`);

const allRules = getAllRules();

if (fs.existsSync(docsPath)) {
  fs.removeSync(descriptionPath);
}

fs.mkdirSync(descriptionPath);

fs.writeFileSync(
  `${docsPath}/patterns.json`,
  JSON.stringify(getPatterns(allRules, defaults), null, 2)
);

fs.writeFileSync(
  `${descriptionPath}/description.json`,
  JSON.stringify(getDescriptions(allRules), null, 2)
);

allRules.forEach((rule: Rule) => {
  fs.writeFileSync(`${descriptionPath}/${rule.ruleId}.md`, rule.description);
});

fs.writeFileSync(
  `${docsPath}/tool-description.md`,
  `remark-lint is a markdown code style linter.
  Another linter? Yes.
  Ensuring the markdown you (and contributors) write is of great quality will provide better rendering
  in all the different markdown parsers, and makes sure less refactoring is needed afterwards.
  remark-lint is built on remark, a powerful markdown processor powered by plugins.`
);

/* tslint:enable:no-expression-statement*/

function getPatterns(
  rules: ReadonlyArray<Rule>,
  enabledByDefaultPatterns: ReadonlyArray<string>
): object {
  const patterns = rules.map((rule: Rule) => {
    const parameters = rule.defaultValue
      ? {
          parameters: [
            {
              default: rule.defaultValue,
              name: rule.ruleId
            }
          ]
        }
      : {};

    return {
      ...parameters,
      category: 'CodeStyle',
      enabled: enabledByDefaultPatterns.includes(rule.ruleId),
      level: 'Info',
      patternId: rule.ruleId
    };
  });

  // tslint:disable-next-line:no-unsafe-any
  const toolVersion = require('../../package.json').dependencies[
    'remark-lint'
  ].replace('^', '');

  return { name: 'remark-lint', patterns, version: toolVersion };
}

function getDescriptions(rules: ReadonlyArray<Rule>): ReadonlyArray<object> {
  return rules.map((rule: Rule) => {
    const parameters = rule.defaultValue
      ? {
          parameters: [
            {
              description: rule.ruleId,
              name: rule.ruleId
            }
          ]
        }
      : {};

    return {
      ...parameters,
      description: rule.title,
      patternId: rule.ruleId,
      timeToFix: 5,
      title: rule.title
    };
  });
}
