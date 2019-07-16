"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseRepoPath = require("../../utils/parseRepoPath");

var _parseRepoPath2 = _interopRequireDefault(_parseRepoPath);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _getRepoConfig = require("../../utils/getRepoConfig");

var _getRepoConfig2 = _interopRequireDefault(_getRepoConfig);

var _outputGlobalConfig = require("../../utils/outputGlobalConfig");

var _outputGlobalConfig2 = _interopRequireDefault(_outputGlobalConfig);

var _console = require("../../utils/console");

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Registers a template in the user's global .pitrc file
 * @param {string} [githubPath] - The path to a repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @param {string} [tmpName] - The name of the directory to temporarily create in order to complete registration (mostly used for testing)
 * @return {Promise} Resolves when the template is registered
 */
const register = async function (githubPath, verbose = true, tmpName = '.tmp.pit') {
  // Set up logger
  const logger = new _console.Logger({
    verbose
  });
  const log = logger.log;
  log(`🧱 PIT: Registering a new template.`); // Check for required args

  if (!githubPath) {
    if (verbose) {
      githubPath = await q.path();
    } else {
      throw new Error('Missing first argument: "githubPath"');
    }
  } // Get/make the global config file


  let globalConfig = await (0, _getGlobalConfig2.default)();

  if (globalConfig === undefined) {
    globalConfig = {};
  }

  if (!('templates' in globalConfig)) {
    globalConfig.templates = {};
  } // Get the name/category from the repo's config


  const repoInfo = (0, _parseRepoPath2.default)(githubPath);
  const pitrc = await (0, _getRepoConfig2.default)(repoInfo);
  const name = pitrc.name ? pitrc.name : null;
  const category = pitrc.category ? pitrc.category : null;

  if (name in globalConfig.templates) {
    if (verbose) {
      const confirmOverride = await q.override(name);

      if (!confirmOverride) {
        return;
      }
    } else {
      return;
    }
  }

  globalConfig.templates[name] = {
    owner: repoInfo.owner,
    repo: repoInfo.repo,
    category
  };
  await (0, _outputGlobalConfig2.default)(globalConfig);
  log(`Your template, ${name}, has been registered. Run "pit new" to generate a new project.`, 'success');
};

exports.default = register;