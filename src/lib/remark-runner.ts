import extensions from 'markdown-extensions';
import remark from 'remark';
import { Settings } from 'unified';
import unifiedEngine from 'unified-engine';
import { VFile } from 'vfile';
import { VFileMessage } from 'vfile-message';
import configFromCodacy, {
  Configuration,
  EmptyConfiguration
} from './codacy-configuration';

interface CodacyIssue {
  readonly file: string;
  readonly message: string;
  readonly patternId: string;
  readonly line: number;
}

interface AnalysisFailure {
  readonly error: Error;
  readonly message: string;
}

export default function run(
  options: {
    readonly sourcePath?: string;
    readonly codacyConfigPath?: string;
    readonly getCodacyConfiguration?: (path: string) => Configuration;
  } = {}
): Promise<ReadonlyArray<CodacyIssue>> {
  const {
    sourcePath = '/src',
    codacyConfigPath = '/.codacyrc',
    getCodacyConfiguration = configFromCodacy
  } = options;

  const { files = [sourcePath], config } = codacyConfigPath
    ? getCodacyConfiguration(codacyConfigPath)
    : EmptyConfiguration;

  const remarkLocalDefaults = {
    packageField: 'remarkConfig',
    pluginPrefix: 'remark',
    presetPrefix: 'remark-preset',
    rcName: '.remarkrc'
  };

  const configurationSource = config
    ? { defaultConfig: config }
    : {
        ...remarkLocalDefaults,
        defaultConfig: {
          plugins: [
            'remark-preset-lint-recommended',
            ['remark-lint-list-item-indent', false],
            ['remark-lint-ordered-list-marker-value', 'one']
          ]
        }
      };
  return new Promise((resolve, reject) => {
    return unifiedEngine(
      {
        ...configurationSource,
        cwd: sourcePath,
        extensions,
        files: [...files],
        ignoreName: '.remarkignore',
        out: false,
        processor: remark(),
        quiet: true,
        reporter: (vFiles: ReadonlyArray<VFile>, _: Settings) => {
          resolve(getCodacyIssues(vFiles));
          return '';
        },
        silentlyIgnore: true
      },
      (
        error: Error | null,
        code: 0 | 1,
        context: unifiedEngine.CallbackContext
      ) => {
        const analysisFailure = callback(error, code, context);
        if (analysisFailure) {
          return reject(analysisFailure);
        }

        return;
      }
    );
  });
}

function callback(
  error: Error | null,
  code: number | undefined,
  context: object | undefined
): AnalysisFailure | undefined {
  if (error) {
    return onError(error, code, context);
  }

  return;
}

function onError(
  error: Error,
  code: number | undefined,
  context: object | undefined
): AnalysisFailure {
  const message = `Error running processor

  ${error.toString()}

  code: ${code}
  context: ${context}`;

  return { error, message };
}

function getCodacyIssues(
  results: ReadonlyArray<VFile>
): ReadonlyArray<CodacyIssue> {
  const fileCodacyIssues = results.map((fileResults: VFile) => {
    const { path, messages } = fileResults;
    if (path === undefined) {
      throw Error('path must be defined');
    }
    return messages.map((message: VFileMessage) =>
      getCodacyIssue(path, message)
    );
  });

  return Array<CodacyIssue>().concat(...fileCodacyIssues);
}

function getCodacyIssue(path: string, msg: VFileMessage): CodacyIssue {
  return {
    file: path,
    line: msg.location.start.line || msg.line || 1,
    message: `${msg.ruleId ? `[${msg.ruleId}] ` : ''}${msg.reason}`,
    patternId: `${msg.source}-${msg.ruleId}`
  };
}
