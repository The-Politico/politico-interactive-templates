import expect from 'expect.js';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import rimraf from 'Utils/rimraf';
import { setup, build, cleanup } from './index';

const context = {
  'name': 'app',
  'test': 'test',
};

describe('New - Setup: Downloads Template Repo', () => {
  const dir = 'example/setup';

  before(async function() {
    await setup('PIT Test', dir, false);
  });

  it('Downloads files', async function() {
    const files = glob.sync(path.join(dir, '.tmp.pit', '**'), { dot: true });
    expect(files.length).to.be.greaterThan(0);
    expect(files).to.contain(path.join(dir, '.tmp.pit/README.md'));
  });

  after(async function() {
    rimraf(dir);
  });
});

describe('New - Build: Builds Template Files', () => {
  const dir = 'example/build';
  let files;

  before(async function() {
    await setup('PIT Test', dir, false);
    await build(context, dir, false);

    files = glob.sync(path.join(dir, '**'), { dot: true });
  });

  it('Makes files', async function() {
    expect(files.length).to.be.greaterThan(0);
    expect(files).to.contain(path.join(dir, '.tmp.pit/README.md'));
  });

  it('Writes context into files', async function() {
    const file = fs.readFileSync(path.join(dir, 'README.md')).toString('utf-8');
    expect(file).to.be('# app\n');
  });

  it('Renames files with strings', async function() {
    expect(files).to.contain(path.join(dir, 'renamed.txt'));
  });

  it('Renames files with functions', async function() {
    expect(files).to.contain(path.join(dir, 'app/app_file.txt'));
  });

  it('Ignores global ignore files', async function() {
    expect(files).to.not.contain(path.join(dir, '.pitrc'));
  });

  it('Ignores global ignore directories', async function() {
    expect(files).to.not.contain(path.join(dir, '.git'));
  });

  it('Ignores project-specific ignore files', async function() {
    expect(files).to.not.contain(path.join(dir, 'ignore.txt'));
  });

  it('Ignores project-specific ignore directories', async function() {
    expect(files).to.not.contain(path.join(dir, 'ignore'));
  });

  after(async function() {
    rimraf(dir);
  });
});

describe('New - Cleanup: Deletes Template Repo', () => {
  const dir = 'example/cleanup';

  before(async function() {
    await setup('PIT Test', dir, false);
    await build(context, dir, false);
    await cleanup(dir, false);
  });

  it('Deletes files', async function() {
    const files = glob.sync(path.join(dir, '.tmp.pit', '**'), { dot: true });
    expect(files.length).to.be(0);
  });

  after(async function() {
    rimraf(dir);
  });
});
