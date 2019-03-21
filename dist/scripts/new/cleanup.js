"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Deletes the template directory created in setup
 * @param {string} [directory=""] - The directory that holds the .tmp.pit directory
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are deleted
 */
const cleanup = async function (directory = '', verbose = true) {
  await (0, _rimraf2.default)(_path2.default.join(directory, '.tmp.pit'));
};

exports.default = cleanup;