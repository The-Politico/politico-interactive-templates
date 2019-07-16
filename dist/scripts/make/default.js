"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Meta = require("../../../package.json");

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  version: `^${_Meta2.default.version}`,
  name: '',
  renderer: 'ejs',
  category: null,
  prompts: [],
  statics: {},
  ignore: [],
  justCopy: [],
  rename: {},
  dependencies: []
};