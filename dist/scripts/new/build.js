"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _globGitignore = require("glob-gitignore");

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _processFile = require("../../utils/processFile");

var _processFile2 = _interopRequireDefault(_processFile);

var _renderer = require("../../utils/renderer");

var renderMethods = _interopRequireWildcard(_renderer);

var _renameFile = require("../../utils/renameFile");

var _renameFile2 = _interopRequireDefault(_renameFile);

var _fileExists = require("../../utils/fileExists");

var _fileExists2 = _interopRequireDefault(_fileExists);

var _ignores = require("../../constants/ignores");

var _ignores2 = _interopRequireDefault(_ignores);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds files from a template directory into an output directory
 * @param {Object} [context] - Data to pass to the template renderer
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const build = async function (context, templateDirectory, outputDirectory = '', verbose = true) {
  if (!templateDirectory && templateDirectory !== '') {
    templateDirectory = '.tmp.pit';
  }

  const projectConfig = require(_path2.default.join(_cwd2.default, templateDirectory, '.pitrc'));

  const renderer = renderMethods[projectConfig.renderer];

  if (renderer === undefined) {
    throw new Error(`${projectConfig.renderer} is an invalid rendering method. Available methods are ${(0, _keys2.default)(renderMethods).join(', ')}`);
  }

  if (!context) {
    context = await _inquirer2.default.prompt(projectConfig.prompts);
  }

  context = (0, _merge2.default)({}, context, projectConfig.statics);

  const templateGlob = _path2.default.join(templateDirectory, '**');

  const ignoredFiles = projectConfig.ignore ? projectConfig.ignore : [];
  const justCopyFiles = projectConfig.justCopy ? projectConfig.justCopy : [];
  const templateFiles = (0, _globGitignore.sync)(templateGlob, {
    dot: true,
    nodir: true,
    ignore: [..._ignores2.default, ...ignoredFiles]
  });
  const renderAndCopyFiles = (0, _globGitignore.sync)(templateGlob, {
    dot: true,
    nodir: true,
    ignore: [..._ignores2.default, ...ignoredFiles, ...justCopyFiles]
  });
  const processConfig = {
    renderer,
    context,
    directory: outputDirectory,
    rename: projectConfig.rename
  }; // Error if conflicts exist

  let conflictingFile = null;
  await Promise.all(templateFiles.map(filepath => (0, _renameFile2.default)(filepath, processConfig)).filter(f => f !== null).map(async function (fp) {
    if (await (0, _fileExists2.default)(fp, outputDirectory)) {
      conflictingFile = fp;
      return true;
    }

    return false;
  }));

  if (conflictingFile) {
    throw new Error(`"${conflictingFile}" already exists. Aborting template creation. No files were created.`);
  }

  return Promise.all(templateFiles.map(filepath => (0, _processFile2.default)(filepath, processConfig, renderAndCopyFiles.includes(filepath))));
};

exports.default = build;