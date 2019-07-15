"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _outputGlobalConfig = require("../../utils/outputGlobalConfig");

var _outputGlobalConfig2 = _interopRequireDefault(_outputGlobalConfig);

var _testing = require("../../constants/testing");

var _Scripts = require("..");

var _new = require("../new");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emptyConfig = {
  templates: {}
};
const context = {
  'name': 'app',
  'test': 'test'
};
describe('Test - No Cleanup', () => {
  let globalConfig;
  const dir = 'test/test-no-cleanup';
  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _Scripts.register)(_testing.testTemplateRepo, false);
    await (0, _new.setup)(_testing.testTemplateName, dir, false);
  });
  it('Tests templates', async function () {
    await (0, _Scripts.test)(context, _path2.default.join(dir, '.tmp.pit'), dir, false, false);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain('test/test-no-cleanup/README.md');
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
    await (0, _rimraf2.default)(dir);
  });
});
describe('Test - With Cleanup', () => {
  let globalConfig;
  const dir = 'test/test-with-cleanup';
  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _Scripts.register)(_testing.testTemplateRepo, false);
    await (0, _new.setup)(_testing.testTemplateName, dir, false);
  });
  it('Cleans up once the test finishes', async function () {
    await (0, _Scripts.test)(context, _path2.default.join(dir, '.tmp.pit'), dir, true, false);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.not.contain('test/test/README.md');
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
    await (0, _rimraf2.default)(dir);
  });
});