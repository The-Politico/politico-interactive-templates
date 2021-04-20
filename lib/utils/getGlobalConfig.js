#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs-extra'));
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));

var configFilePath = path.join(os.homedir(), ".pitrc");

var getGlobalConfig = (function () {
  return new Promise(function (resolve, reject) {
    fs.readJson(configFilePath).then(function (d) {
      resolve(d);
    })["catch"](function (e) {
      if (e.message.endsWith('Unexpected end of JSON input')) {
        resolve({});
      } else if (e.message.startsWith('ENOENT: no such file or directory')) {
        resolve({});
      } else {
        reject(e);
      }
    });
  });
});

module.exports = getGlobalConfig;
