"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _new = require("../new");

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tests a tempalte directory
 * @param {Object} [context] - Data to pass for the test
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [cleanup=true] - Whether to delete the output files after the test completes
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const test = async function (context, templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true, verbose = true) {
  try {
    require(_path2.default.join(_cwd2.default, templateDirectory, '.pitrc'));
  } catch (err) {
    console.error(_chalk2.default.yellow(`Looks like there's something wrong with your ".pitrc" file`));
    throw err;
  }

  await (0, _new.build)(context, templateDirectory, outputDirectory, verbose);

  if (cleanup) {
    await (0, _rimraf2.default)(outputDirectory);
  }

  if (verbose) {
    console.log('Test complete. Looks like your template is good to go!');
  }
};

exports.default = test;