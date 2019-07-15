"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function ({
  owner,
  repo
}) {
  const fileData = await _git2.default.repos.getContents({
    owner,
    repo,
    path: '.pitrc'
  });
  const pitrc = await (0, _processFile.toString)(fileData.data);
  return (0, _requireFromString2.default)(pitrc);
};

var _requireFromString = require("require-from-string");

var _requireFromString2 = _interopRequireDefault(_requireFromString);

var _git = require("./git");

var _git2 = _interopRequireDefault(_git);

var _processFile = require("./processFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }