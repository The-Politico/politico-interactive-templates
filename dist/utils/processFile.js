"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _replaceFilepath = require("./replaceFilepath");

var _replaceFilepath2 = _interopRequireDefault(_replaceFilepath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processFile = async function (filepath, options) {
  const defaults = {
    renderer: () => '',
    directory: '',
    context: {},
    rename: {}
  };
  const config = (0, _merge2.default)({}, defaults, options); // ignore directories

  if (_fsExtra2.default.lstatSync(filepath).isDirectory()) {
    return;
  }

  const fileText = await _fsExtra2.default.readFile(filepath, 'utf8');
  const renderedFile = config.renderer(fileText, config.context);
  const unrenderedFilepath = filepath.split('.tmp.pit/')[1];
  let renderedFilepath = unrenderedFilepath;
  (0, _keys2.default)(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = (0, _replaceFilepath2.default)(renderedFilepath, replace, replaceWith, config.context);
  });
  await _fsExtra2.default.outputFile(_path2.default.join(config.directory, renderedFilepath), renderedFile, {
    flag: 'w'
  });
};

exports.default = processFile;