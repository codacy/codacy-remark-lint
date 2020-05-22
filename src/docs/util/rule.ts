import dox from 'dox';
import fs from 'fs';
import path from 'path';
import strip from 'strip-indent';
import trim from 'trim';
import { find } from './find';

const optionsRegex = /Options: .*, default: `'?(.*?)'?`/;

type DefaultValue = string | boolean | number | undefined;

export interface Rule {
  readonly description: string;
  readonly defaultValue?: DefaultValue;
  readonly title: string;
  readonly ruleId: string;
}

/* Get information for a rule at `filePath`. */
function ruleSync(filePath: string): Rule | undefined {
  const ruleId = path.basename(filePath);

  const [title, description] = getTitleAndDescription(filePath);

  const descriptionLines = description.split('\n');
  const optionsLine = descriptionLines.find((line) =>
    line.startsWith('Options')
  );

  return {
    defaultValue: findDefault(optionsLine),
    description: trim(description),
    ruleId,
    title
  };
}

function findDefault(optionsLine?: string): DefaultValue {
  const matches = optionsLine ? optionsLine.match(optionsRegex) : undefined;
  if (matches && matches.length > 1) {
    return matches[1];
  }

  return;
}

function getTitleAndDescription(filePath: string): readonly [string, string] {
  const indexPath = path.join(filePath, 'index.js');

  const code = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, 'utf-8')
    : '';

  const tags = dox.parseComments(code)[0].tags;

  const possibleDescription = find(tags, 'fileoverview');

  if (possibleDescription) {
    const commentDescription = strip(possibleDescription);
    return [trim(commentDescription).split('\n')[0], commentDescription];
  }
  // otherwise fallback to readme and package.json
  const description = getDescriptionFromReadme(filePath);
  const title = getPackageJsonDescription(filePath);

  return [title, description];
}

// just used to deserialize package.json
interface PackageValues {
  readonly description: string;
}

function getPackageJsonDescription(filePath: string): string {
  const packageValue = fs.readFileSync(
    path.join(filePath, 'package.json'),
    'utf-8'
  );
  const parsedValue = JSON.parse(packageValue) as PackageValues;
  return parsedValue.description;
}

function getDescriptionFromReadme(filePath: string): string {
  const readmePath = path.join(filePath, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath);
    const firstNewLine = readme.indexOf('\n');
    const firstTitle = readme.indexOf('\n## ');
    return readme
      .slice(firstNewLine + 1, firstTitle)
      .toString()
      .trim()
      .split('\n')
      .filter((line) => !line.startsWith('[!')) // remove badges
      .join('\n');
  }

  return getPackageJsonDescription(filePath);
}

export default ruleSync;
