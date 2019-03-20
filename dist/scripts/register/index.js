"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _getConfig = require("../../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _downloadRepo = require("../../utils/downloadRepo");

var _downloadRepo2 = _interopRequireDefault(_downloadRepo);

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _cwd = require("../../utils/cwd");

var _cwd2 = _interopRequireDefault(_cwd);

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = async function (githubPath, verbose = true, tmpName = '.tmp.pit') {
  if (!githubPath) {
    if (verbose) {
      githubPath = await q.path();
    } else {
      throw new Error('Missing first argument: "githubPath"');
    }
  }

  let globalConfig = await (0, _getConfig2.default)();

  if (globalConfig === undefined) {
    globalConfig = {};
  }

  if (!('templates' in globalConfig)) {
    globalConfig.templates = {};
  }

  let name = null;
  let category = null;

  try {
    await (0, _rimraf2.default)(tmpName);
    await (0, _downloadRepo2.default)(githubPath, undefined, verbose, tmpName);

    const pitrc = require(_path2.default.join(_cwd2.default, tmpName, '.pitrc'));

    name = pitrc.name ? pitrc.name : null;
    category = pitrc.category ? pitrc.category : null;
  } catch (err) {
    await (0, _rimraf2.default)(tmpName);

    if (verbose) {
      console.error('There was a problem reading your .pitrc file. Make sure it\'s written in valid node syntax.');
    }

    throw err;
  }

  await (0, _rimraf2.default)(tmpName);

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
    path: githubPath,
    category
  };
  await (0, _outputConfig2.default)(globalConfig);

  if (verbose) {
    console.log(`Success! Your template, ${name}, has been registered. Run "pit new" to generate a new project.`);
  }
};

exports.default = register;