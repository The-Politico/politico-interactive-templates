"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _getTemplate = require("../../utils/getTemplate");

var _getTemplate2 = _interopRequireDefault(_getTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes a template from the user's global .pitrc file
 * @param {string} [name] - The name of the template to remove
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when the template is removed
 */
const unregister = async function (name, verbose = true) {
  const globalConfig = await (0, _getConfig2.default)();

  if (!name) {
    if (verbose) {
      name = await (0, _getTemplate2.default)(globalConfig.templates);

      if (!name) {
        return false;
      }
    } else {
      return false;
    }
  }

  if (name in globalConfig.templates) {
    delete globalConfig.templates[name];
    await (0, _outputConfig2.default)(globalConfig);

    if (verbose) {
      console.log(`Success! Your template, "${name}", has been unregistered.`);
    }
  } else {
    if (verbose) {
      console.log(`You don't have a template with the name "${name}."`);
    }
  }
};

exports.default = unregister;