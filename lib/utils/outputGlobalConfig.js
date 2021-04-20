#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs-extra'));
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));

var configFilePath = path.join(os.homedir(), ".pitrc");

var outputGlobalConfig = (function (config) {
  return fs.outputJson(configFilePath, config)["catch"](function (e) {
    console.error(e);
  });
});

module.exports = outputGlobalConfig;
