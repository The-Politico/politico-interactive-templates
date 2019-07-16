"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function ({
  template,
  destination,
  verbose = true,
  context,
  override = {},
  validateVersion = true
}) {
  // Get global configuration
  const globalConfig = await (0, _getGlobalConfig2.default)(); // Check/prompt for required args

  if (!template && !override.config) {
    if (verbose) {
      template = await (0, _index2.default)(globalConfig.templates);

      if (!template) {
        throw new Error('No template provided.');
      }
    } else {
      throw new Error('No template provided.');
    }
  } // Get the template's config


  const templateOptions = globalConfig.templates[template];
  const templateConfig = override.config || (await (0, _getRepoConfig2.default)(templateOptions)); // Check for template version match

  if (!(0, _validateTemplateVersion2.default)(templateConfig)) {
    throw new Error(`This template requires version: ${_chalk2.default.bold(templateConfig.version)}. Version ${_chalk2.default.bold(_Meta2.default.version)} is installed.`);
  } // Get the tempalate's renderer


  const renderer = renderMethods[templateConfig.renderer];

  if (renderer === undefined) {
    throw new Error(`${templateConfig.renderer} is an invalid rendering method. Available methods are ${(0, _keys2.default)(renderMethods).join(', ')}`);
  } // Get the template's dependencies


  const dependencyPaths = override.dependencies || (await (0, _getRepoDependencies2.default)(templateOptions));
  const repos = await Promise.all([...dependencyPaths.map(repoPath => (0, _parseRepoPath2.default)(repoPath)), templateOptions]);
  const dependencies = await Promise.all(dependencyPaths.map(repoPath => (0, _getRepoConfig2.default)(repoPath)));
  const projectConfig = (0, _mergeWith2.default)({}, ...[...dependencies, templateConfig], (obj, src) => {
    if (Array.isArray(obj)) {
      return obj.concat(src);
    }
  }); // Process template's static values (resolving promises)

  const staticKeys = (0, _keys2.default)(projectConfig.statics);
  const staticValues = await Promise.all(staticKeys.map(k => typeof projectConfig.statics[k] === 'function' ? Promise.resolve(projectConfig.statics[k]()) : // resolve the function if it returns a promise
  Promise.resolve(projectConfig.statics[k]) // if not a function, pass along the value
  ));
  const statics = (0, _zipObject2.default)(staticKeys, staticValues); // Set up/prompt for context values

  if (!context) {
    context = await _inquirer2.default.prompt(projectConfig.prompts);
  }

  context = (0, _merge2.default)({}, context, statics);
  return {
    templateOptions,
    repos,
    config: projectConfig,
    renderer,
    context
  };
};

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _zipObject = require("lodash/zipObject");

var _zipObject2 = _interopRequireDefault(_zipObject);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _mergeWith = require("lodash/mergeWith");

var _mergeWith2 = _interopRequireDefault(_mergeWith);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _getRepoConfig = require("../../utils/getRepoConfig");

var _getRepoConfig2 = _interopRequireDefault(_getRepoConfig);

var _index = require("../../utils/promptTemplate/index.js");

var _index2 = _interopRequireDefault(_index);

var _getRepoDependencies = require("../../utils/getRepoDependencies");

var _getRepoDependencies2 = _interopRequireDefault(_getRepoDependencies);

var _parseRepoPath = require("../../utils/parseRepoPath");

var _parseRepoPath2 = _interopRequireDefault(_parseRepoPath);

var _index3 = require("../../utils/renderer/index.js");

var renderMethods = _interopRequireWildcard(_index3);

var _validateTemplateVersion = require("../../utils/validateTemplateVersion");

var _validateTemplateVersion2 = _interopRequireDefault(_validateTemplateVersion);

var _Meta = require("../../../package.json");

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;