"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _Meta = require("../../package.json");

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({
  version
}) => version ? _semver2.default.satisfies(_Meta2.default.version, version) : false;