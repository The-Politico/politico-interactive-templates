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
  log(`🧱 PIT: Creating a new template in ${_chalk2.default.bold(_path2.default.join(_cwd2.default, destination))}.`);
  log(`\n[1/3] ⏳  Loading template configuration...`);
  let conf;

  try {
    conf = await (0, _setup2.default)({
      template,
      destination,
      verbose,
      context: defaultContext,
      override: setupOverride
    });
  } catch (e) {
    log(e.message, 'error');
    process.exitCode = 1;
    e.handled = true;
    throw e;
  }

  const {
    repos,
    config,
    renderer,
    context
  } = conf;
  log(`\n[2/3] ✏️  Rendering template...`);
  const files = (0, _flattenDeep2.default)((await Promise.all(repos.map(d => (0, _build2.default)((0, _assign2.default)({}, d, {
    destination,
    config,
    renderer,
    context
  }))))));
  log(`\n[3/3] 💾  Saving files...`);

  try {
    await (0, _output2.default)(files, verbose);
  } catch (e) {
    log(e.message, 'error');
    process.exitCode = 1;
    e.handled = true;
    throw e;
  }

  log('');
  log(`New ${_chalk2.default.bold(config.name)} saved to ${_chalk2.default.bold(_path2.default.join(_cwd2.default, destination))}.`, 'success');
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _flattenDeep = require("lodash/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _setup = require("./setup");

var _setup2 = _interopRequireDefault(_setup);

var _build = require("./build");

var _build2 = _interopRequireDefault(_build);

var _output = require("./output");

var _output2 = _interopRequireDefault(_output);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

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