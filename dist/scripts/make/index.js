"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (name, verbose = true) {
  // Set up logger
  const logger = new _console.Logger({
    verbose
  });
  const log = logger.log;

  if (await (0, _fsExtra.exists)('.pitrc')) {
    throw new Error('.pitrc file already exists.');
  }

  if (!name) {
    if (verbose) {
      name = await q.name();
    } else {
      throw new Error('Missing first argument: "name"');
    }
  }

  const config = (0, _assign2.default)({}, _default2.default, {
    name
  });
  await (0, _fsExtra.outputFile)('.pitrc', `module.exports = ${JSON.stringify(config, null, 2)}`);

  if (verbose) {
    log(`New .pitrc file created.`);
  }
};

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _fsExtra = require("fs-extra");

var _console = require("../../utils/console");

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

var _default = require("./default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a default .pitrc file in the current working directory
 * @param {string} [name] - The name of the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when .pitrc is built
 */
;