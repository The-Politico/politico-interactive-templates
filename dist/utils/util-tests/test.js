"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _getConfig = require("../getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _templateOptions = require("../templateOptions");

var _testing = require("../../constants/testing");

var _register = require("../../scripts/register");

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Template Options', () => {
  before(async function () {
    await (0, _register2.default)(_testing.testTemplateRepo, false);
    await (0, _register2.default)(_testing.testSnippetTemplateRepo, false, '.tmp.pit.snippet');
  });
  it('Maps template options by category', async function () {
    const globalConfig = await (0, _getConfig2.default)();
    const map = (0, _templateOptions.mapTemplates)(globalConfig.templates);
    (0, _expect2.default)(map).to.have.property('All');
    (0, _expect2.default)(map).to.have.property('Other');
    (0, _expect2.default)(map).to.have.property('Test');
    (0, _expect2.default)(map.All).to.have.property('PIT Test');
    (0, _expect2.default)(map.All).to.have.property('PIT Snippet Test');
    (0, _expect2.default)(map.Other).to.have.property('PIT Snippet Test');
    (0, _expect2.default)(map.Test).to.have.property('PIT Test');
  });
  after(async function () {
    const config = await (0, _getConfig2.default)();
    delete config.templates[_testing.testTemplateName];
    delete config.templates[_testing.testSnippetTemplateName];
    await (0, _outputConfig2.default)(config);
  });
});