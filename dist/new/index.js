"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = exports.build = exports.setup = undefined;

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _getConfig = require("../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _spawn = require("../utils/spawn");

var _spawn2 = _interopRequireDefault(_spawn);

var _rimraf = require("../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _cwd = require("../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _processFile = require("../utils/processFile");

var _processFile2 = _interopRequireDefault(_processFile);

var _renderer = require("../utils/renderer");

var renderMethods = _interopRequireWildcard(_renderer);

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

  if (_glob2.default.sync(_path2.default.join(directory, _cwd2.default, '**')).length > 1) {
    console.error('There are files in this directory. Please empty it to start a new project.');
    return;
  }

  const templatePath = globalConfig.templates[template].path;
  await (0, _spawn2.default)('git', ['clone', templatePath, _path2.default.join(directory, '.tmp.pit')], verbose);
};

const build = exports.build = async function (context, directory = '', verbose = true) {
  const projectConfig = require(_path2.default.join(_cwd2.default, directory, '.tmp.pit', '.pitrc'));

  const renderer = renderMethods[projectConfig.renderer];

  if (renderer === undefined) {
    throw new Error(`${projectConfig.renderer} is an invalid rendering method. Available methods are ${(0, _keys2.default)(renderMethods).join(', ')}`);
  }

  if (!context) {
    context = await _inquirer2.default.prompt(projectConfig.args);
  }

  const templateFiles = _glob2.default.sync(_path2.default.join(directory, '.tmp.pit', '**'), {
    dot: true
  });

  return Promise.all(templateFiles.map(filepath => (0, _processFile2.default)(filepath, {
    renderer,
    context,
    directory,
    ignore: projectConfig.ignore,
    rename: projectConfig.rename
  })));
};

const cleanup = exports.cleanup = async function (directory = '', verbose = true) {
  await (0, _rimraf2.default)(_path2.default.join(directory, '.tmp.pit'));
};

const newProject = async function (template, directory, verbose = true) {
  await setup(template, directory, verbose);
  await build(null, directory, verbose);
  await cleanup(directory, verbose);
};

exports.default = newProject;