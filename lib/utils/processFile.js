#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var path = _interopDefault(require('path'));
var includes = _interopDefault(require('lodash/includes'));
var ignore = _interopDefault(require('ignore'));
var keys = _interopDefault(require('lodash/keys'));

var globalIgnores = ['.git', '.pitrc'];

var replaceFilepath = (function (filepath, replace, replaceWith) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var re = new RegExp(replace, 'g');

  if (typeof replaceWith === 'string') {
    return filepath.replace(re, replaceWith);
  } else if (typeof replaceWith === 'function') {
    var renderedReplaceWith = replaceWith(context);
    return filepath.replace(re, renderedReplaceWith);
  } else {
    throw new Error('Invalid filepath replacement type. Must be a string of function.');
  }
});

var renameFile = (function (filepath, config) {
  var renderedFilepath = filepath;
  keys(config.rename).forEach(function (replace) {
    var replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });
  return renderedFilepath;
});

var BINARY_EXTENSIONS = ['png', 'jpg', 'tiff', 'wav', 'mp3', 'doc', 'pdf', 'ai'];

function hasBinaryExtension(filename) {
  return BINARY_EXTENSIONS.some(function (ext) {
    return includes(filename, ".".concat(ext));
  });
}

function toFile(_x, _x2) {
  return _toFile.apply(this, arguments);
}

function _toFile() {
  _toFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data, opts) {
    var content, encoding, name, repoFilePath, destination, config, renderer, context, ig, relativePathName, jc, file, renderedFilepath;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = data.content, encoding = data.encoding, name = data.name, repoFilePath = data.path;
            destination = opts.destination, config = opts.config, renderer = opts.renderer, context = opts.context; // Ignore ignored files

            ig = ignore().add(Array.isArray(config.ignore) ? [].concat(_toConsumableArray(globalIgnores), _toConsumableArray(config.ignore)) : globalIgnores);
            relativePathName = repoFilePath[0] === '/' ? repoFilePath.substring(1, repoFilePath.length) : repoFilePath;

            if (!ig.ignores(relativePathName)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", null);

          case 6:
            // Set up justCopy ignored files
            jc = ignore().add(config.justCopy || []);

            if (!hasBinaryExtension(name)) {
              _context.next = 11;
              break;
            }

            file = Buffer.from(content, encoding);
            _context.next = 21;
            break;

          case 11:
            file = Buffer.from(content, encoding).toString('utf8');

            if (jc.ignores(relativePathName)) {
              _context.next = 21;
              break;
            }

            _context.prev = 13;
            file = renderer(file, context);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](13);
            console.error("There was a problem rendering ".concat(repoFilePath, "."));
            throw _context.t0;

          case 21:
            renderedFilepath = path.join(destination, renameFile(repoFilePath, {
              rename: config.rename,
              context: context
            }));
            return _context.abrupt("return", {
              path: renderedFilepath,
              content: file
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 17]]);
  }));
  return _toFile.apply(this, arguments);
}

function toString(_x3) {
  return _toString.apply(this, arguments);
}

function _toString() {
  _toString = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
    var text;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            text = Buffer.from(data.content, data.encoding).toString('utf8');
            return _context2.abrupt("return", text);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _toString.apply(this, arguments);
}

exports.toFile = toFile;
exports.toString = toString;
