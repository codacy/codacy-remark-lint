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
      line: 1,
      message:
        '[no-empty-url] Unexpected empty link URL referencing the current document, expected URL',
      patternId: 'remark-lint-no-empty-url'
    },
    {
      file: 'remark-lint-no-empty-url.md',
      line: 1,
      message:
        '[no-empty-url] Unexpected empty image URL referencing the current document, expected URL',
      patternId: 'remark-lint-no-empty-url'
    }
  ]);
});
