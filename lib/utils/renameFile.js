#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var keys = _interopDefault(require('lodash/keys'));

var replaceFilepath = (function (filepath, replace, replaceWith) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var re = new RegExp(replace, 'g');

  if (typeof replaceWith === 'string') {
    return filepath.replace(re, replaceWith);
  } else if (typeof replaceWith === 'function') {
    var renderedReplaceWith = replaceWith(context);
    return filepath.replace(re, renderedReplaceWith);
  } else {
    throw new Error('Invalid filepath replacement type. Must be a string of function.');
  }
});

var renameFile = (function (filepath, config) {
  var renderedFilepath = filepath;
  keys(config.rename).forEach(function (replace) {
    var replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });
  return renderedFilepath;
});

module.exports = renameFile;
