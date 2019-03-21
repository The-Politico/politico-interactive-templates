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

var _istextorbinary = require("istextorbinary");

var _renameFile = require("./renameFile");

var _renameFile2 = _interopRequireDefault(_renameFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processFile = async function (filepath, options, shouldRender = true) {
  const defaults = {
    renderer: () => '',
    directory: '',
    context: {},
    rename: {}
  };
  const config = (0, _merge2.default)({}, defaults, options);

  const renderedFilepath = _path2.default.join(config.directory, (0, _renameFile2.default)(filepath, config));

  if (shouldRender && !(0, _istextorbinary.isBinary)(filepath)) {
    const fileText = await _fsExtra2.default.readFile(filepath, 'utf8');
    let renderedFile = '';

    try {
      renderedFile = config.renderer(fileText, config.context);
    } catch (err) {
      console.error(`There was a problem rendering ${filepath}.`);
      throw err;
    }

    await _fsExtra2.default.outputFile(renderedFilepath, renderedFile, {
      flag: 'w'
    });
  } else {
    await _fsExtra2.default.copy(filepath, renderedFilepath);
  }
};

exports.default = processFile;