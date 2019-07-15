"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (template, destination, verbose = true, context, override) {
  // Get global configuration
  const globalConfig = await (0, _getGlobalConfig2.default)(); // Check/prompt for required args

  if (!template) {
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
  const templateConfig = override || (await (0, _getRepoConfig2.default)(templateOptions)); // Get the tempalate's renderer

  const renderer = renderMethods[templateConfig.renderer];

  if (renderer === undefined) {
    throw new Error(`${templateConfig.renderer} is an invalid rendering method. Available methods are ${(0, _keys2.default)(renderMethods).join(', ')}`);
  } // Process template's static values (resolving promises)


  const staticKeys = (0, _keys2.default)(templateConfig.statics);
  const staticValues = await Promise.all(staticKeys.map(k => typeof templateConfig.statics[k] === 'function' ? Promise.resolve(templateConfig.statics[k]()) : // resolve the function if it returns a promise
  Promise.resolve(templateConfig.statics[k]) // if not a function, pass along the value
  ));
  const statics = (0, _zipObject2.default)(staticKeys, staticValues); // Set up/prompt for context values

  if (!context) {
    context = await _inquirer2.default.prompt(templateConfig.prompts);
  }

  context = (0, _merge2.default)({}, context, statics);
  return {
    templateOptions,
    templateConfig,
    renderer,
    context
  };
};

var _zipObject = require("lodash/zipObject");

var _zipObject2 = _interopRequireDefault(_zipObject);

var _getGlobalConfig = require("../../utils/getGlobalConfig");

var _getGlobalConfig2 = _interopRequireDefault(_getGlobalConfig);

var _getRepoConfig = require("../../utils/getRepoConfig");

var _getRepoConfig2 = _interopRequireDefault(_getRepoConfig);

var _index = require("../../utils/promptTemplate/index.js");

var _index2 = _interopRequireDefault(_index);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _index3 = require("../../utils/renderer/index.js");

var renderMethods = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;