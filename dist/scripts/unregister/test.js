"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _testing = require("../../constants/testing");

var _Scripts = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emptyConfig = {
  templates: {}
};
describe('Unregister', () => {
  let globalConfig;
  before(async function () {
    globalConfig = await (0, _getConfig2.default)();
    await (0, _outputConfig2.default)(emptyConfig);
    await (0, _Scripts.register)(_testing.testTemplateRepo, false);
  });
  it('Unregisters templates', async function () {
    let config = await (0, _getConfig2.default)();
    (0, _expect2.default)(config.templates).to.have.property(_testing.testTemplateName);
    await (0, _Scripts.unregister)(_testing.testTemplateName, false);
    config = await (0, _getConfig2.default)();
    (0, _expect2.default)(config.templates).to.not.have.property(_testing.testTemplateName);
  });
  after(async function () {
    await (0, _outputConfig2.default)(globalConfig);
  });
});