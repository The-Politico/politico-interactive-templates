"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFile = toFile;
exports.toString = toString;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _ignore = require("ignore");

var _ignore2 = _interopRequireDefault(_ignore);

var _ignores = require("../constants/ignores");

var _ignores2 = _interopRequireDefault(_ignores);

var _renameFile = require("./renameFile");

var _renameFile2 = _interopRequireDefault(_renameFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BINARY_EXTENSIONS = ['png', 'jpg', 'tiff', 'wav', 'mp3', 'doc', 'pdf', 'ai'];

function hasBinaryExtension(filename) {
  return BINARY_EXTENSIONS.some(ext => (0, _includes2.default)(filename, `.${ext}`));
}

async function toFile(data, opts) {
  const {
    content,
    encoding,
    name,
    path: repoFilePath
  } = data;
  const {
    destination,
    config,
    renderer,
    context
  } = opts; // Ignore ignored files

  const ig = (0, _ignore2.default)().add(Array.isArray(config.ignore) ? [..._ignores2.default, ...config.ignore] : _ignores2.default);

  if (ig.ignores(repoFilePath)) {
    return null;
  } // Set up justCopy ignored files


  const jc = (0, _ignore2.default)().add(config.justCopy || []);
  let file;

  if (hasBinaryExtension(name)) {
    file = Buffer.from(content, encoding);
  } else {
    file = Buffer.from(content, encoding).toString('utf8');

    if (!jc.ignores(repoFilePath)) {
      // not ignoring means the file should be processed:
      try {
        file = renderer(file, context);
      } catch (err) {
        console.error(`There was a problem rendering ${repoFilePath}.`);
        throw err;
      }
    }
  }

  const renderedFilepath = _path2.default.join(destination, (0, _renameFile2.default)(repoFilePath, {
    rename: config.rename,
    context
  }));

  return {
    path: renderedFilepath,
    content: file
  };
}

async function toString(data) {
  const text = Buffer.from(data.content, data.encoding).toString('utf8');
  return text;
}