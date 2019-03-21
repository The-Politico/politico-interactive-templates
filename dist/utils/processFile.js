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

var _renameFile = require("./renameFile");

var _renameFile2 = _interopRequireDefault(_renameFile);

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
  let renderedFile = '';

  try {
    renderedFile = config.renderer(fileText, config.context);
  } catch (err) {
    console.error(`There was a problem rendering ${filepath}.`);
    throw err;
  }

  const renderedFilepath = (0, _renameFile2.default)(filepath, config);
  await _fsExtra2.default.outputFile(_path2.default.join(config.directory, renderedFilepath), renderedFile, {
    flag: 'w'
  });
};

exports.default = processFile;