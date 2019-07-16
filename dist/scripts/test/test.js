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

var _spawn = require("../../utils/spawn");

var _spawn2 = _interopRequireDefault(_spawn);

var _testing = require("../../constants/testing");

var _Scripts = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const context = {
  'name': 'test_app',
  'test': 'test',
  'dependentText': 'valid',
  'content': 'A1'
};
describe('Test - No Cleanup', () => {
  const dir = 'test/test-no-cleanup';
  before(async function () {
    await (0, _spawn2.default)('git', ['clone', _testing.testTemplatePath, _path2.default.join(dir, '.tmp.pit')], false);
  });
  it('Tests templates', async function () {
    await (0, _Scripts.test)(context, _path2.default.join(dir, '.tmp.pit'), dir, false, false);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.contain(_path2.default.join(dir, 'README.md'));

    const file = _fs2.default.readFileSync(_path2.default.join(dir, 'README.md')).toString('utf-8');

    (0, _expect2.default)(file.trim()).to.be('# test_app');
  });
  after(async function () {
    await (0, _rimraf2.default)(dir);
  });
});
describe('Test - With Cleanup', () => {
  const dir = 'test/test-with-cleanup';
  before(async function () {
    await (0, _spawn2.default)('git', ['clone', _testing.testTemplatePath, _path2.default.join(dir, '.tmp.pit')], false);
  });
  it('Cleans up once the test finishes', async function () {
    await (0, _Scripts.test)(context, _path2.default.join(dir, '.tmp.pit'), dir, true, false);

    const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
      dot: true
    });

    (0, _expect2.default)(files).to.not.contain(_path2.default.join(dir, 'README.md'));
  });
  after(async function () {
    await (0, _rimraf2.default)(dir);
  });
});