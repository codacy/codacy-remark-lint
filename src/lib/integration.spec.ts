// tslint:disable:no-expression-statement
import test from 'ava';
import * as path from 'path';
import run from './remark-runner';

test('run integration test for remark-lint-no-empty-url', async (t) => {
  const testsPath = path.join(
    process.cwd(),
    'test_samples/repositories/empty-urls'
  );
  const results = await run({
    codacyConfigPath: `${testsPath}/codacyrc`,
    sourcePath: testsPath
  });

  t.deepEqual(results, [
    {
      file: 'remark-lint-no-empty-url.md',
      line: 8,
      message:
        '[no-empty-url] Don’t use links without URL',
      patternId: 'remark-lint-no-empty-url'
    },
    {
      file: 'remark-lint-no-empty-url.md',
      line: 11,
      message:
        '[no-empty-url] Don’t use images without URL',
      patternId: 'remark-lint-no-empty-url'
    }
  ]);
});
