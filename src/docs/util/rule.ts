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
  const indexPath = path.join(filePath, 'index.js');
  const code = fs.existsSync(indexPath)
    ? fs.readFileSync(path.join(filePath, 'index.js'), 'utf-8')
    : '';
  const tags = dox.parseComments(code)[0].tags;

  const possibleDescription = find(tags, 'fileoverview');

  const description = possibleDescription
    ? strip(possibleDescription)
    : getDescriptionFromPackage(filePath);
  const descriptionLines = description.split('\n');
  const optionsLine = descriptionLines.find((line) =>
    line.startsWith('Options')
  );

  return {
    defaultValue: findDefault(optionsLine),
    description: trim(description),
    ruleId,
    title: trim(description).split('\n')[0]
  };
}

function findDefault(optionsLine?: string): DefaultValue {
  const matches = optionsLine ? optionsLine.match(optionsRegex) : undefined;
  if (matches && matches.length > 1) {
    return matches[1];
  }

  return;
}

// just used to deserialize package.json
interface PackageValues {
  readonly description: string;
}

function getDescriptionFromPackage(filePath: string): string {
  const packageValue = fs.readFileSync(
    path.join(filePath, 'package.json'),
    'utf-8'
  );
  const parsedValue = JSON.parse(packageValue) as PackageValues;
  return parsedValue.description;
}

export default ruleSync;
