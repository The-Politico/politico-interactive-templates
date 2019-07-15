"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (template, destination, verbose = true, defaultContext, setupOverride) {
  // Set up logger
  const logger = new _console.Logger({
    verbose
  });
  const log = logger.log;
  log(`🧱  Creating a new template in ${_chalk2.default.bold(destination)}.`);
  log(`\n[1/3] ⏳  Loading template configurion...`);
  let conf;

  try {
    conf = await (0, _setup2.default)(template, destination, verbose, defaultContext, setupOverride);
  } catch (e) {
    throw e;
  }

  const {
    templateOptions,
    templateConfig,
    renderer,
    context
  } = conf;
  log(`\n[2/3] ✏️  Rendering template...`);
  const files = await (0, _build2.default)((0, _assign2.default)({}, templateOptions, {
    destination,
    templateConfig,
    renderer,
    context
  }));
  log(`\n[3/3] 💾  Saving files...`);
  await (0, _output2.default)(files, verbose);
  log('');
  log(`New ${_chalk2.default.bold(template)} saved to ${_chalk2.default.bold(destination)}.`, 'success');
};

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _setup = require("./setup");

var _setup2 = _interopRequireDefault(_setup);

var _build = require("./build");

var _build2 = _interopRequireDefault(_build);

var _output = require("./output");

var _output2 = _interopRequireDefault(_output);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _console = require("../../utils/console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new project.
 * @param {string} [template] - The name of the template
 * @param {string} [destination=""] - The directory in which to build the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
;