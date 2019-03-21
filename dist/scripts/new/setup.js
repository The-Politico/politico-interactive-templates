"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _downloadRepo = require("../../utils/downloadRepo");

var _downloadRepo2 = _interopRequireDefault(_downloadRepo);

var _getTemplate = require("../../utils/getTemplate");

var _getTemplate2 = _interopRequireDefault(_getTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prompts user for template selection and downloads the template from GitHub
 * @param {string} [template] - The name of the template
 * @param {string} [directory=""] - The directory in which to save the template repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves to a boolean indicating if setup was successful
 */
const setup = async function (template, directory = '', verbose = true) {
  const globalConfig = await (0, _getConfig2.default)();
  await _fsExtra2.default.ensureDir(directory);

  if (!template) {
    if (verbose) {
      template = await (0, _getTemplate2.default)(globalConfig.templates);

      if (!template) {
        return false;
      }
    } else {
      return false;
    }
  }

  const templatePath = globalConfig.templates[template].path;
  await (0, _downloadRepo2.default)(templatePath, directory, verbose);
  return true;
};

exports.default = setup;