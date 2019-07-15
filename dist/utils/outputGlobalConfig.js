"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _configFile = require("../constants/configFile");

var _configFile2 = _interopRequireDefault(_configFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = config => {
  return _fsExtra2.default.outputJson(_configFile2.default, config).catch(e => {
    console.error(e);
  });
};