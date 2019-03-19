"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _replaceFilepath = require("./replaceFilepath");

var _replaceFilepath2 = _interopRequireDefault(_replaceFilepath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (filepath, config) => {
  const unrenderedFilepath = filepath.split('.tmp.pit/')[1];

  if (!unrenderedFilepath) {
    return null;
  }

  let renderedFilepath = unrenderedFilepath;
  (0, _keys2.default)(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = (0, _replaceFilepath2.default)(renderedFilepath, replace, replaceWith, config.context);
  });
  return renderedFilepath;
};