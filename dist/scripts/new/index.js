"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = exports.build = exports.setup = undefined;

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _globGitignore = require("glob-gitignore");

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _processFile = require("../../utils/processFile");

var _processFile2 = _interopRequireDefault(_processFile);

var _renderer = require("../../utils/renderer");

var renderMethods = _interopRequireWildcard(_renderer);

var _downloadRepo = require("../../utils/downloadRepo");

var _downloadRepo2 = _interopRequireDefault(_downloadRepo);

var _renameFile = require("../../utils/renameFile");

var _renameFile2 = _interopRequireDefault(_renameFile);

var _fileExists = require("../../utils/fileExists");

var _fileExists2 = _interopRequireDefault(_fileExists);

var _ignores = require("../../constants/ignores");

var _ignores2 = _interopRequireDefault(_ignores);

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setup = exports.setup = async function (template, directory = '', verbose = true) {
  const globalConfig = await (0, _getConfig2.default)();
  await _fsExtra2.default.ensureDir(directory);

  if (!template) {
    template = await q.template(globalConfig.templates);
  }

  const templatePath = globalConfig.templates[template].path;
  await (0, _downloadRepo2.default)(templatePath, directory, verbose);
};

const build = exports.build = async function (context, directory = '', verbose = true) {
  const projectConfig = require(_path2.default.join(_cwd2.default, directory, '.tmp.pit', '.pitrc'));

  const renderer = renderMethods[projectConfig.renderer];

  if (renderer === undefined) {
    throw new Error(`${projectConfig.renderer} is an invalid rendering method. Available methods are ${(0, _keys2.default)(renderMethods).join(', ')}`);
  }

  if (!context) {
    context = await _inquirer2.default.prompt(projectConfig.prompts);
  }

  context = (0, _merge2.default)({}, context, projectConfig.statics);
  const processConfig = {
    renderer,
    context,
    directory,
    rename: projectConfig.rename
  };
  const templateFiles = (0, _globGitignore.sync)(_path2.default.join(directory, '.tmp.pit', '**'), {
    dot: true,
    ignore: projectConfig.ignore.concat(_ignores2.default)
  }); // Error if conflicts exist

  let conflictingFile = null;
  await Promise.all(templateFiles.map(filepath => (0, _renameFile2.default)(filepath, processConfig)).filter(f => f !== null).map(async function (fp) {
    if (await (0, _fileExists2.default)(fp, directory)) {
      conflictingFile = fp;
      return true;
    }

    return false;
  }));

  if (conflictingFile) {
    throw new Error(`"${conflictingFile}" already exists. Aborting template creation. No files were created.`);
  }

  return Promise.all(templateFiles.map(filepath => (0, _processFile2.default)(filepath, processConfig)));
};

const cleanup = exports.cleanup = async function (directory = '', verbose = true) {
  await (0, _rimraf2.default)(_path2.default.join(directory, '.tmp.pit'));
};

const newProject = async function (template, directory, verbose = true) {
  await setup(template, directory, verbose);
  await build(null, directory, verbose);
  await cleanup(directory, verbose);

  if (verbose) {
    console.log('Success! Your new project is ready.');
  }
};

exports.default = newProject;