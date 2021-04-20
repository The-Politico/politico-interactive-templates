#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ejs$1 = _interopDefault(require('ejs'));

var ejs = (function (str, context, options) {
  return ejs$1.render(str, context, options);
});

exports.ejs = ejs;
