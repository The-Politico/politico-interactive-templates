"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testRepo = 'git@github.com:The-Politico/template_pit-test.git';
describe('Register', () => {
  let config = {};
  before(async function () {
    config = await (0, _getConfig2.default)();
    await (0, _outputConfig2.default)({});
    await (0, _index2.default)(testRepo, false);
  });
  it('Registers template', async function () {
    const newConfig = await (0, _getConfig2.default)();
    (0, _expect2.default)(newConfig.templates).to.have.property('PIT Test');
    (0, _expect2.default)(newConfig.templates['PIT Test'].path).to.be(testRepo);
  });
  after(async function () {
    await (0, _outputConfig2.default)(config);
  });
});