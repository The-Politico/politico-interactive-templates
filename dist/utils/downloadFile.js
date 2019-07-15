"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _git = require("./git");

var _git2 = _interopRequireDefault(_git);

var _processFile = require("./processFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_SIZE = 1000000;

async function downloadFile(opts, preData) {
  const {
    owner,
    repo,
    path: repoFilePath
  } = opts;
  const {
    size,
    sha
  } = preData;
  let fileData;

  if (size > MAX_SIZE) {
    fileData = await _git2.default.gitdata.getBlob({
      owner,
      repo,
      sha: sha
    });
  } else {
    fileData = await _git2.default.repos.getContents({
      owner,
      repo,
      path: repoFilePath
    });
  }

  if (fileData) {
    return (0, _processFile.toFile)(fileData.data, opts);
  }
}

exports.default = downloadFile;