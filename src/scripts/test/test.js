import expect from 'expect.js';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import rimraf from 'Utils/rimraf';
import spawn from 'Utils/spawn';
import { testTemplatePath } from 'Constants/testing';
import { test } from 'Scripts';

const context = {
  'name': 'test_app',
  'test': 'test',
  'dependentText': 'valid',
  'content': 'A1',
};

describe('Test - No Cleanup', () => {
  const dir = 'test/test-no-cleanup';

  before(async function() {
    await spawn('git', ['clone', testTemplatePath, path.join(dir, '.tmp.pit')], false);
  });

  it('Tests templates', async function() {
    await test(context, path.join(dir, '.tmp.pit'), dir, false, false);

    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.contain(path.join(dir, 'README.md'));

    const file = fs.readFileSync(path.join(dir, 'README.md')).toString('utf-8');
    expect(file.trim()).to.be('# test_app');
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
    expect(files).to.not.contain(path.join(dir, 'README.md'));
  });

  after(async function() {
    await rimraf(dir);
  });
});
