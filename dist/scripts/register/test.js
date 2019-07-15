"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _outputGlobalConfig = require("../../utils/outputGlobalConfig");

var _outputGlobalConfig2 = _interopRequireDefault(_outputGlobalConfig);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _testing = require("../../constants/testing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emptyConfig = {
  templates: {}
};
describe('Register', () => {
  let globalConfig;
  before(async function () {
    globalConfig = await (0, _getGlobalConfig2.default)();
    await (0, _outputGlobalConfig2.default)(emptyConfig);
    await (0, _index2.default)(_testing.testTemplatePath, false);
  });
  it('Registers templates', async function () {
    const newConfig = await (0, _getGlobalConfig2.default)();
    (0, _expect2.default)(newConfig.templates).to.have.property(_testing.testTemplateName);
    (0, _expect2.default)(newConfig.templates[_testing.testTemplateName].repo).to.be(_testing.testTemplateRepo);
    (0, _expect2.default)(newConfig.templates[_testing.testTemplateName].owner).to.be(_testing.testTemplateOwner);
  });
  after(async function () {
    await (0, _outputGlobalConfig2.default)(globalConfig);
  });
});