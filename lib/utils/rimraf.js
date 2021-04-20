#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rimraf$1 = _interopDefault(require('rimraf'));

var rimraf = (function (path) {
  return new Promise(function (resolve, reject) {
    rimraf$1(path, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
});

module.exports = rimraf;
