"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _uniq = require("lodash/uniq");

var _uniq2 = _interopRequireDefault(_uniq);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _ignores = require("../constants/ignores");

var _ignores2 = _interopRequireDefault(_ignores);

var _getFileParts = require("./getFileParts");

var _getFileParts2 = _interopRequireDefault(_getFileParts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processFile = async function (filepath, options) {
  const defaults = {
    renderer: () => null,
    context: {},
    replace: [],
    ignore: {
      directories: {},
      files: {}
    }
  };
  const config = (0, _merge2.default)({}, defaults, options); // ignore directories

  if (_fsExtra2.default.lstatSync(filepath).isDirectory()) {
    return;
  }

  const {
    directories,
    filename
  } = (0, _getFileParts2.default)(filepath); // ignore files inside ignored directories

  const ignoredDirectories = (0, _uniq2.default)([..._ignores2.default.directories, ...config.ignore.directories]);
  const hasIgnoredDirectory = directories.some(d => (0, _includes2.default)(ignoredDirectories, d));

  if (hasIgnoredDirectory) {
    return;
  } // ignore files inside ignored directories


  const ignoredFiles = (0, _uniq2.default)([..._ignores2.default.files, ...config.ignore.files]);
  const isIgnoredFile = (0, _includes2.default)(ignoredFiles, filename);

  if (isIgnoredFile) {
    return;
  }

  console.log(filename);
  const fileText = await _fsExtra2.default.readFile(filepath, 'utf8'); // const renderedFile = renderer(fileText, context);

  const relativePath = filepath.split('.tmp.pit/')[1];
  console.log(relativePath); // await fs.outputFile(path.join(cwd, relativePath), renderedFile, { flag: 'w' });
};

exports.default = processFile;