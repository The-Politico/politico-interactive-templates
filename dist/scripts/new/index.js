"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = exports.build = exports.setup = undefined;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _setup = require("./setup");

var _setup2 = _interopRequireDefault(_setup);

var _build = require("./build");

var _build2 = _interopRequireDefault(_build);

var _cleanup = require("./cleanup");

var _cleanup2 = _interopRequireDefault(_cleanup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new project.
 * @param {string} [template] - The name of the template
 * @param {string} [directory=""] - The directory in which to build the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const newProject = async function (template, directory, verbose = true) {
  const setupSuccessful = await (0, _setup2.default)(template, directory, verbose);

  if (!setupSuccessful) {
    return;
  }

  await (0, _build2.default)(null, _path2.default.join(directory, '.tmp.pit'), directory, verbose);
  await (0, _cleanup2.default)(directory, verbose);

  if (verbose) {
    console.log('Success! Your new project is ready.');
  }
};

exports.default = newProject;
exports.setup = _setup2.default;
exports.build = _build2.default;
exports.cleanup = _cleanup2.default;