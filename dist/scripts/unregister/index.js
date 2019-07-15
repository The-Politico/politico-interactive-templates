"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _outputGlobalConfig = require("../../utils/outputGlobalConfig");

var _outputGlobalConfig2 = _interopRequireDefault(_outputGlobalConfig);

var _index = require("../../utils/promptTemplate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes a template from the user's global .pitrc file
 * @param {string} [name] - The name of the template to remove
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when the template is removed
 */
const unregister = async function (name, verbose = true) {
  const globalConfig = await (0, _getGlobalConfig2.default)();

  if (!name) {
    if (verbose) {
      name = await (0, _index2.default)(globalConfig.templates);

      if (!name) {
        return false;
      }
    } else {
      return false;
    }
  }

  if (name in globalConfig.templates) {
    delete globalConfig.templates[name];
    await (0, _outputGlobalConfig2.default)(globalConfig);

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