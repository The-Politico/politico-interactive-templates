"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spawn = require("./spawn");

var _spawn2 = _interopRequireDefault(_spawn);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (templatePath, directory = '', verbose = true, tmpName = '.tmp.pit') => {
  return (0, _spawn2.default)('git', ['clone', templatePath, _path2.default.join(directory, tmpName)], verbose);
};