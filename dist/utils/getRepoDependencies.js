"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRepoDependencies;

var _flattenDeep = require("lodash/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _getRepoConfig = require("./getRepoConfig");

var _getRepoConfig2 = _interopRequireDefault(_getRepoConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getRepoDependencies(repoPath, local = false) {
  let dependencies = [];
  const repoConfig = await (0, _getRepoConfig2.default)(repoPath, local);

  if (repoConfig.dependencies) {
    const additions = await Promise.all(repoConfig.dependencies.map(d => getRepoDependencies(d)));
    dependencies = [...repoConfig.dependencies, ...additions];
  }

  return (0, _flattenDeep2.default)(dependencies);
}