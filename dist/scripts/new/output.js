"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (files, verbose) {
  // Set up logger
  const logger = new _console.Logger({
    verbose
  });
  const anyFilesExist = (await Promise.all(files.map(async function (f) {
    return {
      exists: await (0, _fsExtra.exists)(f.path),
      path: f.path
    };
  }))).filter(f => f.exists);

  if (anyFilesExist.length > 0) {
    throw new Error(`"${anyFilesExist[0].path}" already exists. Aborting template creation. No files were created.`);
  }

  await Promise.all(files.map(async function (f) {
    await (0, _fsExtra.ensureDir)(_path2.default.dirname(f.path));
    await (0, _fsExtra.writeFile)(f.path, f.content);
    logger.log(f.path, 'info');
  }));
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _console = require("../../utils/console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;