"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function () {
  const packagejson = await (0, _npmApi2.default)().repo('@politico/interactive-templates').package();

  if (_Meta2.default.version !== packagejson.version) {
    console.log(_chalk2.default.yellow('\nIt looks like your version of PIT is out of date.\nYou should run "npm install -g @politico/interactive-templates" to update.\n'));
  }

  return true;
};

var _Meta = require("../../package.json");

var _Meta2 = _interopRequireDefault(_Meta);

var _npmApi = require("npm-api");

var _npmApi2 = _interopRequireDefault(_npmApi);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }