"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (fp, dir) {
  const fullPath = _path2.default.join(dir, fp);

  if ((await (0, _fsExtra.exists)(fullPath)) && !(0, _fsExtra.lstatSync)(fullPath).isDirectory()) {
    return true;
  } else {
    return false;
  }
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }