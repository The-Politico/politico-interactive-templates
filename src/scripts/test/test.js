import expect from 'expect.js';
import path from 'path';
import glob from 'glob';
import rimraf from 'Utils/rimraf';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import { testTemplateName, testTemplateRepo } from 'Constants/testing';
import { register, test } from 'Scripts';
import { setup } from 'Scripts/new';

const emptyConfig = { templates: {} };

const context = {
  'name': 'app',
  'test': 'test',
};

describe('Test - No Cleanup', () => {
  let globalConfig;
  const dir = 'test/test-no-cleanup';

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await setup(testTemplateName, dir, false);
  });

  it('Tests templates', async function() {
    await test(context, path.join(dir, '.tmp.pit'), dir, false, false);

    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.contain('test/test-no-cleanup/README.md');
  });

  after(async function() {
    await outputConfig(globalConfig);
    await rimraf(dir);
  });
});

describe('Test - With Cleanup', () => {
  let globalConfig;
  const dir = 'test/test-with-cleanup';

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await setup(testTemplateName, dir, false);
  });

  it('Cleans up once the test finishes', async function() {
    await test(context, path.join(dir, '.tmp.pit'), dir, true, false);

    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.not.contain('test/test/README.md');
  });

  after(async function() {
    await outputConfig(globalConfig);
    await rimraf(dir);
  });
});
