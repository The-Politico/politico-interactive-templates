#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var hermes = require('@politico/hermes');
var rest = require('@octokit/rest');
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var path = _interopDefault(require('path'));
var includes = _interopDefault(require('lodash/includes'));
var ignore = _interopDefault(require('ignore'));
var keys = _interopDefault(require('lodash/keys'));

hermes.env.loadEnvFromPibrc();
var client = new rest.Octokit({
  auth: process.env.GITHUB_TOKEN
});

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

var MAX_SIZE = 1000000;

function downloadFile(_x, _x2) {
  return _downloadFile.apply(this, arguments);
}

function _downloadFile() {
  _downloadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(opts, preData) {
    var owner, repo, repoFilePath, size, sha, fileData;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            owner = opts.owner, repo = opts.repo, repoFilePath = opts.path;
            size = preData.size, sha = preData.sha;

            if (!(size > MAX_SIZE)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return client.gitdata.getBlob({
              owner: owner,
              repo: repo,
              sha: sha
            });

          case 5:
            fileData = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return client.repos.getContent({
              owner: owner,
              repo: repo,
              path: repoFilePath
            });

          case 10:
            fileData = _context.sent;

          case 11:
            if (!fileData) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", toFile(fileData.data, opts));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _downloadFile.apply(this, arguments);
}

module.exports = downloadFile;
