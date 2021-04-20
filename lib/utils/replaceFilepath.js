#!/usr/bin/env node
'use strict';

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

module.exports = replaceFilepath;
