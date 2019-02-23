"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _testing = require("../../constants/testing");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Register', () => {
  let config = {
    templates: {}
  };
  before(async function () {
    config = await (0, _getConfig2.default)();
    await (0, _outputConfig2.default)({});
    await (0, _index2.default)(_testing.testTemplateRepo, false);
  });
  it('Registers template', async function () {
    const newConfig = await (0, _getConfig2.default)();
    (0, _expect2.default)(newConfig.templates).to.have.property(_testing.testTemplateName);
    (0, _expect2.default)(newConfig.templates[_testing.testTemplateName].path).to.be(_testing.testTemplateRepo);
  });
  after(async function () {
    await (0, _outputConfig2.default)(config);
  });
});