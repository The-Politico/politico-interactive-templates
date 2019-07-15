import expect from 'expect.js';
import path from 'path';
import glob from 'glob';
import rimraf from 'Utils/rimraf';
import getGlobalConfig from 'Utils/getGlobalConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import spawn from 'Utils/spawn';
import { testTemplateName, testTemplatePath } from 'Constants/testing';
import { register, test } from 'Scripts';

const emptyConfig = { templates: {} };

const context = {
  'name': 'app',
  'test': 'test',
};

describe('Test - No Cleanup', () => {
  const dir = 'test/test-no-cleanup';

  before(async function() {
    await spawn('git', ['clone', testTemplatePath, path.join(dir, '.tmp.pit')], false);
  });

  it('Tests templates', async function() {
    await test(context, path.join(dir, '.tmp.pit'), dir, false, false);

    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.contain('test/test-no-cleanup/README.md');
  });

  after(async function() {
    await rimraf(dir);
  });
});

describe('Test - With Cleanup', () => {
  const dir = 'test/test-with-cleanup';

  before(async function() {
    await spawn('git', ['clone', testTemplatePath, path.join(dir, '.tmp.pit')], false);
  });

  it('Cleans up once the test finishes', async function() {
    await test(context, path.join(dir, '.tmp.pit'), dir, true, false);

    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.not.contain('test/test/README.md');
  });

  after(async function() {
    await rimraf(dir);
  });
});
