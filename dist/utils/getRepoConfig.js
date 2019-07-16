"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (repoPath, local = false) {
  const logger = new _console.Logger();

  if (local) {
    let pitrc;

    const pitrcPath = _path2.default.join(repoPath, '.pitrc');

    try {
      pitrc = require(pitrcPath);
    } catch (err) {
      logger.log(`File ${repoPath.bold(pitrcPath)} could not be loaded.`, 'error');
      throw err;
    }

    return pitrc;
  } else {
    let owner, repo;

    if (typeof repoPath === 'string') {
      ({
        owner,
        repo
      } = (0, _parseRepoPath2.default)(repoPath));
    } else {
      ({
        owner,
        repo
      } = repoPath);
    }

    const fileData = await _git2.default.repos.getContents({
      owner,
      repo,
      path: '.pitrc'
    });
    const pitrc = await (0, _processFile.toString)(fileData.data);
    return (0, _requireFromString2.default)(pitrc);
  }
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _requireFromString = require("require-from-string");

var _requireFromString2 = _interopRequireDefault(_requireFromString);

var _parseRepoPath = require("./parseRepoPath");

var _parseRepoPath2 = _interopRequireDefault(_parseRepoPath);

var _git = require("./git");

var _git2 = _interopRequireDefault(_git);

var _processFile = require("./processFile");

var _console = require("./console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }