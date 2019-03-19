"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Make', () => {
  before(async function () {
    await (0, _index2.default)('test', false);
  });
  it('Makes a config file', async function () {
    const config = require(_path2.default.join(process.cwd(), '.pitrc'));

    (0, _expect2.default)(config).to.have.property('name');
    (0, _expect2.default)(config.name).to.be('test');
    (0, _expect2.default)(config.prompts).to.be.an('array');
    (0, _expect2.default)(config.rename).to.be.an('object');
  });
  it('Errors if file exists', async function () {
    try {
      await (0, _index2.default)('test', false);
    } catch (err) {
      (0, _expect2.default)(err.message).to.be('.pitrc file already exists.');
    }
  });
  after(async function () {
    await (0, _rimraf2.default)('.pitrc');
  });
});