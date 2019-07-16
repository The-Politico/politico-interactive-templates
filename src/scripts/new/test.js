import expect from 'expect.js';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import run, { DOWN, ENTER } from 'inquirer-test';

import rimraf from 'Utils/rimraf';
import newProject from './index';
import getGlobalConfig from 'Utils/getGlobalConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import {
  testTemplateName,
  testTemplatePath,
  testSnippetTemplatePath,
  testSnippetTemplateName,
  testVersionTemplateName,
  testVersionTemplatePath
} from 'Constants/testing';

import register from 'Scripts/register/index';

const context = {
  'name': 'test_app',
  'test': 'test',
  'dependentText': 'valid',
  'content': 'A1',
};

const emptyConfig = { templates: {} };

describe('New - Build: Builds Template Files', () => {
  let globalConfig;
  const dir = 'test/build';
  let files;

  before(async function() {
    globalConfig = await getGlobalConfig();
    await rimraf(dir);
    await outputGlobalConfig(emptyConfig);
    await register(testTemplatePath, false);
    await newProject(testTemplateName, dir, false, context);

    files = glob.sync(path.join(dir, '**'), { dot: true });
  });

  it('Makes files', async function() {
    expect(files.length).to.be.greaterThan(0);
  });

  it('Writes context into files', async function() {
    const file = fs.readFileSync(path.join(dir, 'README.md')).toString('utf-8');
    expect(file.trim()).to.be('# test_app');
  });

  it('Uses project context', async function() {
    const file = fs.readFileSync(path.join(dir, 'extra.txt')).toString('utf-8');
    expect(file.trim()).to.be('context field');
  });

  it('Resolves promises in statics configuration', async function() {
    const file = fs.readFileSync(path.join(dir, 'promises/promise.txt')).toString('utf-8');
    expect(file.trim()).to.be('resolution');
  });

  it('Renames files with strings', async function() {
    expect(files).to.contain(path.join(dir, 'renamed.txt'));
  });

  it('Renames files with functions', async function() {
    expect(files).to.contain(path.join(dir, 'test_app/test_app_file.txt'));
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

  it('Traverses a dependency graph', async function() {
    expect(files).to.contain(path.join(dir, 'dependent.txt'));
    const fileOne = fs.readFileSync(path.join(dir, 'dependent.txt')).toString('utf-8');
    expect(fileOne.trim()).to.be('valid');

    expect(files).to.contain(path.join(dir, 'src/components/test_app/touch'));
    const fileTwo = fs.readFileSync(path.join(dir, 'src/components/test_app/touch')).toString('utf-8');
    expect(fileTwo.trim()).to.be('A1');
  });

  after(async function() {
    await outputGlobalConfig(globalConfig);
    rimraf(dir);
  });
});

describe('New - Snippets', () => {
  let globalConfig;
  const dir = 'test/snippets';

  before(async function() {
    globalConfig = await getGlobalConfig();
    await outputGlobalConfig(emptyConfig);
    await register(testSnippetTemplatePath, false);

    await newProject(testSnippetTemplateName, dir, false, { name: 'one', content: 'good' });
    await newProject(testSnippetTemplateName, dir, false, { name: 'two', content: 'good' });
  });

  it('Merges existing file structure with new files', async function() {
    const files = glob.sync(path.join(dir, '**'), { dot: true });
    expect(files).to.contain(path.join(dir, 'src/components/one/touch'));
    expect(files).to.contain(path.join(dir, 'src/components/two/touch'));
  });

  it('Fails if conflicts appear', async function() {
    try {
      await newProject(testSnippetTemplateName, dir, false, { name: 'one', content: 'bad' });
    } catch (err) {
      expect(err.message).to.be(`"${path.join(dir, 'src/components/one/touch')}" already exists. Aborting template creation. No files were created.`);
    }

    const file = fs.readFileSync(path.join(dir, 'src/components/one/touch')).toString('utf-8');
    expect(file.trim()).to.be('good');
  });

  after(async function() {
    await outputGlobalConfig(globalConfig);
    await rimraf(dir);
  });
});

describe('New - Version', () => {
  let globalConfig;
  const dir = 'test/version';

  before(async function() {
    globalConfig = await getGlobalConfig();
    await outputGlobalConfig(emptyConfig);
    await register(testVersionTemplatePath, false);
  });

  it('Fails if incorrect version', async function() {
    try {
      await newProject(testVersionTemplateName, dir, false, {});
    } catch (err) {
      expect(err.message).to.contain('This template requires version:');
    }
  });

  after(async function() {
    await outputGlobalConfig(globalConfig);
    await rimraf(dir);
  });
});

describe('New - CLI', () => {
  let globalConfig;
  const baseDir = 'test/newCLI';
  const cliPath = path.join(process.cwd(), 'dist/cli.js');

  before(async function() {
    globalConfig = await getGlobalConfig();
    await outputGlobalConfig(emptyConfig);
    await register(testTemplatePath, false);
    await register(testSnippetTemplatePath, false);
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
    await outputGlobalConfig(globalConfig);
    await rimraf(baseDir);
  });
});
