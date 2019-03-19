"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _index = require("./index");

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _testing = require("../../constants/testing");

var _index2 = require("../register/index");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const context = {
  'name': 'app',
  'test': 'test'
};
describe('New - Setup: Downloads Template Repo', () => {
  const dir = 'example/setup';
  before(async function () {
    await (0, _index3.default)(_testing.testTemplateRepo, false);
    await (0, _index.setup)(_testing.testTemplateName, dir, false);
  });
  it('Downloads files', async function () {
    const files = _glob2.default.sync(_path2.default.join(dir, '.tmp.pit', '**'), {
      dot: true
    });

    (0, _expect2.default)(files.length).to.be.greaterThan(0);
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, '.tmp.pit/README.md'));
  });
  after(async function () {
    const config = await (0, _getConfig2.default)();
    delete config.templates[_testing.testTemplateName];
    await (0, _outputConfig2.default)(config);
    (0, _rimraf2.default)(dir);
  });
});
describe('New - Build: Builds Template Files', () => {
  const dir = 'example/build';
  let files;
  before(async function () {
    await (0, _index3.default)(_testing.testTemplateRepo, false);
    await (0, _index.setup)(_testing.testTemplateName, dir, false);
    await (0, _index.build)(context, dir, false);
    files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });
  });
  it('Makes files', async function () {
    (0, _expect2.default)(files.length).to.be.greaterThan(0);
    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, '.tmp.pit/README.md'));
  });
  it('Writes context into files', async function () {
    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'README.md')).toString('utf-8');

    (0, _expect2.default)(file).to.be('# app\n');
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
  after(async function () {
    const config = await (0, _getConfig2.default)();
    delete config.templates[_testing.testTemplateName];
    await (0, _outputConfig2.default)(config);
    (0, _rimraf2.default)(dir);
  });
});
describe('New - Cleanup: Deletes Template Repo', () => {
  const dir = 'example/cleanup';
  before(async function () {
    await (0, _index3.default)(_testing.testTemplateRepo, false);
    await (0, _index.setup)(_testing.testTemplateName, dir, false);
    await (0, _index.build)(context, dir, false);
    await (0, _index.cleanup)(dir, false);
  });
  it('Deletes files', async function () {
    const files = _glob2.default.sync(_path2.default.join(dir, '.tmp.pit', '**'), {
      dot: true
    });

    (0, _expect2.default)(files.length).to.be(0);
  });
  after(async function () {
    const config = await (0, _getConfig2.default)();
    delete config.templates[_testing.testTemplateName];
    await (0, _outputConfig2.default)(config);
    (0, _rimraf2.default)(dir);
  });
});
describe('New - Snippets', () => {
  const dir = 'example/snippets';
  before(async function () {
    await (0, _index3.default)(_testing.testSnippetTemplateRepo, false, '.tmp.pit.snippet');
    await (0, _index.setup)(_testing.testSnippetTemplateName, dir, false);
    await (0, _index.build)({
      name: 'one',
      content: 'good'
    }, dir, false);
    await (0, _index.build)({
      name: 'two',
      content: 'good'
    }, dir, false);
    await (0, _index.cleanup)(dir, false);
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
      await (0, _index.build)({
        name: 'one',
        content: 'bad'
      }, dir, false);
    } catch (err) {
      (0, _expect2.default)(err.message).to.be(`"src/components/one/touch" already exists. Aborting template creation. No files were created.`);
    }

    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'src/components/one/touch')).toString('utf-8');

    (0, _expect2.default)(file.trim()).to.be('good');
  });
  after(async function () {
    const config = await (0, _getConfig2.default)();
    delete config.templates[_testing.testSnippetTemplateName];
    await (0, _outputConfig2.default)(config);
    (0, _rimraf2.default)(dir);
  });
});