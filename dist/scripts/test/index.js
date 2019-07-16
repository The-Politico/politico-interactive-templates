"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (baseContext, templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true, verbose = true) {
  // Set up logger
  const logger = new _console.Logger({
    verbose
  });
  const log = logger.log;

  const absoluteTemplateDir = _path2.default.join(_cwd2.default, templateDirectory);

  log(`🧱 PIT: Testing your template in ${_chalk2.default.bold(absoluteTemplateDir)}.`);
  log(`\n[1/5] ⏳  Loading your local template configuration...`);
  const templateConfig = await (0, _getRepoConfig2.default)(absoluteTemplateDir, true);
  let conf;

  try {
    const setupOverride = {
      config: templateConfig,
      dependencies: await (0, _getRepoDependencies2.default)(absoluteTemplateDir, true)
    };
    conf = await (0, _setup2.default)({
      template: '',
      destination: outputDirectory,
      verbose,
      context: baseContext,
      override: setupOverride,
      validateVersion: false
    });
  } catch (e) {
    throw e;
  }

  const {
    repos,
    renderer,
    context,
    config
  } = conf;
  log(`\n[2/5] ✏️  Rendering template dependencies...`);
  const dependencyFiles = await Promise.all(repos.map(d => (0, _build2.default)((0, _assign2.default)({}, d, {
    destination: outputDirectory,
    config,
    renderer,
    context
  }))));
  log(`\n[3/5] ✏️  Rendering local template...`);
  const localFiles = await processLocalRepo(absoluteTemplateDir, {
    destination: outputDirectory,
    config,
    renderer,
    context
  });
  const files = (0, _flattenDeep2.default)([...dependencyFiles, localFiles]);
  log(`\n[4/5] 💾  Saving files...`);
  await (0, _output2.default)(files, verbose);

  if (cleanup) {
    log(`\n[5/5] 🗑️  Cleaning up test files...`);
    await (0, _rimraf2.default)(outputDirectory);
  } else {
    log(`\n[5/5] 🗑️  Skipping cleanup...`);
  }

  if (verbose) {
    console.log();
  }

  log('');
  log('Test complete. Looks like your template is good to go!', 'success');
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _flattenDeep = require("lodash/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _fsExtra = require("fs-extra");

var _setup = require("../new/setup");

var _setup2 = _interopRequireDefault(_setup);

var _build = require("../new/build");

var _build2 = _interopRequireDefault(_build);

var _output = require("../new/output");

var _output2 = _interopRequireDefault(_output);

var _processFile = require("../../utils/processFile");

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _getRepoConfig = require("../../utils/getRepoConfig");

var _getRepoConfig2 = _interopRequireDefault(_getRepoConfig);

var _getRepoDependencies = require("../../utils/getRepoDependencies");

var _getRepoDependencies2 = _interopRequireDefault(_getRepoDependencies);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _console = require("../../utils/console");

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
;

async function processLocalRepo(dir, opts) {
  const files = _glob2.default.sync(_path2.default.join(dir, '**'), {
    dot: true
  });

  let filesData = await Promise.all(files.map(async function (f) {
    if ((await (0, _fsExtra.lstat)(f)).isFile()) {
      const data = {
        content: await (0, _fsExtra.readFile)(f),
        encoding: 'base64',
        name: _path2.default.basename(f),
        path: f.split(dir)[1]
      };
      return (0, _processFile.toFile)(data, opts);
    } else {
      return null;
    }
  }));
  return filesData.filter(f => f);
}