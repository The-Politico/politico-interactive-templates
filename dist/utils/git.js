"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("@politico/interactive-bin/dist/scripts/env");

var _rest = require("@octokit/rest");

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _rest2.default({
  auth: process.env.GITHUB_TOKEN
});
exports.default = client;