"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _inquirerTest = require("inquirer-test");

var _inquirerTest2 = _interopRequireDefault(_inquirerTest);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _outputGlobalConfig = require("../../utils/outputGlobalConfig");

var _outputGlobalConfig2 = _interopRequireDefault(_outputGlobalConfig);

var _testing = require("../../constants/testing");

var _index3 = require("../register/index");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const context = {
  'name': 'app',
  'test': 'test'
};
const emptyConfig = {
  templates: {}
};
describe('New - Build: Builds Template Files', () => {
  let globalConfig;
  const dir = 'test/build';
  let files;
  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _rimraf2.default)(dir);
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _index4.default)(_testing.testTemplatePath, false);
    await (0, _index2.default)(_testing.testTemplateName, dir, false, context);
    files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });
  });
  it('Makes files', async function () {
    (0, _expect2.default)(files.length).to.be.greaterThan(0);
  });
  it('Writes context into files', async function () {
    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'README.md')).toString('utf-8');

    (0, _expect2.default)(file.trim()).to.be('# app');
  });
  it('Uses project context', async function () {
    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'extra.txt')).toString('utf-8');

    (0, _expect2.default)(file).to.be('context field\n');
  });
  it('Renames files with strings', async function () {
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'renamed.txt'));
  });
  it('Renames files with functions', async function () {
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'app/app_file.txt'));
  });
  it('Ignores global ignore files', async function () {
    (0, _expect2.default)(files).to.not.contain(_path2.default.join(dir, '.pitrc'));
  });
  it('Ignores global ignore directories', async function () {
    (0, _expect2.default)(files).to.not.contain(_path2.default.join(dir, '.git'));
  });
  it('Ignores project-specific ignore files', async function () {
    (0, _expect2.default)(files).to.not.contain(_path2.default.join(dir, 'ignore.txt'));
  });
  it('Ignores project-specific ignore directories', async function () {
    (0, _expect2.default)(files).to.not.contain(_path2.default.join(dir, 'ignore'));
  });
  it('Doesn\'t render binary files', async function () {
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'images/placeholder.png'));
  });
  it('Doesn\'t render justCopy files', async function () {
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'justCopy/justCopy.txt'));

    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'justCopy/justCopy.txt')).toString('utf-8');

    (0, _expect2.default)(file.trim()).to.be('This should <%=not%> be passed through render.');
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
    (0, _rimraf2.default)(dir);
  });
});
describe('New - Snippets', () => {
  let globalConfig;
  const dir = 'test/snippets';
  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _outputGlobalConfig2.default)(globalConfig);
    await (0, _index4.default)(_testing.testSnippetTemplatePath, false);
    await (0, _index2.default)(_testing.testSnippetTemplateName, dir, false, {
      name: 'one',
      content: 'good'
    });
    await (0, _index2.default)(_testing.testSnippetTemplateName, dir, false, {
      name: 'two',
      content: 'good'
    });
  });
  it('Merges existing file structure with new files', async function () {
    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'src/components/one/touch'));
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'src/components/two/touch'));
  });
  it('Fails if conflicts appear', async function () {
    try {
      await (0, _index2.default)(_testing.testSnippetTemplateName, dir, false, {
        name: 'one',
        content: 'bad'
      });
    } catch (err) {
      (0, _expect2.default)(err.message).to.be(`"${_path2.default.join(dir, 'src/components/one/touch')}" already exists. Aborting template creation. No files were created.`);
    }

    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'src/components/one/touch')).toString('utf-8');

    (0, _expect2.default)(file.trim()).to.be('good');
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
    await (0, _rimraf2.default)(dir);
  });
});
describe('New - CLI', () => {
  let globalConfig;
  const baseDir = 'test/newCLI';

  const cliPath = _path2.default.join(process.cwd(), 'dist/cli.js');

  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _index4.default)(_testing.testTemplatePath, false);
    await (0, _index4.default)(_testing.testSnippetTemplatePath, false);
  });
  it('Handles templates by category', async function () {
    const dir = `${baseDir}/category/`;
    await (0, _inquirerTest2.default)([cliPath, 'new', `-d=${dir}`], [_inquirerTest.ENTER, _inquirerTest.ENTER, _inquirerTest.ENTER, 'test', _inquirerTest.ENTER, 'test', _inquirerTest.ENTER], 1000);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'README.md'));
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'test/test_file.txt'));
  });
  it('Handles searching for templates', async function () {
    const dir = `${baseDir}/search/`;
    await (0, _inquirerTest2.default)([cliPath, 'new', `-d=${dir}`], [_inquirerTest.DOWN, _inquirerTest.ENTER, 'Snippet', _inquirerTest.ENTER, 'test', _inquirerTest.ENTER, 'test', _inquirerTest.ENTER, 'test', _inquirerTest.ENTER], 1000);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'src/components/test/touch'));
  });
  it('Handles getting all templates', async function () {
    const dir = `${baseDir}/all/`;
    await (0, _inquirerTest2.default)([cliPath, 'new', `-d=${dir}`], [_inquirerTest.DOWN, _inquirerTest.DOWN, _inquirerTest.ENTER, _inquirerTest.ENTER, 'test', _inquirerTest.ENTER, 'test', _inquirerTest.ENTER], 1000);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'README.md'));
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'test/test_file.txt'));
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
    await (0, _rimraf2.default)(baseDir);
  });
});