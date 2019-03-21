import expect from 'expect.js';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import run, { UP, DOWN, ENTER } from 'inquirer-test';

import rimraf from 'Utils/rimraf';
import { setup, build, cleanup } from './index';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import { testTemplateName, testTemplateRepo, testSnippetTemplateName, testSnippetTemplateRepo } from 'Constants/testing';

import register from 'Scripts/register/index';

const context = {
  'name': 'app',
  'test': 'test',
};

const emptyConfig = { templates: {} };

describe('New - Setup: Downloads Template Repo', () => {
  let globalConfig;
  const dir = 'test/setup';

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await setup(testTemplateName, dir, false);
  });

  it('Downloads files', async function() {
    const files = glob.sync(path.join(dir, '.tmp.pit', '**'), { dot: true });
    expect(files.length).to.be.greaterThan(0);
    expect(files).to.contain(path.join(dir, '.tmp.pit/README.md'));
  });

  after(async function() {
    await outputConfig(globalConfig);
    rimraf(dir);
  });
});

describe('New - Build: Builds Template Files', () => {
  let globalConfig;
  const dir = 'test/build';
  let files;

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await setup(testTemplateName, dir, false);
    await build(context, dir, false);

    files = glob.sync(path.join(dir, '**'), { dot: true });
  });

  it('Makes files', async function() {
    expect(files.length).to.be.greaterThan(0);
    expect(files).to.contain(path.join(dir, '.tmp.pit/README.md'));
  });

  it('Writes context into files', async function() {
    const file = fs.readFileSync(path.join(dir, 'README.md')).toString('utf-8');
    expect(file.trim()).to.be('# app');
  });

  it('Uses project context', async function() {
    const file = fs.readFileSync(path.join(dir, 'extra.txt')).toString('utf-8');
    expect(file).to.be('context field\n');
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

  it('Doesn\'t render binary files', async function() {
    expect(files).to.contain(path.join(dir, 'images/placeholder.png'));
  });

  it('Doesn\'t render justCopy files', async function() {
    expect(files).to.contain(path.join(dir, 'justCopy/justCopy.txt'));
    const file = fs.readFileSync(path.join(dir, 'justCopy/justCopy.txt')).toString('utf-8');
    expect(file.trim()).to.be('This should <%=not%> be passed through render.');
  });

  after(async function() {
    await outputConfig(globalConfig);
    rimraf(dir);
  });
});

describe('New - Cleanup: Deletes Template Repo', () => {
  let globalConfig;
  const dir = 'test/cleanup';

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await setup(testTemplateName, dir, false);
    await build(context, dir, false);
    await cleanup(dir, false);
  });

  it('Deletes files', async function() {
    const files = glob.sync(path.join(dir, '.tmp.pit', '**'), { dot: true });
    expect(files.length).to.be(0);
  });

  after(async function() {
    await outputConfig(globalConfig);
    rimraf(dir);
  });
});

describe('New - Snippets', () => {
  let globalConfig;
  const dir = 'test/snippets';

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await outputConfig(globalConfig);
    await register(testSnippetTemplateRepo, false, '.tmp.pit.snippet');
    await setup(testSnippetTemplateName, dir, false);

    await build({ name: 'one', content: 'good' }, dir, false);
    await build({ name: 'two', content: 'good' }, dir, false);
    await cleanup(dir, false);
  });

  it('Merges existing file structure with new files', async function() {
    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.contain(path.join(dir, 'src/components/one/touch'));
    expect(files).to.contain(path.join(dir, 'src/components/two/touch'));
  });

  it('Fails if conflicts appear', async function() {
    try {
      await build({ name: 'one', content: 'bad' }, dir, false);
    } catch (err) {
      expect(err.message).to.be(`"src/components/one/touch" already exists. Aborting template creation. No files were created.`);
    }

    const file = fs.readFileSync(path.join(dir, 'src/components/one/touch')).toString('utf-8');
    expect(file.trim()).to.be('good');
  });

  after(async function() {
    await outputConfig(globalConfig);
    await rimraf(dir);
  });
});

describe('New - CLI', () => {
  let globalConfig;
  const baseDir = 'test/newCLI';
  const cliPath = path.join(process.cwd(), 'dist/cli.js');

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
    await register(testSnippetTemplateRepo, false, '.tmp.pit.snippet');
  });

  it('Handles templates by category', async function() {
    const dir = `${baseDir}/category/`;

    await run([cliPath, 'new', `-d=${dir}`], [ENTER, ENTER, ENTER, 'test', ENTER, 'test', ENTER], 1000);

    const files = glob.sync(path.join(dir, '**'), { dot: true });

    expect(files).to.contain(path.join(dir, 'README.md'));
    expect(files).to.contain(path.join(dir, 'test/test_file.txt'));
  });

  it('Handles searching for templates', async function() {
    const dir = `${baseDir}/search/`;

    await run([cliPath, 'new', `-d=${dir}`], [DOWN, ENTER, 'Snippet', ENTER, 'test', ENTER, 'test', ENTER, 'test', ENTER], 1000);

    const files = glob.sync(path.join(dir, '**'), { dot: true });

    expect(files).to.contain(path.join(dir, 'src/components/test/touch'));
  });

  it('Handles getting all templates', async function() {
    const dir = `${baseDir}/all/`;

    await run([cliPath, 'new', `-d=${dir}`], [DOWN, DOWN, ENTER, ENTER, 'test', ENTER, 'test', ENTER], 1000);

    const files = glob.sync(path.join(dir, '**'), { dot: true });

    expect(files).to.contain(path.join(dir, 'README.md'));
    expect(files).to.contain(path.join(dir, 'test/test_file.txt'));
  });

  after(async function() {
    await outputConfig(globalConfig);
    await rimraf(baseDir);
  });
});
