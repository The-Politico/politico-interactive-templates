"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _flattenDeep = require("lodash/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _git = require("../../utils/git");

var _git2 = _interopRequireDefault(_git);

var _downloadFile = require("../../utils/downloadFile");

var _downloadFile2 = _interopRequireDefault(_downloadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function processRepo(opts) {
  if (!opts) {
    return [];
  }

  const {
    owner,
    repo
  } = opts;

  if (!owner || !repo) {
    return [];
  }

  const repoPath = opts.path || '';
  const files = await _git2.default.repos.getContents({
    owner,
    repo,
    path: repoPath
  }); // get a list of would-be outputs for this template

  let output = await Promise.all(files.data.map(data => {
    const {
      type,
      path: filePath
    } = data;
    const recursedOpts = (0, _assign2.default)({}, opts, {
      path: filePath
    });

    if (type === 'file') {
      return (0, _downloadFile2.default)(recursedOpts, data);
    } else {
      return processRepo(recursedOpts);
    }
  })); // filter out nulls caused by ignored files

  output = (0, _flattenDeep2.default)(output).filter(x => x != null);
  return output;
}

exports.default = processRepo;