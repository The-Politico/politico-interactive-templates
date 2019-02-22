"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _path2.default.join(_os2.default.homedir(), `.pitrc`);